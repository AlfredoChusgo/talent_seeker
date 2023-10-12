import { ResourceItem, RoleItem, SearchItem, SkillItem, SkillLevel, TeamCreateCommand, TeamItem, TeamUpdateCommand } from "./models";


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
        
        static fromWebApi(data:any[]):SkillItem[]{
            return  data.map((e:any)=> ({
                id: e?._id ?? "",
                name: e?.name ?? "",
                skillLevel : this.parseSkillLevel(e?.skillLevel ?? "")
            }));
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
                role : DataParser.Role.fromWebApiObject(data.role) ?? { id:"",name:""},
                skills : DataParser.Skill.fromWebApi(data.skills) ?? []
            }
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