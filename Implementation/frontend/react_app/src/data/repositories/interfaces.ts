import { ResourceItem, SearchItem, TeamItem, TeamCreateCommand, SkillItem, SkillCreateCommand, RoleItem, RoleCreateCommand } from "../models";

export interface IResourceRepository{
    getAll(): Promise<ResourceItem[]>;

    getById(id : string): Promise<ResourceItem>;

    create(item : ResourceItem) : Promise<void>;

    update(item : ResourceItem) : Promise<void>;

    delete(itemId : string) : Promise<void>;
}

export interface ITeamRepository{
    getAll(): Promise<TeamItem[]>;

    getById(id : string): Promise<TeamItem>;

    create(item : TeamCreateCommand) : Promise<TeamItem>;

    update(item : TeamItem) : Promise<void>;

    delete(itemId : string) : Promise<void>;
}
/api/skills
export interface ISkillRepository{
    getAll(): Promise<SkillItem[]>;

    getById(id : string): Promise<SkillItem>;

    create(item : SkillCreateCommand) : Promise<SkillItem>;

    update(item : SkillItem) : Promise<void>;

    delete(itemId : string) : Promise<void>;
}

export interface IRoleRepository{
    getAll(): Promise<RoleItem[]>;

    getById(id : string): Promise<RoleItem>;

    create(item : RoleCreateCommand) : Promise<RoleItem>;

    update(item : RoleItem) : Promise<void>;

    delete(itemId : string) : Promise<void>;
}

export interface ISearchRepository {
    getAllResources(): Promise<SearchItem[]>;
    getAllTeams(): Promise<SearchItem[]>;
}