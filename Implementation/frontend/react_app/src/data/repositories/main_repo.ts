import { appConfig } from "../../config/config_helper";
import { InMemoryResourceRepository, InMemoryTeamRepository, InMemorySearchRepository } from "./in_memory_repositories";
import { IResourceRepository, ITeamRepository, ISearchRepository } from "./interfaces";
import { WebApiResourceRepository, WebApiTeamRepository, WebApiSearchRepository } from "./web_api_repositories";

let resourcesRepository: IResourceRepository = InMemoryResourceRepository.getInstance();
let teamsRepository: ITeamRepository = InMemoryTeamRepository.getInstance();
let searchRepository: ISearchRepository = new InMemorySearchRepository(resourcesRepository, teamsRepository);

if (!appConfig.isProduction) {
  resourcesRepository = WebApiResourceRepository.getInstance();
  teamsRepository = WebApiTeamRepository.getInstance();
  searchRepository = new WebApiSearchRepository();
}else{
  resourcesRepository = InMemoryResourceRepository.getInstance();
  teamsRepository = InMemoryTeamRepository.getInstance();
  searchRepository = new InMemorySearchRepository(resourcesRepository, teamsRepository);
}

export default { resourcesRepository, teamsRepository, searchRepository }