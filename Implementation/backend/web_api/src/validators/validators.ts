import { z, ZodError } from 'zod';
import { SkillCreateCommand, SkillUpdateCommand } from '../data_layer/commands';
import { Request } from 'express';
import { SkillLevel } from '../data_layer/models';
import mongoose from 'mongoose';

export class Validators {
    static  idValidator= z.string().refine((id) => mongoose.Types.ObjectId.isValid(id), {
        message: 'Invalid Id',
      });

    public static ValidateCreateSkill(req: Request): string[] {

        return Validators.validate(() => {
            const command = req.body as SkillCreateCommand;

            const schema = z.object({
                name: z.string().min(1, 'Name must not be empty'),
                skillLevel: z.nativeEnum(SkillLevel),
            });
            schema.parse(command);
        });
    }

    public static ValidateUpdateSkill(req: Request): string[] {

        return Validators.validate(() => {
            const command = req.body as SkillUpdateCommand;
            command.id = req.params.id;

            const schema = z.object({
                id: Validators.idValidator,
                name: z.string().min(1, 'Name must not be empty'),
                skillLevel: z.nativeEnum(SkillLevel),
            });
            schema.parse(command);
        });
    }

    public static ValidateIdSkill(req: Request): string[] {

        return Validators.validate(() => {
            const {id} = req.params ;

            const schema = z.object({
                id: Validators.idValidator,
            });
            schema.parse({id});
        });
    }

    public static validate(callback: () => void): string[] {
        try {
            // Attempt to parse and validate the input
            callback();
            // If validation succeeds, return an empty array (no errors)
            return [];
        } catch (error) {
            if (error instanceof ZodError) {
                // If validation fails, return an array of error messages
                return error.issues.map((issue) => issue.message);
            } else {
                // Handle unexpected errors
                console.error('Unexpected validation error:', error);
                return ['An unexpected error occurred during validation.'];
            }
        }
    }
}