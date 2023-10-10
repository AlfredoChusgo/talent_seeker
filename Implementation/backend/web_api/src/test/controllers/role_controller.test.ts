import { createServer } from '../../app';
import { connectDB } from '../../data_layer/databases/moongose_config';
import request from 'supertest';
import { RequestControllerHelper } from '../test_helpers/request_controller_helper';
import { DatabaseHelper } from '../test_helpers/database_helper';

describe('RoleController', () => {
    let app = createServer();
    beforeAll(async () => {
        await connectDB("mongodb://localhost:27017");
        await DatabaseHelper.EmptyDatabase();
    });
    afterEach(() => {
        jest.restoreAllMocks();
    });

    describe('getAll', () => {
        it('should fetch all the roles', async () => {
            const response = await request(app).get("/api/roles").send();

            expect(response).not.toBeNull();
            expect(response.status).toBe(200);
            expect(response.body.success).toBeTruthy();
            expect(response.body.data).not.toBeNull();
        });
    });

    describe('create', () => {
        it('should create a new role - happy path', async () => {

            const req = RequestControllerHelper.getRoleCreateRequestBody();

            const response = await request(app).post("/api/roles").send(req);

            expect(response).not.toBeNull();
            expect(response.status).toBe(200);
            expect(response.body.success).toBeTruthy();
            expect(response.body.data).not.toBeNull();
            expect(response.body.data.name).toBe(req.name);
        });

        it('should fail if request is empty', async () => {

            const req = {};

            const response = await request(app).post("/api/roles").send(req);

            expect(response).not.toBeNull();
            expect(response.status).toBe(200);
            expect(response.body.success).toBeFalsy();
            expect(response.body.errors).not.toBeNull();
        });

        it('should fail if request body name is empty', async () => {

            const req = RequestControllerHelper.getRoleCreateRequestBody();
            req.name = "";

            const response = await request(app).post("/api/roles").send(req);

            expect(response).not.toBeNull();
            expect(response.status).toBe(200);
            expect(response.body.success).toBeFalsy();
            expect(response.body.errors).not.toBeNull();
            expect(response.body.errors.length).toBeGreaterThan(0);
        });
    });

    describe('update', () => {
        it('it should update a role', async () => {
            const req = RequestControllerHelper.getRoleCreateRequestBody();
            const responseModel = await request(app).post("/api/roles").send(req);
            const modelId = responseModel.body.data._id;
            const reqUpdated = RequestControllerHelper.getRoleCreateRequestBody();
            const response = await request(app).put(`/api/roles/${modelId}`).send(reqUpdated);

            expect(response).not.toBeNull();
            expect(response.status).toBe(200);
            expect(response.body.success).toBeTruthy();
            expect(response.body.data._id).toBe(modelId);
            expect(response.body.data.name).toBe(reqUpdated.name);
        });

        it('it should fail updating a role with a empty Id', async () => {
            //const req = RequestControllerHelper.getRoleCreateRequestBody();
            //const responseModel = await request(app).post("/api/roles").send(req);
            const modelId = "";
            const reqUpdated = RequestControllerHelper.getRoleCreateRequestBody();
            const response = await request(app).put(`/api/roles/${modelId}`).send(reqUpdated);

            expect(response).not.toBeNull();
            expect(response.status).toBe(404);
        });
    });

    describe('find By Id', () => {
        it('it should find a role by id ', async () => {
            const req = RequestControllerHelper.getRoleCreateRequestBody();

            const createRoleResponse = await request(app).post("/api/roles").send(req);
            const modelId = createRoleResponse.body.data._id;
            const response = await request(app).get(`/api/roles/${modelId}`).send();

            expect(response).not.toBeNull();
            expect(response.status).toBe(200);
            expect(response.body.success).toBeTruthy();
            expect(response.body.data._id).toBe(modelId);
            expect(response.body.data.name).toBe(req.name);            
        });

        it('it should return a error response when the id does not exist ', async () => {

            const modelId = `${new Date().getUTCMilliseconds()}`;
            const response = await request(app).get(`/api/roles/${modelId}`).send();

            expect(response).not.toBeNull();
            expect(response.status).toBe(200);
            expect(response.body.success).toBeFalsy();
            expect(response.body.errors).not.toBeNull();
            expect(response.body.errors.length).toBeGreaterThan(0);
        });
    });

    describe('Delete', () => {
        it('it should delete a role just created ', async () => {
            const req = RequestControllerHelper.getRoleCreateRequestBody();

            const createRoleResponse = await request(app).post("/api/roles").send(req);
            const modelId = createRoleResponse.body.data._id;
            const response = await request(app).delete(`/api/roles/${modelId}`).send();

            expect(response).not.toBeNull();
            expect(response.status).toBe(200);
            expect(response.body.success).toBeTruthy();
            expect(response.body.data._id).toBe(modelId);
            expect(response.body.data.name).toBe(req.name);            
        });

        it('it should return a error response when the id does not exist ', async () => {

            const modelId = `${new Date().getUTCMilliseconds()}`;
            const response = await request(app).delete(`/api/roles/${modelId}`).send();

            expect(response).not.toBeNull();
            expect(response.status).toBe(200);
            expect(response.body.success).toBeFalsy();
            expect(response.body.errors).not.toBeNull();            
        });
    });

    // Add similar test cases for other methods (update, findById, delete)
});
