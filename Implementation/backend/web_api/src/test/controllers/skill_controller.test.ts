import { SkillController } from '../../controllers/skill_controller';
import { SkillLevel } from '../../data_layer/models';
import { SkillModel } from '../../data_layer/schemas';
import { ResponseHelper } from '../../helpers/response_helper';

describe('SkillController', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('create', () => {
    it('should create a new skill', async () => {
      // Mock SkillModel.create to return a dummy skill

      const req = {
        body: { name: 'Test Skill', skillLevel: 'Intermediate' },
      } as any;
      const res = {
        json: jest.fn(),
      } as any;

      const result = await SkillController.create(req, res);

      expect(result).not.toBeNull();
      expect(res.json).toHaveBeenCalledWith(
        ResponseHelper.createResponseSuccess('Skill created successfully', expect.any(Object))
      );
    });

    // Add more test cases for error scenarios
  });

  // Add similar test cases for other methods (update, findById, delete)
});
