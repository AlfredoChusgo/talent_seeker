import { Request, Response } from 'express';
import { TeamModel } from "../data_layer/schemas";
import { ResponseHelper } from "../helpers/response_helper";
import { Validators } from "../validators/validators";

export class TeamController {

    public static async getAll(req: Request, res: Response) {

        const models = await TeamModel.find({}).populate({
            path: 'resources',
            model: 'Resources',
            populate: [
                {
                    path: 'role',
                    model: 'Role'
                },
                {
                    path: 'skills',
                    model: 'Skills'
                }
            ]
        });
        const response = ResponseHelper.createResponseSuccess("", models);
        return res.json(response);
    }

    public static async create(req: Request, res: Response) {
        const errors = Validators.Team.CreateRequest(req);
        if (errors.length > 0) {
            return res.json(ResponseHelper.createErrorResponse(errors));
        }

        try {
            const createModel = await TeamModel.create(req.body);
            const response = ResponseHelper.createResponseSuccess("Team created successfuly", createModel.toObject());
            return res.json(response);
        } catch (error) {
            console.log(error);
        }
    }

    public static async update(req: Request, res: Response) {
        const errors = Validators.Team.UpdateRequest(req);
        if (errors.length > 0) {
            return res.json(ResponseHelper.createErrorResponse(errors));
        }
        const { id } = req.params;
        const command = {
            name: req.body.name,
            resources: req.body.resources,
        };
        try {
            const updateModel = await TeamModel.findOneAndUpdate({ _id: id }, command, { new: true });
            const response = ResponseHelper.createResponseSuccess("Team updated successfuly", updateModel);
            return res.json(response);
        } catch (error) {
            throw error
        }


    }

    public static async findById(req: Request, res: Response) {
        const errors = Validators.Team.IdRequest(req);
        if (errors.length > 0) {
            return res.json(ResponseHelper.createErrorResponse(errors));
        }

        const { id } = req.params;
        const model = await TeamModel.findById(id).populate({
            path: 'resources',
            model: 'Resource',
            populate: [
                {
                    path: 'role',
                    model: 'Role'
                },
                {
                    path: 'skills',
                    model: 'Skill'
                }
            ]
        });
        if (!model) {
            return ResponseHelper.createErrorResponse([`No document found with the specified ID:${id}`]);
        }
        const response = ResponseHelper.createResponseSuccess("Team updated successfuly", model);
        return res.json(response);
    }

    public static async delete(req: Request, res: Response) {
        const errors = Validators.Team.IdRequest(req);
        if (errors.length > 0) {
            return res.json(ResponseHelper.createErrorResponse(errors));
        }

        const { id } = req.params;

        const model = await TeamModel.findByIdAndDelete(id);
        if (!model) {
            return res.json(ResponseHelper.createErrorResponse([`No document found with the specified ID:${id}`]));
        }

        const response = ResponseHelper.createResponseSuccess("Team delete successfuly", model);
        return res.json(response);
    }
}