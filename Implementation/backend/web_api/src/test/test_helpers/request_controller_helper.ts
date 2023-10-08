import { RoleCreateCommand, SkillCreateCommand, SkillUpdateCommand } from "../../data_layer/commands";
import { faker } from '@faker-js/faker';
import { SkillLevel } from "../../data_layer/models";
import mongoose from "mongoose";
import { ResourceDocument } from "../../data_layer/schemas";

export class RequestControllerHelper {

    public static getSkillCreateRequestBody(): SkillCreateCommand {
        return {
            name: faker.company.name(),
            skillLevel: faker.helpers.enumValue(SkillLevel)
        };
    }

    public static getRoleCreateRequestBody(): RoleCreateCommand {
        return {
            name: faker.person.jobType(),
        };
    }

    public static getResourceCreateRequestBody(roleId: string, skillIds: string[]): ResourceDocument {
        const role = roleId ? new mongoose.Types.ObjectId(roleId) : undefined;
        const resourceData: Partial<ResourceDocument> = {
            name: faker.person.jobType(),
            lastName: faker.person.lastName(),
            birthDate: faker.date.between({ from: '1980-01-01T00:00:00.000Z', to: '2005-01-01T00:00:00.000Z' }).toISOString(),
            occupation: faker.person.jobTitle(),
            locality: faker.location.country(),
            biography: faker.lorem.paragraphs(5),
            role: role,
            skills: skillIds.map(skillId => new mongoose.Types.ObjectId(skillId))
        };

        const resource: ResourceDocument = resourceData as ResourceDocument;
        return resource;
    }


    // public static getSkillUpdateRequest(id:string):SkillUpdateCommand{
    //     return {
    //         id:
    //         name: faker.company.name(),
    //         skillLevel: faker.helpers.enumValue(SkillLevel)
    //     };
    // }
}