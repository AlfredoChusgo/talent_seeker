import axios from "axios";
import { ResourceItem, SearchItem, TeamItem, TeamCreateCommand, TeamUpdateCommand, SkillItem, SkillCreateCommand, RoleItem, ResourceCreateCommand } from "../models";
import { IResourceRepository, IRoleRepository, ISearchRepository, ISkillRepository, ITeamRepository } from "./interfaces";
import {appConfig} from '../../config/config_helper';
import { DataParser } from "../data_parser";

export class WebApiResourceRepository implements IResourceRepository {
    private static instance : WebApiResourceRepository;
    private static baseUrl : string = appConfig.backendWebApiUrl;

    private constructor() {
        // private constructor to prevent constructing new instances of the Singleton outside the class
    }

    public static getInstance(): WebApiResourceRepository {
        if (!WebApiResourceRepository.instance) {
            WebApiResourceRepository.instance = new WebApiResourceRepository();
        }
        return WebApiResourceRepository.instance;
    }



    async getAll(): Promise<ResourceItem[]> {
        try {
            const response = await axios.get(`${WebApiResourceRepository.baseUrl}/api/resources`);
            if(response.data.success){
                return DataParser.Resource.fromWebApiArray(response.data.data);
            }
            throw Error(response.data.errors);
        } catch (error) {
            throw error;
        }
    }

    async getById(id: string): Promise<ResourceItem> {
    
        try {
            const response = await axios.get(`${WebApiResourceRepository.baseUrl}/api/resources/${id}`);            
            if(response.data.success){
                return DataParser.Resource.fromWebApiObject(response.data.data);
            }
            throw Error(response.data.errors);
          } catch (error) {
            console.error('There was an error!', error);
            throw error;
          }
    }

    async create(item: ResourceCreateCommand): Promise<ResourceItem> {
        try {
            const response = await axios.post(`${WebApiResourceRepository.baseUrl}/api/resources`,item);            
            if(!response.data.success){                
                throw Error(response.data.errors);                
            }
            return DataParser.Resource.fromWebApiObject(response.data.data);
        } catch (error) {
            console.error('There was an error!', error);
            throw error;
        }
    }

    async update(item: ResourceItem): Promise<void> {
        
        try {
            const response = await axios.put(`${WebApiResourceRepository.baseUrl}/api/resources/${item.id}`,item);
            console.log(response.data);
        } catch (error) {
            console.error('There was an error!', error);
        }
    }

    async delete(itemId: string): Promise<void> {
        try {
            const response = await axios.delete(`${WebApiResourceRepository.baseUrl}/api/resources/${itemId}`);
            console.log(response.data);
        } catch (error) {
            console.error('There was an error!', error);
        }
    }
}

export class WebApiTeamRepository implements ITeamRepository {
    private static baseUrl : string = appConfig.backendWebApiUrl;
    private static instance : WebApiTeamRepository;

    private constructor() {
        // private constructor to prevent constructing new instances of the Singleton outside the class
    }

    public static getInstance(): WebApiTeamRepository {
        if (!WebApiTeamRepository.instance) {
            WebApiTeamRepository.instance = new WebApiTeamRepository();
        }
        return WebApiTeamRepository.instance;
    }


    async getAll(): Promise<TeamItem[]> {
        try {
            const response = await axios.get(`${WebApiTeamRepository.baseUrl}/api/teams`);
            if(response.data.success){
                return DataParser.Team.fromWebApiArray(response.data.data);
            }
            throw Error(response.data.errors);
        } catch (error) {
            throw error;
        }
    }

    async getById(id: string): Promise<TeamItem> {
        try {
            const response = await axios.get(`${WebApiTeamRepository.baseUrl}/api/teams/${id}`);
            if(response.data.success){
                return DataParser.Team.fromWebApiObject(response.data.data);
            }
            throw Error(response.data.errors);
        } catch (error) {
            throw error;
        }
    }

    async create(item: TeamCreateCommand): Promise<TeamItem> {
        
        try {
            //const teamCreateCommand = DataParser.Team.toTeamWebApiUpdate(item);
            const response = await axios.post(`${WebApiTeamRepository.baseUrl}/api/teams`,item);
            if(!response.data.success){                
                throw Error(response.data.errors);                
            }
            return DataParser.Team.fromWebApiObject(response.data.data);
        } catch (error) {
            throw error;
        }
    }

    async update(item: TeamItem): Promise<void> {
        try {
            const teamUpdateCommand = DataParser.Team.toTeamWebApiUpdate(item);
            const response = await axios.put(`${WebApiTeamRepository.baseUrl}/api/teams/${item.id}`,teamUpdateCommand);
            if(!response.data.success){                
                throw Error(response.data.errors);
            }
            console.log(response.data);
        } catch (error) {
            console.error('There was an error!', error);
            throw error;
        }
    }

    async delete(itemId: string): Promise<void> {
        try {
            const response = await axios.delete(`${WebApiTeamRepository.baseUrl}/api/teams/${itemId}`);
            if(!response.data.success){                
                throw Error(response.data.errors);
            }
            console.log(response.data);
        } catch (error) {
            console.error('There was an error!', error);
            throw error;
        }
    }
}

export class WebApiSearchRepository implements ISearchRepository {

