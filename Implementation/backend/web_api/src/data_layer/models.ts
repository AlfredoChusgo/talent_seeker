export enum SkillLevel
{
    Novice,         
    Beginner,       
    Intermediate,   
    Proficient,     
    Advanced,      
    Expert,         
}

export interface Resource extends Document{
    name : string;
    lastName : string ;
    birthDate: string;
    occupation : string;
    locality : string;
    biography : string;
    role: Role;
    skills: Skill[]
}

export interface Role extends Document{    
    name : string;    
}

export interface Skill extends Document{ 
    name : string;
    skillLevel : SkillLevel
}

export interface Team extends Document{    
    name : string;
    resources : Resource[];
}