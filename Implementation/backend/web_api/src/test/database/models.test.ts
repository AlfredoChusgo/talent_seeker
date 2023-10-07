//import { SkillRepository } from "../../data_layer/repositories/skill_repository";
import mongoose from 'mongoose';
import { ResourceModel, RoleModel, SkillModel, TeamModel } from "../../data_layer/schemas";
import { Resource } from "../../data_layer/models";
import { ResourceCreateCommand, RoleCreateCommand } from "../../data_layer/resources/resource_command";
import { testData } from "../test_data";
import { create } from "domain";
import { resolveSoa } from "dns";

describe('Mongoose model test', () => {
  let roleIds: string[] = [];
  let skillIds: string[] = [];
  beforeAll(async () => {

    //const mongodbUri = "mongodb://localhost:27017";
    const mongodbUri = process.env.MONGODB_URI || "";


    mongoose.connect(mongodbUri);

    const db = mongoose.connection;
    // You can set up any necessary configurations or mocks here
    //skillRepo = new SkillRepository();
    await SkillModel.deleteMany({});
    await RoleModel.deleteMany({});
    await ResourceModel.deleteMany({});
    await TeamModel.deleteMany({});

    await testData.roles.forEach(async element => {
      const createModel = await RoleModel.create({name:element.name});
      roleIds.push(createModel._id.toString());
    });

    await testData.skills.forEach(async element => {
      const createModel = await SkillModel.create(element);
      skillIds.push(createModel._id.toString());
    });
  });

  describe('role model test', () => {
    let roleId: string;

    it('should a create a role', async () => {
      const command: RoleCreateCommand = {
        name: testData.roles[0].name
      };

      try {
        const createModel = await RoleModel.create(command);
        roleId = createModel._id.toString();
        expect(createModel.name).toBe(command.name);
      } catch (error) {
        console.log(error);
      }

    });

    it('should a edit a role', async () => {
      const command: RoleCreateCommand = {
        name: "updatedRole"
      };

      const result = await RoleModel.updateOne({ _id: roleId }, command);
      expect(result.modifiedCount).toBe(1);

      const model = await RoleModel.findById(roleId);
      expect(model?.name).toBe(command.name);
    });

    it('should a delete a role', async () => {

      const result = await RoleModel.findByIdAndDelete(roleId);
      const model = await RoleModel.findById(roleId);
      expect(model).toBeNull();
    });
  });

  describe('resource model test', () => {
    let modelId: string;
    it('should create a new resource without roleId and skillsID', async () => {
      const command: ResourceCreateCommand = {
        ...testData.resources[0], roleId: roleIds[0], skillIds: []
      };

      try {
        const createModel = await ResourceModel.create(command);
      modelId = createModel._id.toString();
      expect(createModel.name).toBe(command.name);
      } catch (error) {
        console.log(error);
      }

      
    });

    it('should update a resource without roleId and skillsID', async () => {

      const newName = "nameUpdated";
      await ResourceModel.findOneAndUpdate({ _id: modelId }, { name: newName });

      const model = await ResourceModel.findById(modelId);
      expect(model).not.toBeNull();
      expect(model?.name).toBe(newName);
    });

    it('should remove a resource ', async () => {

      const result = await RoleModel.findByIdAndDelete(modelId);
      const model = await RoleModel.findById(modelId);
      expect(model).toBeNull();
    });
  });
});



describe('SkillRepository', () => {
  //let skillRepo: SkillRepository;



  // afterAll(() => {
  //   // Clean up any resources or database connections
  // });


  // it('', async () => {

  // });
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
