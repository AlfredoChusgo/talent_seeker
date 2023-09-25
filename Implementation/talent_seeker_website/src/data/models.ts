export enum SkillLevel
{
    Novice,         
    Beginner,       
    Intermediate,   
    Proficient,     
    Advanced,      
    Expert,         
}

export enum SnackbarSeverity
{
    Success = "success",
    Error = "error",
    Warning = "warning",
    Info = "info",
}

export interface ResourceItem{
    id: string;
    name : string;
    lastName : string ;
    birthDate: string;
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

export interface SearchItem {
    id: string;
    displayName : string;
    objectType: string;
}

export interface TeamItem{
    id: string;
    name : string;
    resources : ResourceItem[];
}