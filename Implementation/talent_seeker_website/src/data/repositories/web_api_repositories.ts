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
        const response = await axios.get(`${WebApiResourceRepository.baseUrl}/api/resources`);
        
        try {
            if(response.data.success){
                return DataParser.Resource.fromWebApiArray(response.data.data);
            }
            throw Error(response.data.errors);
        } catch (error) {
            throw error;
        }
    }

    async getById(id: string): Promise<ResourceItem> {
        

        // const resource = this.resources.find(r => r.id === id);
        // if (!resource) throw new Error('Resource not found');
        // return resource;
        return {
            biography:"",
            birthDate:"",
            id:"",
            lastName:"",
            location:"",
            name:"",
            occupation:"",
            role: {
                id:"",
                name:""
            },
            skills:[]
        };
    }

    async create(item: ResourceItem): Promise<void> {
        

        //this.resources.push(item);
    }

    async update(item: ResourceItem): Promise<void> {
        

        // const index = this.resources.findIndex(r => r.id === item.id);
        // if (index === -1) throw new Error('Resource not found');
        // this.resources[index] = item;
    }

    async delete(itemId: string): Promise<void> {
        
        //this.resources = this.resources.filter(r => r.id !== itemId);
    }
}

export class WebApiTeamRepository implements ITeamRepository {

    private teams: TeamItem[] = [];
    private isLoaded: boolean = false;

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

    private async loadResources(): Promise<void> {

        try {
            const response = await axios.get("fake_data/teams_data.json");
            this.teams = response.data;
            this.isLoaded = true;
        } catch (error) {
            throw error;
        }
    }

    private async load(): Promise<void> {
        if (!this.isLoaded) {
            await this.loadResources();
        }
    }


    async getAll(): Promise<TeamItem[]> {
        
        return this.teams;
    }

    async getById(id: string): Promise<TeamItem> {
        
        const team = this.teams.find(t => t.id === id);
        if (!team) throw new Error('Team not found');
        return team;
    }

    async create(item: TeamItem): Promise<void> {
        
        this.teams.push(item);
    }

    async update(item: TeamItem): Promise<void> {
        
        const index = this.teams.findIndex(t => t.id === item.id);
        if (index === -1) throw new Error('Team not found');
        this.teams[index] = item;
    }

    async delete(itemId: string): Promise<void> {
        
        const index = this.teams.findIndex(t => t.id === itemId);
        if (index === -1) throw new Error('Team not found');

        this.teams = this.teams.filter(t => t.id !== itemId);
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
