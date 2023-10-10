import { Request, Response } from 'express';
import { ResourceModel, RoleModel, SkillModel, TeamModel } from "../data_layer/schemas";
import { ResponseHelper } from "../helpers/response_helper";
import { SearchItem } from '../data_layer/view_models';

export class SearchController {

    public static async getSearchItems(req: Request, res: Response){
        const result : SearchItem []= [];
        const skills = await SkillModel.find({});
        const roles = await RoleModel.find({});
        const resources = await ResourceModel.find({});

        skills.forEach(skill => {
            result.push({
                id: skill._id,
                displayName: `${skill.name}`,
                objectType: 'skill',
            });
        });

        roles.forEach(role => {
            result.push({
                id: role._id,
                displayName: `${role.name}`,
                objectType: 'role',
            });
        });

        resources.forEach(resource => {
            result.push({
                id: resource._id,
                displayName: `${resource.name}`,
                objectType: 'resource',
            });
        });

        const response = ResponseHelper.createResponseSuccess("", result);
        return res.json(response);
    }

    public static async getTeamsSearchItems(req: Request, res: Response){
        const result : SearchItem []= [];
        const teams = await TeamModel.find({});

        teams.forEach(team => {
            result.push({
                id: team._id,
                displayName: `${team.name}`,
                objectType: 'team',
            });
        });

        const response = ResponseHelper.createResponseSuccess("", result);
        return res.json(response);
    }

}