export enum SkillLevel {
    Undefined= 'Undefined',
    Novice = 'Novice',
    Beginner = 'Beginner',
    Intermediate = 'Intermediate',
    Proficient = 'Proficient',
    Advanced = 'Advanced',
    Expert = 'Expert',
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
    locality : string;
    biography : string;
    role: RoleItem;
    skills: SkillResourceItem[]
}

export interface SkillResourceItem{
    skill: SkillItem;
    skillLevel : SkillLevel;    
}

export interface RoleItem{
    id: string;
    name : string;    
}

export interface SkillItem{
    id: string;
    name : string;
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


///web api 

export interface TeamCreateCommand{
    name : string;
    resources : string[];
}
export interface TeamUpdateCommand{
    id:string;
    name : string;
    resources : string[];
}


export interface SkillCreateCommand{
    name : string;    
}

export interface SkillUpdateCommand{
    id:string;
    name : string;    
}

export interface RoleCreateCommand{
    name : string;    
}

export interface RoleUpdateCommand{
    id:string;
    name : string;    
}