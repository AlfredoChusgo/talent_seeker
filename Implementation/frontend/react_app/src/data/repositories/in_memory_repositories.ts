import axios from "axios";
import { ResourceCreateCommand, ResourceItem, ResourceUpdateCommand, RoleCreateCommand, RoleItem, SearchItem, SkillCreateCommand, SkillItem, SkillResourceItem, TeamCreateCommand, TeamItem } from "../models";
import { IResourceRepository, IRoleRepository, ISearchRepository, ISkillRepository, ITeamRepository } from "./interfaces";
import { v4 as uuidv4 } from 'uuid';

export class InMemoryResourceRepository implements IResourceRepository {
    private resources: ResourceItem[] = [];
    private isLoaded: boolean = false;
    private static instance: InMemoryResourceRepository;

    public constructor(private roleRepository: IRoleRepository, private skillRepository: ISkillRepository) {

    }


    private async loadResources(): Promise<void> {

        try {
            const response = await axios.get("fake_data/resources_data.json");
            this.resources = response.data.map((e:any)=>({...e,birthDate:new Date(e.birthDate)}));
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

    async getAll(): Promise<ResourceItem[]> {
        await this.load();
        return this.resources;
    }

    async getById(id: string): Promise<ResourceItem> {
        await this.load();

        const resource = this.resources.find(r => r.id === id);
        if (!resource) throw new Error('Resource not found');
        return resource;
    }

    async create(item: ResourceCreateCommand): Promise<ResourceItem> {
        await this.load();
        let role: RoleItem = await this.roleRepository.getById(item.role);
        let allSkills: SkillItem[] = await this.skillRepository.getAll();
        let skillResources: SkillResourceItem[] = item.skills.map(e => ({
            skill: allSkills.find(skill => skill.id == e.skill) ?? { id: "", name: "" },
            skillLevel: e.skillLevel
        }));

        let resourceItem: ResourceItem = {
            id: uuidv4(),
            name: item.name,
            lastName: item.lastName,
            biography: item.biography,
            birthDate: new Date(item.birthDate),
            locality: item.locality,
            occupation: item.occupation,
            role: role,
            skills: skillResources
        }
        this.resources = [...this.resources, resourceItem];
        return resourceItem;
    }

    async update(item: ResourceUpdateCommand): Promise<void> {
        await this.load();

        const index = this.resources.findIndex(r => r.id === item.id);
        if (index === -1) throw new Error('Resource not found');

        let role: RoleItem = await this.roleRepository.getById(item.role);
        let allSkills: SkillItem[] = await this.roleRepository.getAll();
        let skillResources: SkillResourceItem[] = item.skills.map(e => ({
            skill: allSkills.find(skill => skill.id == e.skill) ?? { id: "", name: "" },
            skillLevel: e.skillLevel
        }));

        let resourceItem: ResourceItem = {
            id: item.id,
            name: item.name,
            lastName: item.lastName,
            biography: item.biography,
            birthDate: new Date(item.birthDate),
            locality: item.locality,
            occupation: item.occupation,
            role: role,
            skills: skillResources
        }
        let resourcesCopy = [...this.resources];
        resourcesCopy[index] = resourceItem;
        this.resources = resourcesCopy;
    }

    async delete(itemId: string): Promise<void> {
        await this.load();
        this.resources = this.resources.filter(r => r.id !== itemId);
    }
}

export class InMemoryTeamRepository implements ITeamRepository {

    private teams: TeamItem[] = [];
    private isLoaded: boolean = false;


    public constructor(private resourceRepository: IResourceRepository) {

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
        await this.load();
        return this.teams;
    }

    async getById(id: string): Promise<TeamItem> {
        await this.load();
        const team = this.teams.find(t => t.id === id);
        if (!team) throw new Error('Team not found');
        return team;
    }

    async create(item: TeamCreateCommand): Promise<TeamItem> {
        await this.load();
        let allResources: ResourceItem[] = await this.resourceRepository.getAll();

        let resources: ResourceItem[] = allResources.filter(resource => { item.resources.includes(resource.id) });

        let teamItem: TeamItem = {
            id: uuidv4(),
            name: item.name,
            resources: resources
        }
        this.teams.push(teamItem);
        return teamItem;
    }

    async update(item: TeamItem): Promise<void> {
        await this.load();
        const index = this.teams.findIndex(t => t.id === item.id);
        if (index === -1) throw new Error('Team not found');
        this.teams[index] = item;
    }

    async delete(itemId: string): Promise<void> {
        await this.load();
        const index = this.teams.findIndex(t => t.id === itemId);
        if (index === -1) throw new Error('Team not found');

        this.teams = this.teams.filter(t => t.id !== itemId);
    }
}

export class InMemoryRoleRepository implements IRoleRepository {
    private roles: RoleItem[] = [];
    private isLoaded: boolean = false;

    public constructor() {
        // private constructor to prevent constructing new instances of the Singleton outside the class
    }


    private async loadRoles(): Promise<void> {

        try {
            const response = await axios.get("fake_data/roles_data.json");
            this.roles = response.data;
            this.isLoaded = true;
        } catch (error) {
            throw error;
        }
    }

    private async load(): Promise<void> {
        if (!this.isLoaded) {
            await this.loadRoles();
        }
    }

    async getAll(): Promise<RoleItem[]> {
        await this.load();
        return this.roles;
    }

    async getById(id: string): Promise<RoleItem> {
        await this.load();
        const role = this.roles.find(t => t.id === id);
        if (!role) throw new Error('Role not found');
        return role;
    }

    async create(item: RoleCreateCommand): Promise<RoleItem> {
        await this.load();

        let roleItem: RoleItem = {
            id: uuidv4(),
            name: item.name,
        }
        this.roles = [...this.roles, roleItem];
        return roleItem;
    }

    async update(item: RoleItem): Promise<void> {
        await this.load();
        const index = this.roles.findIndex(t => t.id === item.id);
        if (index === -1) throw new Error('Role not found');
        let rolesCopy = [...this.roles];
        rolesCopy[index] = item;
        this.roles = rolesCopy;
    }

    async delete(itemId: string): Promise<void> {
        await this.load();
        const index = this.roles.findIndex(t => t.id === itemId);
        if (index === -1) throw new Error('Role not found');

        this.roles = this.roles.filter(t => t.id !== itemId);
    }
}

export class InMemorySkillRepository implements ISkillRepository {
    private skills: SkillItem[] = [];
    private isLoaded: boolean = false;

    public constructor() {
        // private constructor to prevent constructing new instances of the Singleton outside the class
    }


    private async loadSkills(): Promise<void> {

        try {
            const response = await axios.get("fake_data/skills_data.json");
            this.skills = [...response.data];
            this.isLoaded = true;
        } catch (error) {
            throw error;
        }
    }

    private async load(): Promise<void> {
        if (!this.isLoaded) {
            await this.loadSkills();
        }
    }

    async getAll(): Promise<SkillItem[]> {
        await this.load();
        return this.skills;
    }

    async getById(id: string): Promise<SkillItem> {
        await this.load();
        const role = this.skills.find(t => t.id === id);
        if (!role) throw new Error('Skill not found');
        return role;
    }

    async create(item: SkillCreateCommand): Promise<SkillItem> {
        await this.load();

        let skillItem: SkillItem = {
            id: uuidv4(),
            name: item.name,
        }
        this.skills = [...this.skills, skillItem];
        return skillItem;
    }

    async update(item: SkillItem): Promise<void> {
        await this.load();
        const index = this.skills.findIndex(t => t.id === item.id);
        if (index === -1) throw new Error('Skill not found');
        let skillsCopy = [...this.skills];
        skillsCopy[index] = item;
        this.skills = skillsCopy;
    }

    async delete(itemId: string): Promise<void> {
        await this.load();
        const index = this.skills.findIndex(t => t.id === itemId);
        if (index === -1) throw new Error('Skill not found');

        this.skills = this.skills.filter(t => t.id !== itemId);
    }
}




export class InMemorySearchRepository implements ISearchRepository {

    constructor(private resourceRepository: IResourceRepository, private teamsRepository: ITeamRepository,
        private skillRepository: ISkillRepository, private roleRepository: IRoleRepository) {

    }
    async getAllResources(): Promise<SearchItem[]> {
        let searchItems: SearchItem[] = [];

        let skills = await this.skillRepository.getAll();
        let roles = await this.roleRepository.getAll();
        let resources = await this.resourceRepository.getAll();

        skills.forEach(skill => {
            searchItems.push({
                id: skill.id,
                displayName: `${skill.name}`,
                objectType: 'skill',
            });
        });

        roles.forEach(role => {
            searchItems.push({
                id: role.id,
                displayName: `${role.name}`,
                objectType: 'role',
            });
        });

        resources.forEach(element => {
            searchItems.push({
                id: element.id,
                displayName: `${element.name} ${element.lastName}`,
                objectType: 'resource',
            });
        });

        return searchItems;
    }

    async getAllTeams(): Promise<SearchItem[]> {
        let result: SearchItem[] = [];
        (await (this.teamsRepository.getAll())).forEach(e => result.push({
            id: e.id,
            displayName: e.name,
            objectType: "team"
        }));

        return result;
    }
}

