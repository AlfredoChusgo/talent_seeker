import axios from "axios";
import { ResourceItem, SearchItem, TeamItem } from "../models";
import { IResourceRepository, ISearchRepository, ITeamRepository } from "./interfaces";

export class InMemoryResourceRepository implements IResourceRepository {
    private resources: ResourceItem[] = [];
    private isLoaded: boolean = false;
    private static instance : InMemoryResourceRepository;

    private constructor() {
        // private constructor to prevent constructing new instances of the Singleton outside the class
    }

    public static getInstance(): InMemoryResourceRepository {
        if (!InMemoryResourceRepository.instance) {
            InMemoryResourceRepository.instance = new InMemoryResourceRepository();
        }
        return InMemoryResourceRepository.instance;
    }

    private async loadResources(): Promise<void> {

        try {
            const response = await axios.get("fake_data/resources_data.json");
            this.resources = response.data;
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

    async create(item: ResourceItem): Promise<void> {
        await this.load();

        this.resources.push(item);
    }

    async update(item: ResourceItem): Promise<void> {
        await this.load();

        const index = this.resources.findIndex(r => r.id === item.id);
        if (index === -1) throw new Error('Resource not found');
        this.resources[index] = item;
    }

    async delete(itemId: string): Promise<void> {
        await this.load();
        this.resources = this.resources.filter(r => r.id !== itemId);
    }
}

export class InMemoryTeamRepository implements ITeamRepository {

    private teams: TeamItem[] = [];
    private isLoaded: boolean = false;

    private static instance : InMemoryTeamRepository;

    private constructor() {
        // private constructor to prevent constructing new instances of the Singleton outside the class
    }

    public static getInstance(): InMemoryTeamRepository {
        if (!InMemoryTeamRepository.instance) {
            InMemoryTeamRepository.instance = new InMemoryTeamRepository();
        }
        return InMemoryTeamRepository.instance;
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

    async create(item: TeamItem): Promise<void> {
        await this.load();
        this.teams.push(item);
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

export class InMemorySearchRepository implements ISearchRepository {

    constructor(private resourceRepository: IResourceRepository, private teamsRepository: ITeamRepository) {

    }
    async getAllResources(): Promise<SearchItem[]> {

        let skills = [{
            "id": "1",
            "name": "SQL"
        },
        {
            "id": "2",
            "name": "C#"
        },
        {
            "id": "3",
            "name": "React"
        },
        {
            "id": "4",
            "name": "Angular"
        },
        {
            "id": "5",
            "name": "JavaScript"
        },
        {
            "id": "6",
            "name": "HTML"
        },
        {
            "id": "7",
            "name": "CSS"
        },
        {
            "id": "8",
            "name": "Node.js"
        },
        {
            "id": "9",
            "name": "Python"
        },
        {
            "id": "10",
            "name": "Java"
        },
        {
            "id": "11",
            "name": "ASP.NET"
        },
        {
            "id": "12",
            "name": "Ruby on Rails"
        },
        {
            "id": "13",
            "name": "TypeScript"
        },
        {
            "id": "14",
            "name": "PHP"
        },
        {
            "id": "15",
            "name": "Vue.js"
        },
        {
            "id": "16",
            "name": "Django"
        },
        {
            "id": "17",
            "name": "MySQL"
        },
        {
            "id": "18",
            "name": "MongoDB"
        },
        {
            "id": "19",
            "name": "Express.js"
        },
        {
            "id": "20",
            "name": "Redux"
        }];

        const result = [
            { id: "74635442", displayName: "Product Owner", objectType: "role" },
            { id: "94635441", displayName: "Developer", objectType: "role" },
            { id: "11635445", displayName: "Quality Assurance", objectType: "role" },
        ];

        skills.forEach(skill => {
            result.push({
                id: skill.id,
                displayName: `${skill.name}`,
                objectType: 'skill',
            });
        });

        (await this.resourceRepository.getAll()).forEach(element => {
            result.push({
                id: element.id,
                displayName: `${element.name} ${element.lastName}`,
                objectType: 'resource',
            });
        });

        return result;
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

export const resourcesRepository : InMemoryResourceRepository = InMemoryResourceRepository.getInstance();
export const teamsRepository : InMemoryTeamRepository = InMemoryTeamRepository.getInstance();
export const searchRepository : ISearchRepository = new InMemorySearchRepository(resourcesRepository,teamsRepository);
