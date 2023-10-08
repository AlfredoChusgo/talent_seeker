import { SkillLevel } from "./models";

export interface SkillCreateCommand{
    name : string;
    skillLevel : SkillLevel;
}

export interface SkillUpdateCommand{
    id:string;
    name : string;
    skillLevel : SkillLevel;
}

export interface RoleCreateCommand{
    name : string;
}

export interface RoleUpdateCommand{
    id:string;
    name : string;
}

export interface ResourceCreateCommand{
    name : string;
    lastName : string ;
    birthDate: string;
    occupation : string;
    locality : string;
    biography : string;
    roleId: string;
    skillIds: string[];
}

export interface ResourceUpdateCommand{
    id:string;
    name : string;
    lastName : string ;
    birthDate: string;
    occupation : string;
    locality : string;
    biography : string;
    roleId: string;
    skillIds: string[];
}