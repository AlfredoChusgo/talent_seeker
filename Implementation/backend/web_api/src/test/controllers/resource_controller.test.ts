import { createServer } from '../../app';
import { connectDB } from '../../data_layer/databases/moongose_config';
import request from 'supertest';
import { RequestControllerHelper } from '../test_helpers/request_controller_helper';
import { ObjectCreatorHelper } from '../test_helpers/object_creator_helper';

describe('ResourceController', () => {
    let app = createServer();
    beforeAll(async () => {
        await connectDB("mongodb://localhost:27017");
    });
    afterEach(() => {
        jest.restoreAllMocks();
    });

    describe('getAll', () => {
        it('should fetch all the resources', async () => {
            const count = 20;
            const resources = await ObjectCreatorHelper.Resource.Create(app, count);
            const response = await request(app).get("/api/skills").send();

            expect(response).not.toBeNull();
            expect(response.status).toBe(200);
            expect(response.body.success).toBeTruthy();
            expect(response.body.data).not.toBeNull();
            expect(response.body.data.length).toBeGreaterThan(resources.length);
        });
    });

    describe('create', () => {
        it('should create a new resource without role and skills', async () => {
            const req = RequestControllerHelper.getResourceCreateRequestBody("", []);

            const response = await request(app).post("/api/resources").send(req);

            expect(response).not.toBeNull();
            expect(response.status).toBe(200);
            expect(response.body.success).toBeTruthy();
            expect(response.body.data).not.toBeNull();
            expect(response.body.data.name).toBe(req.name);
        });

        it('should create a new resource with role and without skills', async () => {
            const role: any = await ObjectCreatorHelper.Role.Create(app);
            const req = RequestControllerHelper.getResourceCreateRequestBody(role._id, []);

            const response = await request(app).post("/api/resources").send(req);

            expect(response).not.toBeNull();
            expect(response.status).toBe(200);
            expect(response.body.success).toBeTruthy();
            expect(response.body.data).not.toBeNull();
            expect(response.body.data.name).toBe(req.name);
        });

        it('should create a new resource with role and  skills', async () => {
            const role: any = await ObjectCreatorHelper.Role.Create(app);
            const skills: any = await ObjectCreatorHelper.Skill.Create(app, 5);
            const skillIds = skills.map((skill: any) => skill._id);

            const req = RequestControllerHelper.getResourceCreateRequestBody(role._id, [...skillIds]);

            const response = await request(app).post("/api/resources").send(req);

            expect(response).not.toBeNull();
            expect(response.status).toBe(200);
            expect(response.body.success).toBeTruthy();
            expect(response.body.data).not.toBeNull();

            expect(response.body.data.name).toBe(req.name);
            expect(response.body.data.lastName).toBe(req.lastName);
            expect(response.body.data.birthDate).toBe(req.birthDate);
            expect(response.body.data.occupation).toBe(req.occupation);
            expect(response.body.data.locality).toBe(req.locality);
            expect(response.body.data.biography).toBe(req.biography);
            expect(response.body.data.role).toBe(req.role.toString());
            expect(response.body.data.skills).toEqual(req.skills.map(e => e.toString()));
        });

        it('should fail if request is empty', async () => {

            const req = {};

            const response = await request(app).post("/api/resources").send(req);

            expect(response).not.toBeNull();
            expect(response.status).toBe(200);
            expect(response.body.success).toBeFalsy();
            expect(response.body.errors).not.toBeNull();
        });

        it('should fail if request body name is empty', async () => {

            const req = (await ObjectCreatorHelper.Resource.Create(app, 1))[0];
            req.name = "";

            const response = await request(app).post("/api/resources").send(req);

            expect(response).not.toBeNull();
            expect(response.status).toBe(200);
            expect(response.body.success).toBeFalsy();
            expect(response.body.errors).not.toBeNull();
            expect(response.body.errors.length).toBeGreaterThan(0);
        });

        it('should fail if resource have a wrong value', async () => {

            const req = (await ObjectCreatorHelper.Resource.Create(app, 1))[0] as any;
            req.name = "a";
            req.lastName = "a";
            req.birthDate = "";
            req.occupation = "";
            req.locality = "";
            req.biography = "";

            const response = await request(app).post("/api/resources").send(req);

            expect(response).not.toBeNull();
            expect(response.status).toBe(200);
            expect(response.body.success).toBeFalsy();
            expect(response.body.errors).not.toBeNull();
            expect(response.body.errors.length).toBeGreaterThan(0);
        });
    });

    describe('update', () => {
        it('it should update a skill', async () => {
            const resources = await ObjectCreatorHelper.Resource.Create(app, 2);
            //const responseModel = await request(app).post("/api/resources").send(req);
            //const modelId = responseModel.body.data._id;
            const resource = resources[0];
            const updatedResource = resources[1];
            const newRole = updatedResource.role.toString();
            const newSkills = updatedResource.skills.map((e:any) => e.toString());
            const reqUpdated = { ...updatedResource, role: newRole, skills: newSkills };

            const response = await request(app).put(`/api/resources/${resource._id}`).send(reqUpdated);

            expect(response).not.toBeNull();
            expect(response.status).toBe(200);
            expect(response.body.success).toBeTruthy();
            expect(response.body.data._id).toBe(resource._id);
            expect(response.body.data.name).toBe(reqUpdated.name);
            expect(response.body.data.lastName).toBe(reqUpdated.lastName);
            expect(response.body.data.birthDate).toBe(reqUpdated.birthDate);
            expect(response.body.data.occupation).toBe(reqUpdated.occupation);
            expect(response.body.data.locality).toBe(reqUpdated.locality);
            expect(response.body.data.biography).toBe(reqUpdated.biography);
            expect(response.body.data.role).toBe(reqUpdated.role.toString());
            expect(response.body.data.skills).toEqual(reqUpdated.skills.map((e:any) => e.toString()));
        });

        it('it should fail updating a resource with a empty Id', async () => {
            //const req = RequestControllerHelper.getResourceCreateRequestBody();
            //const responseModel = await request(app).post("/api/skills").send(req);
            const modelId = "";
            const reqUpdated = {};
            const response = await request(app).put(`/api/resources/${modelId}`).send(reqUpdated);

            expect(response).not.toBeNull();
            expect(response.status).toBe(404);
        });
    });

    describe('find By Id', () => {
        it('it should find a resource by id ', async () => {
            const resource = (await ObjectCreatorHelper.Resource.Create(app,1))[0];
            
            const modelId = resource._id;
            const response = await request(app).get(`/api/resources/${modelId}`).send();

            expect(response).not.toBeNull();
            expect(response.status).toBe(200);
            expect(response.body.success).toBeTruthy();
            expect(response.body.data._id).toBe(modelId);
            expect(response.body.data._id).toBe(resource._id);
            expect(response.body.data.name).toBe(resource.name);
            expect(response.body.data.lastName).toBe(resource.lastName);
            expect(response.body.data.birthDate).toBe(resource.birthDate);
            expect(response.body.data.occupation).toBe(resource.occupation);
            expect(response.body.data.locality).toBe(resource.locality);
            expect(response.body.data.biography).toBe(resource.biography);
            expect(response.body.data.role).toBe(resource.role.toString());
            expect(response.body.data.skills).toEqual(resource.skills.map((e:any) => e.toString()));
        });

        it('it should return a error response when the id does not exist ', async () => {

            const modelId = `${new Date().getUTCMilliseconds()}`;
            const response = await request(app).get(`/api/resources/${modelId}`).send();

            expect(response).not.toBeNull();
            expect(response.status).toBe(200);
            expect(response.body.success).toBeFalsy();
            expect(response.body.errors).not.toBeNull();
            expect(response.body.errors.length).toBeGreaterThan(0);
        });
    });

    describe('Delete', () => {
        it('it should delete a resource just created ', async () => {
            const resource = (await ObjectCreatorHelper.Resource.Create(app,1))[0];

            const modelId = resource._id;
            const response = await request(app).delete(`/api/resources/${modelId}`).send();

            expect(response).not.toBeNull();
            expect(response.status).toBe(200);
            expect(response.body.success).toBeTruthy();
            expect(response.body.data._id).toBe(modelId);
            expect(response.body.data.name).toBe(resource.name);
            expect(response.body.data.lastName).toBe(resource.lastName);
            expect(response.body.data.birthDate).toBe(resource.birthDate);
            expect(response.body.data.occupation).toBe(resource.occupation);
            expect(response.body.data.locality).toBe(resource.locality);
            expect(response.body.data.biography).toBe(resource.biography);
            expect(response.body.data.role).toBe(resource.role.toString());
            expect(response.body.data.skills).toEqual(resource.skills.map((e:any) => e.toString()));
        });

        it('it should return a error response when the id does not exist ', async () => {

            const modelId = `${new Date().getUTCMilliseconds()}`;
            const response = await request(app).delete(`/api/resources/${modelId}`).send();

            expect(response).not.toBeNull();
            expect(response.status).toBe(200);
            expect(response.body.success).toBeFalsy();
            expect(response.body.errors).not.toBeNull();            
        });
    });

    // Add similar test cases for other methods (update, findById, delete)
});
