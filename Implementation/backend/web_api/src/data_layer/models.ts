// export enum SkillLevel
// {
//     Novice,         
//     Beginner,       
//     Intermediate,   
//     Proficient,     
//     Advanced,      
//     Expert,         
// }
export enum SkillLevel {
    Novice = 'Novice',
    Beginner = 'Beginner',
    Intermediate = 'Intermediate',
    Proficient = 'Proficient',
    Advanced = 'Advanced',
    Expert = 'Expert',
}


export interface Resource {
    name: string;
    lastName: string;
    birthDate: string;
    occupation: string;
    locality: string;
    biography: string;
    role: Role;
    skills: Skill[]
}

export interface Role {
    name: string;
}

export interface Skill {
    name: string;
    skillLevel: SkillLevel
}

export interface Team {
    name: string;
    resources: Resource[];
}