    private static baseUrl : string = appConfig.backendWebApiUrl;
    constructor() {

    }
    async getAllResources(): Promise<SearchItem[]> {

        const response = await axios.get(`${WebApiSearchRepository.baseUrl}/api/getSearchItems`);
        
        try {
            if(response.data.success){
                return DataParser.SearchItem.fromWebApiArray(response.data.data);
            }
            throw Error(response.data.errors);
        } catch (error) {
            throw error;
        }
    }

    async getAllTeams(): Promise<SearchItem[]> {
        const response = await axios.get(`${WebApiSearchRepository.baseUrl}/api/getTeamsSearchItems`);
        
        try {
            if(response.data.success){
                return DataParser.SearchItem.fromWebApiArray(response.data.data);
            }
            throw Error(response.data.errors);
        } catch (error) {
            throw error;
        }
    }
}

export class WebApiSkillRepository implements ISkillRepository {
    private static baseUrl : string = appConfig.backendWebApiUrl;
    private static instance : WebApiSkillRepository;

    private constructor() {
        // private constructor to prevent constructing new instances of the Singleton outside the class
    }

    public static getInstance(): ISkillRepository {
        if (!WebApiSkillRepository.instance) {
            WebApiSkillRepository.instance = new WebApiSkillRepository();
        }
        return WebApiSkillRepository.instance;
    }


    async getAll(): Promise<SkillItem[]> {
        try {
            const response = await axios.get(`${WebApiSkillRepository.baseUrl}/api/skills`);
            if(response.data.success){
                return DataParser.Skill.fromWebApiArray(response.data.data);
            }
            throw Error(response.data.errors);
        } catch (error) {
            throw error;
        }
    }

    async getById(id: string): Promise<SkillItem> {
        try {
            const response = await axios.get(`${WebApiSkillRepository.baseUrl}/api/skills/${id}`);
            if(response.data.success){
                return DataParser.Skill.fromWebApiObject(response.data.data);
            }
            throw Error(response.data.errors);
        } catch (error) {
            throw error;
        }
    }

    async create(item: SkillCreateCommand): Promise<SkillItem> {
        
        try {
            const response = await axios.post(`${WebApiSkillRepository.baseUrl}/api/skills`,item);
            if(!response.data.success){                
                throw Error(response.data.errors);                
            }
            return DataParser.Skill.fromWebApiObject(response.data.data);
        } catch (error) {
            throw error;
        }
    }

    async update(item: SkillItem): Promise<void> {
        try {
            const updateCommand = DataParser.Skill.toWebApiUpdate(item);
            const response = await axios.put(`${WebApiSkillRepository.baseUrl}/api/skills/${item.id}`,updateCommand);
            if(!response.data.success){                
                throw Error(response.data.errors);
            }
        } catch (error) {
            console.error('There was an error!', error);
            throw error;
        }
    }

    async delete(itemId: string): Promise<void> {
        try {
            const response = await axios.delete(`${WebApiSkillRepository.baseUrl}/api/skills/${itemId}`);
            if(!response.data.success){                
                throw Error(response.data.errors);
            }
        } catch (error) {
            console.error('There was an error!', error);
            throw error;
        }
    }
}

export class WebApiRoleRepository implements IRoleRepository {
    private static baseUrl : string = appConfig.backendWebApiUrl;
    private static instance : WebApiRoleRepository;

    private constructor() {
        // private constructor to prevent constructing new instances of the Singleton outside the class
    }

    public static getInstance(): IRoleRepository {
        if (!WebApiRoleRepository.instance) {
            WebApiRoleRepository.instance = new WebApiRoleRepository();
        }
        return WebApiRoleRepository.instance;
    }


    async getAll(): Promise<RoleItem[]> {
        try {
            const response = await axios.get(`${WebApiRoleRepository.baseUrl}/api/roles`);
            if(response.data.success){
                return DataParser.Role.fromWebApiArray(response.data.data);
            }
            throw Error(response.data.errors);
        } catch (error) {
            throw error;
        }
    }

    async getById(id: string): Promise<RoleItem> {
        try {
            const response = await axios.get(`${WebApiRoleRepository.baseUrl}/api/roles/${id}`);
            if(response.data.success){
                return DataParser.Role.fromWebApiObject(response.data.data);
            }
            throw Error(response.data.errors);
        } catch (error) {
            throw error;
        }
    }

    async create(item: SkillCreateCommand): Promise<RoleItem> {
        
        try {
            const response = await axios.post(`${WebApiRoleRepository.baseUrl}/api/roles`,item);
            if(!response.data.success){                
                throw Error(response.data.errors);                
            }
            return DataParser.Role.fromWebApiObject(response.data.data);
        } catch (error) {
            throw error;
        }
    }

    async update(item: RoleItem): Promise<void> {
        try {
            const updateCommand = DataParser.Skill.toWebApiUpdate(item);
            const response = await axios.put(`${WebApiRoleRepository.baseUrl}/api/roles/${item.id}`,updateCommand);
            if(!response.data.success){                
                throw Error(response.data.errors);
            }
        } catch (error) {
            console.error('There was an error!', error);
            throw error;
        }
    }

    async delete(itemId: string): Promise<void> {
        try {
            const response = await axios.delete(`${WebApiRoleRepository.baseUrl}/api/roles/${itemId}`);
            if(!response.data.success){                
                throw Error(response.data.errors);
            }
        } catch (error) {
            console.error('There was an error!', error);
            throw error;
        }
    }
}
