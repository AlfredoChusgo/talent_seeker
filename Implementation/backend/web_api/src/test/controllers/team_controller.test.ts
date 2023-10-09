import { createServer } from '../../app';
import { connectDB } from '../../data_layer/databases/moongose_config';
import request from 'supertest';
import { RequestControllerHelper } from '../test_helpers/request_controller_helper';
import { ObjectCreatorHelper } from '../test_helpers/object_creator_helper';
import exp from 'constants';

describe('TeamController', () => {
    let app = createServer();
    beforeAll(async () => {
        await connectDB("mongodb://localhost:27017");
    });
    afterEach(() => {
        jest.restoreAllMocks();
    });

    describe('getAll', () => {
        it('should fetch all the teams', async () => {
            const count = 5;
            const teams = await ObjectCreatorHelper.Team.Create(app, count,2);
            const response = await request(app).get("/api/teams").send();

            expect(response).not.toBeNull();
            expect(response.status).toBe(200);
            expect(response.body.success).toBeTruthy();
            expect(response.body.data).not.toBeNull();
            expect(response.body.data.length).toBeGreaterThan(teams.length);
        });
    });

    describe('create', () => {
        it('should create a new team without resources', async () => {
            const req = RequestControllerHelper.getTeamCreateRequestBody([]);

            const response = await request(app).post("/api/teams").send(req);

            expect(response).not.toBeNull();
            expect(response.status).toBe(200);
            expect(response.body.success).toBeTruthy();
            expect(response.body.data).not.toBeNull();
            expect(response.body.data.name).toBe(req.name);
        });

        it('should create a new team with resources', async () => {
            const teamCount = 1 ;
            const resourceCount = 10;
            const teams = await ObjectCreatorHelper.Team.Create(app, teamCount,resourceCount);
            expect(teams.length).toBe(teamCount);
            expect(teams.map((team)=> team.resources.length)).toEqual(Array(teamCount).fill(resourceCount));
        });

        it('should fail if request is empty', async () => {

            const req = {};

            const response = await request(app).post("/api/teams").send(req);

            expect(response).not.toBeNull();
            expect(response.status).toBe(200);
            expect(response.body.success).toBeFalsy();
            expect(response.body.errors).not.toBeNull();
        });

        it('should fail if request body name is empty', async () => {

            const req = (await ObjectCreatorHelper.Team.Create(app,1, 0))[0];
            req.name = "";

            const response = await request(app).post("/api/teams").send(req);

            expect(response).not.toBeNull();
            expect(response.status).toBe(200);
            expect(response.body.success).toBeFalsy();
            expect(response.body.errors).not.toBeNull();
            expect(response.body.errors.length).toBeGreaterThan(0);
        });

        it('should fail if team have a wrong value', async () => {

            const req = (await ObjectCreatorHelper.Team.Create(app, 1,5))[0] as any;
            req.name = "a";
            req.resources = ["abc","b32"];

            const response = await request(app).post("/api/teams").send(req);

            expect(response).not.toBeNull();
            expect(response.status).toBe(200);
            expect(response.body.success).toBeFalsy();
            expect(response.body.errors).not.toBeNull();
            expect(response.body.errors.length).toBeGreaterThan(0);
        });
    });

    describe('update', () => {
        it('it should update a skill', async () => {
            const teams = await ObjectCreatorHelper.Team.Create(app,2, 2);
            //const responseModel = await request(app).post("/api/teams").send(req);
            //const modelId = responseModel.body.data._id;
            const team = teams[0];
            const updatedTeam = teams[1];
            const newResources = updatedTeam.resources.map((e:any) => e.toString());
            const reqUpdated = { ...updatedTeam, resources: newResources };

            const response = await request(app).put(`/api/teams/${team._id}`).send(reqUpdated);

            expect(response).not.toBeNull();
            expect(response.status).toBe(200);
            expect(response.body.success).toBeTruthy();
            expect(response.body.data._id).toBe(team._id);
            expect(response.body.data.name).toBe(reqUpdated.name);
            expect(response.body.data.resources).toEqual(reqUpdated.resources.map((e:any) => e.toString()));
        });

        it('it should fail updating a team with a empty Id', async () => {
            const modelId = "";
            const reqUpdated = {};
            const response = await request(app).put(`/api/teams/${modelId}`).send(reqUpdated);

            expect(response).not.toBeNull();
            expect(response.status).toBe(404);
        });
    });

    describe('find By Id', () => {
        it('it should find a team by id ', async () => {
            const team = (await ObjectCreatorHelper.Team.Create(app,1,1))[0];
            
            const modelId = team._id;
            const response = await request(app).get(`/api/teams/${modelId}`).send();

            expect(response).not.toBeNull();
            expect(response.status).toBe(200);
            expect(response.body.success).toBeTruthy();
            expect(response.body.data._id).toBe(modelId);
            expect(response.body.data._id).toBe(team._id);
            expect(response.body.data.name).toBe(team.name);
            expect(response.body.data.resources).toEqual(team.resources.map((e:any) => e.toString()));
        });

        it('it should return a error response when the id does not exist ', async () => {

            const modelId = `${new Date().getUTCMilliseconds()}`;
            const response = await request(app).get(`/api/teams/${modelId}`).send();

            expect(response).not.toBeNull();
            expect(response.status).toBe(200);
            expect(response.body.success).toBeFalsy();
            expect(response.body.errors).not.toBeNull();
            expect(response.body.errors.length).toBeGreaterThan(0);
        });
    });

    describe('Delete', () => {
        it('it should delete a team just created ', async () => {
            const team = (await ObjectCreatorHelper.Team.Create(app,1,1))[0];

            const modelId = team._id;
            const response = await request(app).delete(`/api/teams/${modelId}`).send();

            expect(response).not.toBeNull();
            expect(response.status).toBe(200);
            expect(response.body.success).toBeTruthy();
            expect(response.body.data._id).toBe(modelId);
            expect(response.body.data.name).toBe(team.name);
            expect(response.body.data.resources).toEqual(team.resources.map((e:any) => e.toString()));
        });

        it('it should return a error response when the id does not exist ', async () => {

            const modelId = `${new Date().getUTCMilliseconds()}`;
            const response = await request(app).delete(`/api/teams/${modelId}`).send();

            expect(response).not.toBeNull();
            expect(response.status).toBe(200);
            expect(response.body.success).toBeFalsy();
            expect(response.body.errors).not.toBeNull();            
        });
    });

    // Add similar test cases for other methods (update, findById, delete)
});
