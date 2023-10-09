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

    // await testData.roles.forEach(async element => {
    //   const createModel = await RoleModel.create({name:element.name});
    //   roleIds.push(createModel._id.toString());
    // });

    // await testData.skills.forEach(async element => {
    //   const createModel = await SkillModel.create(element);
    //   skillIds.push(createModel._id.toString());
    // });
  });

  // it("should empty the database", async ()=>{
  //   // await SkillModel.deleteMany({});
  //   // await RoleModel.deleteMany({});
  //   // await ResourceModel.deleteMany({});
  //   // await TeamModel.deleteMany({});
  // })

});
