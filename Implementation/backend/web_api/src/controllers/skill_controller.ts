import { SkillCreateCommand, SkillUpdateCommand } from "../data_layer/commands";
import { Router, Request, Response } from 'express';
import { SkillModel } from "../data_layer/schemas";
import { ApiResponse, ErrorResponse } from "../data_layer/web_api_response";
import { ResponseHelper } from "../helpers/response_helper";
import { Validators } from "../validators/validators";

class SkillController {

    public static async create(req: Request, res: Response) {
        const errors = Validators.ValidateCreateSkill(req);
        if (errors.length > 0) {
            return ResponseHelper.createErrorResponse(errors);
        }

        const createModel = await SkillModel.create(req.body);
        const response = ResponseHelper.createResponseSuccess("Skill created successfuly", createModel);
        return res.json(response);
    }

    public static async update(req: Request, res: Response) {
        const errors = Validators.ValidateUpdateSkill(req);
        if (errors.length > 0) {
            return ResponseHelper.createErrorResponse(errors);
        }
        const { id, name, skillLevel } = req.body;
        const updateModel = await SkillModel.findOneAndUpdate({ _id: id }, { name, skillLevel });

        const response = ResponseHelper.createResponseSuccess("Skill updated successfuly", updateModel);
        return res.json(response);
    }

    public static async findById(req: Request, res: Response) {
        const errors = Validators.ValidateIdSkill(req);
        if (errors.length > 0) {
            return ResponseHelper.createErrorResponse(errors);
        }

        const { id } = req.body;
        const model = await SkillModel.findById(id);
        if(!model){
            return ResponseHelper.createErrorResponse([`No document found with the specified ID:${id}`]);
        }
        const response = ResponseHelper.createResponseSuccess("Skill updated successfuly", model);
        return res.json(response);
    }

    public static async delete(req: Request, res: Response) {
        const errors = Validators.ValidateIdSkill(req);
        if (errors.length > 0) {
            return ResponseHelper.createErrorResponse(errors);
        }

        const { id } = req.body;

        const model = await SkillModel.findByIdAndDelete(id);
        if(!model){
            return ResponseHelper.createErrorResponse([`No document found with the specified ID:${id}`]);
        }

        const response = ResponseHelper.createResponseSuccess("skill delete successfuly", model);
        return res.json(response);
    }
}