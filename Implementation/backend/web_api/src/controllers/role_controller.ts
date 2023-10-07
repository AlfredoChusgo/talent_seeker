import { SkillCreateCommand, SkillUpdateCommand } from "../data_layer/commands";
import { Router, Request, Response } from 'express';
import { RoleModel } from "../data_layer/schemas";
import { ResponseHelper } from "../helpers/response_helper";
import { Validators } from "../validators/validators";

export class RoleController {

    public static async getAll(req: Request, res: Response) {

        const models = await RoleModel.find({});
        const response = ResponseHelper.createResponseSuccess("", models);
        return res.json(response);
    }

    public static async create(req: Request, res: Response) {
        const errors = Validators.Role.CreateRequest(req);
        if (errors.length > 0) {
            return res.json(ResponseHelper.createErrorResponse(errors));
        }

        const createModel = await RoleModel.create(req.body);
        const response = ResponseHelper.createResponseSuccess("Role created successfuly", createModel.toObject());
        return res.json(response);
    }

    public static async update(req: Request, res: Response) {
        const errors = Validators.Role.UpdateRequest(req);
        if (errors.length > 0) {
            return res.json(ResponseHelper.createErrorResponse(errors));
        }
        const { id } = req.params;
        const { name} = req.body;
        const updateModel = await RoleModel.findOneAndUpdate({ _id: id }, { name}, { new: true });

        const response = ResponseHelper.createResponseSuccess("Role updated successfuly", updateModel);
        return res.json(response);
    }

    public static async findById(req: Request, res: Response) {
        const errors = Validators.Role.IdRequest(req);
        if (errors.length > 0) {
            return res.json(ResponseHelper.createErrorResponse(errors));
        }

        const { id } = req.params;
        const model = await RoleModel.findById(id);
        if (!model) {
            return ResponseHelper.createErrorResponse([`No document found with the specified ID:${id}`]);
        }
        const response = ResponseHelper.createResponseSuccess("Role updated successfuly", model);
        return res.json(response);
    }

    public static async delete(req: Request, res: Response) {
        const errors = Validators.Role.IdRequest(req);
        if (errors.length > 0) {
            return res.json(ResponseHelper.createErrorResponse(errors));
        }

        const { id } = req.params;

        const model = await RoleModel.findByIdAndDelete(id);
        if (!model) {
            return res.json(ResponseHelper.createErrorResponse([`No document found with the specified ID:${id}`]));
        }

        const response = ResponseHelper.createResponseSuccess("Role delete successfuly", model);
        return res.json(response);
    }
}