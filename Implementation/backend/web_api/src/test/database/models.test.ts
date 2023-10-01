import { SkillRepository } from "../../data_layer/repositories/skill_repository";
import mongoose from 'mongoose';
import { ResourceModel } from "../../data_layer/schemas";


describe('SkillRepository', () => {
  let skillRepo: SkillRepository;

  beforeAll(() => {

    //const mongodbUri = "mongodb://localhost:27017";
    const mongodbUri = process.env.MONGODB_URI || "";
    

    mongoose.connect(mongodbUri);

    const db = mongoose.connection;
    // You can set up any necessary configurations or mocks here
    skillRepo = new SkillRepository();
  });

  // afterAll(() => {
  //   // Clean up any resources or database connections
  // });
  it('should create a new resource', async () => {
    const resourceData = {
      name: 'John Doe',
      // Add other required fields here
    };

    const createdResource = await ResourceModel.create(resourceData);

    expect(createdResource.name).toBe(resourceData.name);
    // Add more assertions for other fields if needed
  });
  // describe('create', () => {
  //   it('should create a new skill', async () => {
  //     const newSkill: Partial<Skill> = {
  //       name: 'Programming',
  //       skillLevel: SkillLevel.Intermediate,
  //     };

  //     const createdSkill = await skillRepo.create(newSkill);

  //     // Perform assertions to check if the skill was created successfully
  //     expect(createdSkill).toEqual(newSkill);
  //   });
  // });

  // describe('findById', () => {
  //   it('should find a skill by ID', async () => {
  //     // Assume you have a predefined skill with ID '1' in your test database
  //     const skillId = '1';

  //     const foundSkill = await skillRepo.findById(skillId);

  //     // Perform assertions to check if the skill was found
  //     expect(foundSkill).toBeDefined();
  //     //expect(foundSkill?._id).toBe(skillId);
  //   });

  //   it('should return null for a non-existent skill ID', async () => {
  //     const nonExistentSkillId = '999'; // An ID that doesn't exist in your test database

  //     const foundSkill = await skillRepo.findById(nonExistentSkillId);

  //     // Perform assertions to check if null is returned for a non-existent skill
  //     expect(foundSkill).toBeNull();
  //   });
  // });

  // Add similar test cases for other methods (findAll, update, delete) as needed
});
