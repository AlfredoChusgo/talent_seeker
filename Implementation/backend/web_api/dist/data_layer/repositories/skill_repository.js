"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SkillRepository = void 0;
const schemas_1 = require("../schemas");
class SkillRepository {
    constructor() {
    }
    async create(skill) {
        const createdSkill = await schemas_1.SkillModel.create(skill);
        return createdSkill;
    }
    async findById(skillId) {
        const skill = await schemas_1.SkillModel.findById(skillId).lean();
        return skill;
    }
    async findAll() {
        const skills = await schemas_1.SkillModel.find().lean();
        return skills;
    }
    async update(skillId, updatedSkill) {
        const skill = await schemas_1.SkillModel.findByIdAndUpdate(skillId, updatedSkill, { new: true }).lean();
        return skill;
    }
    async delete(skillId) {
        await schemas_1.SkillModel.findByIdAndDelete(skillId);
    }
}
exports.SkillRepository = SkillRepository;
//# sourceMappingURL=skill_repository.js.map