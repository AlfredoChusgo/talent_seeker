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