import { z, ZodError } from 'zod';
import { ResourceCreateCommand, ResourceUpdateCommand, RoleCreateCommand, RoleUpdateCommand, SkillCreateCommand, SkillUpdateCommand } from '../data_layer/commands';
import { Request } from 'express';
import { SkillLevel } from '../data_layer/models';
import mongoose from 'mongoose';

export class Validators {
    static idValidator = z.string().refine((id) => mongoose.Types.ObjectId.isValid(id), {
        message: 'Invalid Id',
    });

    static optionalIdValidator = z.string().optional().refine((id) => id ? mongoose.Types.ObjectId.isValid(id) : true , {
        message: 'Invalid Id',
    });

    static skillValidator = z.object({
        skill : Validators.idValidator,
        skillLevel: z.nativeEnum(SkillLevel),
    });

    // Define a custom schema for ISO 8601 date strings
    static isoDateStringSchema = z.string().refine((value) => {
        const dateObject = new Date(value);
        return !isNaN(dateObject.getTime());
    }, {
        message: 'Invalid ISO 8601 date format',
    });

    static Skill = class {
        public static CreateRequest(req: Request): string[] {

            return Validators.validate(() => {
                const command = req.body as SkillCreateCommand;

                const schema = z.object({
                    name: z.string().min(1, 'Name must not be empty'),
                    // skillLevel: z.nativeEnum(SkillLevel),
                });
                schema.parse(command);
            });
        }

        public static UpdateRequest(req: Request): string[] {

            return Validators.validate(() => {
                const command = req.body as SkillUpdateCommand;
                command.id = req.params.id;

                const schema = z.object({
                    id: Validators.idValidator,
                    name: z.string().min(1, 'Name must not be empty'),
                    // skillLevel: z.nativeEnum(SkillLevel),
                });
                schema.parse(command);
            });
        }

        public static IdRequest(req: Request): string[] {
            return Validators.ValidateId(req);
        }
    }

    static Role = class {
        public static CreateRequest(req: Request): string[] {

            return Validators.validate(() => {
                const command = req.body as RoleCreateCommand;

                const schema = z.object({
                    name: z.string().min(1, 'Name must not be empty'),
                });
                schema.parse(command);
            });
        }

        public static UpdateRequest(req: Request): string[] {

            return Validators.validate(() => {
                const command = req.body as RoleUpdateCommand;
                command.id = req.params.id;

                const schema = z.object({
                    id: Validators.idValidator,
                    name: z.string().min(1, 'Name must not be empty'),
                });
                schema.parse(command);
            });
        }

        public static IdRequest(req: Request): string[] {
            return Validators.ValidateId(req);
        }
    }

    static Resource = class {
        public static CreateRequest(req: Request): string[] {

            return Validators.validate(() => {
                const command = req.body as ResourceCreateCommand;

                const schema = z.object({
                    name: z.string().min(1, 'Name must not be empty'),
                    lastName: z.string().min(3, 'Should be at least 3 characters long'),
                    birthDate: Validators.isoDateStringSchema,
                    occupation: z.string().min(3, 'Should be at least 3 characters long'),
                    locality: z.string().min(3, 'Should be at least 3 characters long'),
                    biography: z.string().min(10, 'Should be at least 3 characters long'),
                    role : Validators.optionalIdValidator,
                    // skills : z.array(Validators.idValidator).default([])
                    skills : z.array(Validators.skillValidator).default([])
                });
                schema.parse(command);
            });
        }

        public static UpdateRequest(req: Request): string[] {

            return Validators.validate(() => {
                const command = req.body as ResourceUpdateCommand;
                command.id = req.params.id;

                const schema = z.object({
                    id: Validators.idValidator,
                    name: z.string().min(1, 'Name must not be empty'),
                    lastName: z.string().min(3, 'Should be at least 3 characters long'),
                    birthDate: Validators.isoDateStringSchema,
                    occupation: z.string().min(3, 'Should be at least 3 characters long'),
                    locality: z.string().min(3, 'Should be at least 3 characters long'),
                    biography: z.string().min(10, 'Should be at least 3 characters long'),
                    role : Validators.optionalIdValidator,
                    // skills : z.array(Validators.idValidator).default([])                    
                    skills : z.array(Validators.skillValidator).default([])
                });
                schema.parse(command);
            });
        }

        public static IdRequest(req: Request): string[] {
            return Validators.ValidateId(req);
        }
    }

    static Team = class {
        public static CreateRequest(req: Request): string[] {

            return Validators.validate(() => {
                const command = req.body as ResourceCreateCommand;

                const schema = z.object({
                    name: z.string().min(1, 'Name must not be empty'),
                    resources : z.array(Validators.idValidator).default([])
                });
                schema.parse(command);
            });
        }

        public static UpdateRequest(req: Request): string[] {

            return Validators.validate(() => {
                const command = req.body as ResourceUpdateCommand;
                command.id = req.params.id;

                const schema = z.object({
                    id: Validators.idValidator,
                    name: z.string().min(1, 'Name must not be empty'),
                    skills : z.array(Validators.idValidator).default([])
                });
                schema.parse(command);
            });
        }

        public static IdRequest(req: Request): string[] {
            return Validators.ValidateId(req);
        }
    }
    public static ValidateId(req: Request): string[] {

        return Validators.validate(() => {
            const { id } = req.params;

            const schema = z.object({
                id: Validators.idValidator,
            });
            schema.parse({ id });
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