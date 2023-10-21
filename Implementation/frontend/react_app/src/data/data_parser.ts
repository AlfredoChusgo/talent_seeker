import { ResourceItem, RoleItem, SearchItem, SkillItem, SkillLevel, SkillResourceItem, SkillUpdateCommand, TeamCreateCommand, TeamItem, TeamUpdateCommand } from "./models";


export class DataParser{
    static Role = class {

        static fromWebApiArray(data:any):RoleItem[]{
            return  data.map((role:any)=> this.fromWebApiObject(role));
        }
        
        static fromWebApiObject(data:any):RoleItem{
            return  {
                id: data?._id ?? "",
                name: data?.name ?? ""
            }
        }
    };

    static Skill = class {
        
        static fromWebApiArray(data:any[]):SkillItem[]{
            return  data.map((e:any)=> (this.fromWebApiObject(e)));
        }

        static fromWebApiObject(data:any):SkillItem{
            return  {
                id: data?._id ?? "",
                name: data?.name ?? ""                
            }
        }

        static toWebApiUpdate(data:SkillItem) : SkillUpdateCommand{
            return {
                id:data.id,
                name: data.name,
            }
        }
    };

    
    static Resource = class {
        static fromWebApiArray(data:any):ResourceItem[]{
            return  data.map((resource:any)=> this.fromWebApiObject(resource));
        }

        static fromWebApiObject(data:any):ResourceItem{
            return  {
                id: data._id ?? "",
                name: data.name ?? "",
                lastName : data.lastName ?? "",
                birthDate: data.birthDate ?? "",
                occupation: data.occupation ?? "",
                locality : data.location ?? "",
                biography : data.biography ?? "",
                role : DataParser.Role.fromWebApiObject(data?.role) ?? { id:"",name:""},
                skills : DataParser.SkillResource.fromWebApiArray(data?.skills ?? []) ?? []
            }
        }
    };

    static SkillResource = class {
        static fromWebApiArray(data:any):SkillResourceItem[]{
            return  data.map((resource:any)=> this.fromWebApiObject(resource));
        }

        static fromWebApiObject(data:any):SkillResourceItem{
            return  {
                skill : DataParser.Skill.fromWebApiObject(data.skills),
                skillLevel : this.parseSkillLevel(data?.skillLevel ?? "")
            }
        }

        static parseSkillLevel(skillLevelStr: string): SkillLevel {
            const skillLevelValues: SkillLevel[] = Object.values(SkillLevel);
          
            // Check if the input string is a valid enum value
            if (skillLevelValues.includes(skillLevelStr as SkillLevel)) {
              return skillLevelStr as SkillLevel;
            }
          
            // If the input string is not a valid enum value, return undefined or handle the error as needed
            return SkillLevel.Undefined;
          }
    };

    static Team = class {
        static fromWebApiArray(data:any):TeamItem[]{
            return  data.map((team:any)=> this.fromWebApiObject(team));
        }
        static fromWebApiObject(data:any):TeamItem{
            return  {
                id: data._id ?? "",
                name: data.name ?? "",
                resources : DataParser.Resource.fromWebApiArray(data.resources) ?? []
            };
        }


        static toTeamWebApiCreate(data:TeamItem) : TeamCreateCommand{
            return {
                name: data.name,
                resources : data.resources.map((e:ResourceItem)=> e.id)
            }
        }

        static toTeamWebApiUpdate(data:TeamItem) : TeamUpdateCommand{
            return {
                id:data.id,
                name: data.name,
                resources : data.resources.map((e:ResourceItem)=> e.id)
            }
        }
    };

    static SearchItem = class {
        static fromWebApiArray(data:any):SearchItem[]{
            return  data.map((searchItem:any)=>({
                id: searchItem?._id ?? "",
                displayName: searchItem?.displayName ?? "",
                objectType : searchItem?.objectType ?? ""
            }));
        }
    };
}