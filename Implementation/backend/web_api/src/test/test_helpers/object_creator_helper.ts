import { Express } from "express";
import { RequestControllerHelper } from "./request_controller_helper";
import request from 'supertest';

export class ObjectCreatorHelper {

    static Role = class {
        static async Create(app: Express) {
            const req = RequestControllerHelper.getRoleCreateRequestBody();
            const response = await request(app).post("/api/roles").send(req);
            return response.body.data;
        }
    };

    static Skill = class {
        static async Create(app: Express, count: number) {
            const skills:any[] = [];
            for (let index = 0; index < count; index++) {
                const req = RequestControllerHelper.getSkillCreateRequestBody();
                const response = await request(app).post("/api/skills").send(req);
                skills.push(response.body.data);
            }
            return skills;
        }
    }

    static Resource = class {
        static async Create(app: Express, count: number) {
            const resources:any[] = [];
            for (let index = 0; index < count; index++) {
                const role: any = await ObjectCreatorHelper.Role.Create(app);
                const skills: any = await ObjectCreatorHelper.Skill.Create(app, 5);
                const skillIds = skills.map((skill: any) => skill._id);

                const req = RequestControllerHelper.getResourceCreateRequestBody(role._id, [...skillIds]);
                const response = await request(app).post("/api/resources").send(req);
                resources.push(response.body.data);
            }
            return resources;
        }
    }

    static Team = class {
        static async Create(app: Express, teamCount: number, resourcesByTeamCount: number) {
            const teams :any[]= [];
            for (let index = 0; index < teamCount; index++) {
                const resources: any = await ObjectCreatorHelper.Resource.Create(app,resourcesByTeamCount);
                const resourceIds = resources.map((resource: any) => resource._id);

                const req = RequestControllerHelper.getTeamCreateRequestBody( [...resourceIds]);
                const response = await request(app).post("/api/teams").send(req);
                teams.push(response.body.data);
            }
            return teams;
        }
    }

}