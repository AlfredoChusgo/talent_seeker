import { ResourceItem, SearchItem, TeamItem, TeamCreateCommand, TeamUpdateCommand } from "../models";

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

export interface ISearchRepository {
    getAllResources(): Promise<SearchItem[]>;
    getAllTeams(): Promise<SearchItem[]>;
}