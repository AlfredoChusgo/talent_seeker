import { SkillCreateCommand, SkillUpdateCommand } from "../../data_layer/commands";
import { faker } from '@faker-js/faker';
import { SkillLevel } from "../../data_layer/models";

export class RequestControllerHelper {

    public static getSkillCreateRequestBody():SkillCreateCommand{
        return {
            name: faker.company.name(),
            skillLevel: faker.helpers.enumValue(SkillLevel)
        };
    }

    // public static getSkillUpdateRequest(id:string):SkillUpdateCommand{
    //     return {
    //         id:
    //         name: faker.company.name(),
    //         skillLevel: faker.helpers.enumValue(SkillLevel)
    //     };
    // }
}