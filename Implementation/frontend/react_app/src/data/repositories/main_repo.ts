import { appConfig } from "../../config/config_helper";
import { InMemoryResourceRepository, InMemoryRoleRepository, InMemorySearchRepository, InMemorySkillRepository, InMemoryTeamRepository } from "./in_memory_repositories";
import { IResourceRepository, ITeamRepository, ISearchRepository, ISkillRepository, IRoleRepository } from "./interfaces";
import { WebApiResourceRepository, WebApiTeamRepository, WebApiSearchRepository, WebApiSkillRepository, WebApiRoleRepository } from "./web_api_repositories";

let resourcesRepository: IResourceRepository;
let teamsRepository: ITeamRepository;
let searchRepository: ISearchRepository;
let skillsRepository: ISkillRepository;
let rolesRepository: IRoleRepository;

if (!appConfig.isProduction) {
    skillsRepository = new InMemorySkillRepository();
    rolesRepository = new InMemoryRoleRepository();
    resourcesRepository = new InMemoryResourceRepository(rolesRepository,skillsRepository);
    teamsRepository = new InMemoryTeamRepository(resourcesRepository);
    searchRepository = new InMemorySearchRepository(resourcesRepository,teamsRepository,skillsRepository,rolesRepository);
} else {
    resourcesRepository = WebApiResourceRepository.getInstance();
    skillsRepository = WebApiSkillRepository.getInstance();
    rolesRepository = WebApiRoleRepository.getInstance();
    teamsRepository = WebApiTeamRepository.getInstance();
    searchRepository = new WebApiSearchRepository();
}

// let resourcesRepository: IResourceRepository = WebApiResourceRepository.getInstance();
// let skillsRepository: ISkillRepository = WebApiSkillRepository.getInstance();
// let rolesRepository: IRoleRepository = WebApiRoleRepository.getInstance();
// let teamsRepository: ITeamRepository = WebApiTeamRepository.getInstance();
// let searchRepository: ISearchRepository = new WebApiSearchRepository();

export default { resourcesRepository, teamsRepository, searchRepository, skillsRepository, rolesRepository }