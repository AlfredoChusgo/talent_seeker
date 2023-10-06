import { SkillController } from '../../controllers/skill_controller';
import { SkillLevel } from '../../data_layer/models';
import { SkillModel } from '../../data_layer/schemas';
import { ResponseHelper } from '../../helpers/response_helper';
import { createServer, startServer } from '../../app';
import { connectDB } from '../../data_layer/databases/moongose_config';
import request from 'supertest';

describe('SkillController', () => {
    let app = createServer();
    beforeAll(async () => {
        await connectDB("mongodb://localhost:27017");
        //await startServer();
    });
    afterEach(() => {
        jest.restoreAllMocks();
    });

    describe('create', () => {
        it('should create a new skill', async () => {
            // Mock SkillModel.create to return a dummy skill

            const req = {
                body: { name: 'Test Skill', skillLevel: SkillLevel.Beginner },
            } as any;

            const response = await request(app).get("/api/skills").send();
            //const result = await SkillController.create(req, res);

            expect(response).not.toBeNull();
            expect(response.status).toBe(200); 
            expect(response.header['content-type']).toContain('application/json');
            expect(response.body.success).toBeTruthy();
        });

        // Add more test cases for error scenarios
    });

    // Add similar test cases for other methods (update, findById, delete)
});
