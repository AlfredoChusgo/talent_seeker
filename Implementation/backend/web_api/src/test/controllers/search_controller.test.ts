import { createServer } from '../../app';
import { connectDB } from '../../data_layer/databases/moongose_config';
import request from 'supertest';
import { RequestControllerHelper } from '../test_helpers/request_controller_helper';
import { ObjectCreatorHelper } from '../test_helpers/object_creator_helper';
import exp from 'constants';
import { DatabaseHelper } from '../test_helpers/database_helper';

describe('TeamController', () => {
    let app = createServer();
    beforeAll(async () => {
        await connectDB("mongodb://localhost:27017");
        await DatabaseHelper.EmptyDatabase();
    });
    afterEach(() => {
        jest.restoreAllMocks();
    });

    describe('getSearchItems', () => {
        it('should fetch all SearchItems [roles,resources,skills]', async () => {
            const count = 5;
            const resourcesByTeamCount = 2;
            const teams = await ObjectCreatorHelper.Team.Create(app, count,resourcesByTeamCount);
            const response = await request(app).get("/api/getSearchItems").send();

            expect(response).not.toBeNull();
            expect(response.status).toBe(200);
            expect(response.body.success).toBeTruthy();
            expect(response.body.data).not.toBeNull();
            expect(response.body.data.length).toBeGreaterThan(count*resourcesByTeamCount*resourcesByTeamCount);
        });
    });

    describe('getTeamsSearchItems', () => {
        it('should fetch all teams ', async () => {
            const count = 5;
            const resourcesByTeamCount = 2;
            const teams = await ObjectCreatorHelper.Team.Create(app, count,resourcesByTeamCount);
            const response = await request(app).get("/api/getTeamsSearchItems").send();

            expect(response).not.toBeNull();
            expect(response.status).toBe(200);
            expect(response.body.success).toBeTruthy();
            expect(response.body.data).not.toBeNull();
            expect(response.body.data.length).toBeGreaterThan(count);
        });
    });
});
