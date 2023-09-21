export enum SkillLevel
{
    Novice,         // Basic knowledge, limited experience
    Beginner,       // Limited proficiency, still learning
    Intermediate,   // Moderate proficiency, some experience
    Proficient,     // Competent, good understanding
    Advanced,       // High proficiency, extensive experience
    Expert,         // Mastery or expert level
}


export interface ResourceItem{
    id: string;
    name : string;
    lastName : string ;
    birthDate: Date;
    occupation : string;
    location : string;
    biography : string;
    role: RoleItem;
    skills: SkillItem[]
}

export interface RoleItem{
    id: string;
    name : string;    
}

export interface SkillItem{
    id: string;
    name : string;
    skillLevel : SkillLevel
}

export enum PromiseState{
    IDLE = "idle",
    PENDING = 'pending',
    SUCCEDED = 'succeeded',
    FAILED = 'failed',
}

export interface SearchHomeItem {
    id: string;
    displayName : string;
    objectType: string;
}

export interface SearchResourceFilterQuery {
    resourceIds : string[];
    roleIds: string[];
    skillIds : string[];
}