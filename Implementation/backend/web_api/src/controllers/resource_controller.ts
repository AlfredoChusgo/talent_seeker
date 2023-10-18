import { Request, Response } from 'express';
import { ResourceModel } from "../data_layer/schemas";
import { ResponseHelper } from "../helpers/response_helper";
import { Validators } from "../validators/validators";
import { ResourceCreateCommand } from '../data_layer/commands';

export class ResourceController {

    public static async getAll(req: Request, res: Response) {

        const models = await ResourceModel.find({}).populate("role").populate("skills.skill");
        const response = ResponseHelper.createResponseSuccess("", models);
        return res.json(response);
    }

    public static async create(req: Request, res: Response) {
        const errors = Validators.Resource.CreateRequest(req);
        if (errors.length > 0) {
            return res.json(ResponseHelper.createErrorResponse(errors));
        }
        
        try {
            const createModel = await ResourceModel.create(req.body);
            const response = ResponseHelper.createResponseSuccess("Resource created successfuly", createModel.toObject());
            return res.json(response);
        } catch (error) {
            console.log(error);
        }
    }

    public static async update(req: Request, res: Response) {
        const errors = Validators.Resource.UpdateRequest(req);
        if (errors.length > 0) {
            return res.json(ResponseHelper.createErrorResponse(errors));
        }
        const { id } = req.params;
        const command = {
            name: req.body.name,
            lastName : req.body.lastName,
            birthDate : req.body.birthDate,
            occupation : req.body.occupation,
            biography : req.body.biography,
            locality : req.body.locality,
            role : req.body.role,
            skills : req.body.skills,
        };
        const updateModel = await ResourceModel.findOneAndUpdate({ _id: id }, command, { new: true });

        const response = ResponseHelper.createResponseSuccess("Resource updated successfuly", updateModel);
        return res.json(response);
    }

    public static async findById(req: Request, res: Response) {
        const errors = Validators.Resource.IdRequest(req);
        if (errors.length > 0) {
            return res.json(ResponseHelper.createErrorResponse(errors));
        }

        const { id } = req.params;
        const model = await ResourceModel.findById(id);
        if (!model) {
            return ResponseHelper.createErrorResponse([`No document found with the specified ID:${id}`]);
        }
        const response = ResponseHelper.createResponseSuccess("Resource updated successfuly", model);
        return res.json(response);
    }

    public static async delete(req: Request, res: Response) {
        const errors = Validators.Resource.IdRequest(req);
        if (errors.length > 0) {
            return res.json(ResponseHelper.createErrorResponse(errors));
        }

        const { id } = req.params;

        const model = await ResourceModel.findByIdAndDelete(id);
        if (!model) {
            return res.json(ResponseHelper.createErrorResponse([`No document found with the specified ID:${id}`]));
        }

        const response = ResponseHelper.createResponseSuccess("Resource delete successfuly", model);
        return res.json(response);
    }
}