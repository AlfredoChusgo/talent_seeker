import { createServer } from '../../app';
import { connectDB } from '../../data_layer/databases/moongose_config';
import request from 'supertest';
import { RequestControllerHelper } from '../test_helpers/request_controller_helper';
import { DatabaseHelper } from '../test_helpers/database_helper';

describe('SkillController', () => {
    let app = createServer();
    beforeAll(async () => {
        await connectDB("mongodb://localhost:27017");
        await DatabaseHelper.EmptyDatabase();
    });
    afterEach(() => {
        jest.restoreAllMocks();
    });

    describe('getAll', () => {
        it('should fetch all the skills', async () => {
            const response = await request(app).get("/api/skills").send();

            expect(response).not.toBeNull();
            expect(response.status).toBe(200);
            expect(response.body.success).toBeTruthy();
            expect(response.body.data).not.toBeNull();
        });
    });

    describe('create', () => {
        it('should create a new skill - happy path', async () => {

            const req = RequestControllerHelper.getSkillCreateRequestBody();

            const response = await request(app).post("/api/skills").send(req);

            expect(response).not.toBeNull();
            expect(response.status).toBe(200);
            expect(response.body.success).toBeTruthy();
            expect(response.body.data).not.toBeNull();
            expect(response.body.data.name).toBe(req.name);
        });

        it('should fail if request is empty', async () => {

            const req = {};

            const response = await request(app).post("/api/skills").send(req);

            expect(response).not.toBeNull();
            expect(response.status).toBe(200);
            expect(response.body.success).toBeFalsy();
            expect(response.body.errors).not.toBeNull();
        });

        it('should fail if request body name is empty', async () => {

            const req = RequestControllerHelper.getSkillCreateRequestBody();
            req.name = "";

            const response = await request(app).post("/api/skills").send(req);

            expect(response).not.toBeNull();
            expect(response.status).toBe(200);
            expect(response.body.success).toBeFalsy();
            expect(response.body.errors).not.toBeNull();
            expect(response.body.errors.length).toBeGreaterThan(0);
        });

        it('should fail if skill have a wrong value', async () => {

            const req = RequestControllerHelper.getSkillCreateRequestBody() as any;
            req.skillLevel = 10;

            const response = await request(app).post("/api/skills").send(req);

            expect(response).not.toBeNull();
            expect(response.status).toBe(200);
            expect(response.body.success).toBeFalsy();
            expect(response.body.errors).not.toBeNull();
            expect(response.body.errors.length).toBeGreaterThan(0);
        });
    });

    describe('update', () => {
        it('it should update a skill', async () => {
            const req = RequestControllerHelper.getSkillCreateRequestBody();
            const responseModel = await request(app).post("/api/skills").send(req);
            const modelId = responseModel.body.data._id;
            const reqUpdated = RequestControllerHelper.getSkillCreateRequestBody();
            const response = await request(app).put(`/api/skills/${modelId}`).send(reqUpdated);

            expect(response).not.toBeNull();
            expect(response.status).toBe(200);
            expect(response.body.success).toBeTruthy();
            expect(response.body.data._id).toBe(modelId);
            expect(response.body.data.name).toBe(reqUpdated.name);
            expect(response.body.data.skillLevel).toBe(`${reqUpdated.skillLevel}`);
        });

        it('it should fail updating a skill with a empty Id', async () => {
            //const req = RequestControllerHelper.getSkillCreateRequestBody();
            //const responseModel = await request(app).post("/api/skills").send(req);
            const modelId = "";
            const reqUpdated = RequestControllerHelper.getSkillCreateRequestBody();
            const response = await request(app).put(`/api/skills/${modelId}`).send(reqUpdated);

            expect(response).not.toBeNull();
            expect(response.status).toBe(404);
        });
    });

    describe('find By Id', () => {
        it('it should find a skill by id ', async () => {
            const req = RequestControllerHelper.getSkillCreateRequestBody();

            const createSkillResponse = await request(app).post("/api/skills").send(req);
            const modelId = createSkillResponse.body.data._id;
            const response = await request(app).get(`/api/skills/${modelId}`).send();

            expect(response).not.toBeNull();
            expect(response.status).toBe(200);
            expect(response.body.success).toBeTruthy();
            expect(response.body.data._id).toBe(modelId);
            expect(response.body.data.name).toBe(req.name);            
            expect(response.body.data.skillLevel).toBe(`${req.skillLevel}`);
        });

        it('it should return a error response when the id does not exist ', async () => {

            const modelId = `${new Date().getUTCMilliseconds()}`;
            const response = await request(app).get(`/api/skills/${modelId}`).send();

            expect(response).not.toBeNull();
            expect(response.status).toBe(200);
            expect(response.body.success).toBeFalsy();
            expect(response.body.errors).not.toBeNull();
            expect(response.body.errors.length).toBeGreaterThan(0);
        });
    });

    describe('Delete', () => {
        it('it should delete a skill just created ', async () => {
            const req = RequestControllerHelper.getSkillCreateRequestBody();

            const createSkillResponse = await request(app).post("/api/skills").send(req);
            const modelId = createSkillResponse.body.data._id;
            const response = await request(app).delete(`/api/skills/${modelId}`).send();

            expect(response).not.toBeNull();
            expect(response.status).toBe(200);
            expect(response.body.success).toBeTruthy();
            expect(response.body.data._id).toBe(modelId);
            expect(response.body.data.name).toBe(req.name);            
            expect(response.body.data.skillLevel).toBe(`${req.skillLevel}`);
        });

        it('it should return a error response when the id does not exist ', async () => {

            const modelId = `${new Date().getUTCMilliseconds()}`;
            const response = await request(app).delete(`/api/skills/${modelId}`).send();

            expect(response).not.toBeNull();
            expect(response.status).toBe(200);
            expect(response.body.success).toBeFalsy();
            expect(response.body.errors).not.toBeNull();            
        });
    });

    // Add similar test cases for other methods (update, findById, delete)
});
