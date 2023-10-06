export interface ResourceCreateCommand{
    name : string;
    lastName : string ;
    birthDate: string;
    occupation : string;
    locality : string;
    biography : string;
    roleId: string;
    skillIds: string[]
}



export interface RoleCreateCommand{
    name : string;
}