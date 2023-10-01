// repository.ts
import { Model, Document } from 'mongoose';
import  {Skill} from '../models';
import { SkillModel } from '../schemas';
export class SkillRepository {  

  constructor() {
    
  }

  async create(skill: Partial<Skill>): Promise<Skill> {
    const createdSkill = await SkillModel.create(skill);
    return createdSkill;
  }

  async findById(skillId: string): Promise<Skill | null> {
    const skill = await SkillModel.findById(skillId).lean();
    return skill as Skill | null;
  }

  async findAll(): Promise<Skill[]> {
    const skills = await SkillModel.find().lean();
    return skills as Skill[];
  }

  async update(skillId: string, updatedSkill: Skill): Promise<Skill | null> {
    const skill = await SkillModel.findByIdAndUpdate(skillId, updatedSkill, { new: true }).lean();
    return skill as Skill | null;
  }

  async delete(skillId: string): Promise<void> {
    await SkillModel.findByIdAndDelete(skillId);
  }
}
