import axios from "axios";
import { ResourceItem, SearchItem, TeamItem } from "../models";
import { IResourceRepository, ISearchRepository, ITeamRepository } from "./interfaces";
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
            console.log(response.data);
            return response.data;
          } catch (error) {
            console.error('There was an error!', error);
            throw error;
          }
    }

    async create(item: ResourceItem): Promise<void> {
        try {
            const response = await axios.post(`${WebApiResourceRepository.baseUrl}/api/resources`,item);            
            console.log(response.data);
        } catch (error) {
            console.error('There was an error!', error);
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

    async create(item: TeamItem): Promise<void> {
        
        try {
            const response = await axios.post(`${WebApiTeamRepository.baseUrl}/api/teams`,item);
            if(!response.data.success){                
                throw Error(response.data.errors);
            }
            
        } catch (error) {
            throw error;
        }
    }

    async update(item: TeamItem): Promise<void> {
        try {
            const response = await axios.put(`${WebApiTeamRepository.baseUrl}/api/teams/${item.id}`,item);
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
            const response = await axios.delete(`${WebApiTeamRepository.baseUrl}/api/resources/${itemId}`);
            if(!response.data.success){                
                throw Error(response.data.errors);
            }
            console.log(response.data);
        } catch (error) {
            console.error('There was an error!', error);
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
