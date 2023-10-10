import { SkillModel, RoleModel, ResourceModel, TeamModel } from "../../data_layer/schemas";


export class DatabaseHelper { 
    public static async EmptyDatabase(){
        await SkillModel.deleteMany({});
        await RoleModel.deleteMany({});
        await ResourceModel.deleteMany({});
        await TeamModel.deleteMany({});
    }
}