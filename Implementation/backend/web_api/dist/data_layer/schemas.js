"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TeamModel = exports.ResourceModel = exports.RoleModel = exports.SkillModel = void 0;
const mongoose_1 = require("mongoose");
const models_1 = require("./models");
const moongose_config_1 = __importDefault(require("./databases/moongose_config"));
// Define the Skill schema
const skillSchema = new mongoose_1.Schema({
    id: String,
    name: {
        type: String,
        required: true
    },
    skillLevel: {
        type: String,
        enum: Object.values(models_1.SkillLevel), // Validate against SkillLevel values
    },
});
// Define the Role schema
const roleSchema = new mongoose_1.Schema({
    id: String,
    name: {
        type: String,
        required: true
    }
});
// Define the Resource schema
const resourceSchema = new mongoose_1.Schema({
    id: String,
    name: String,
    lastName: String,
    birthDate: String,
    occupation: String,
    location: String,
    biography: String,
    role: roleSchema,
    skills: [skillSchema], // Reference an array of Skills
});
// Define the Team schema
const teamSchema = new mongoose_1.Schema({
    id: String,
    name: String,
    resources: [resourceSchema], // Reference an array of Resources
});
// Create and export the models based on the schemas
exports.SkillModel = moongose_config_1.default.model('Skill', skillSchema);
exports.RoleModel = moongose_config_1.default.model('Role', roleSchema);
exports.ResourceModel = moongose_config_1.default.model('Resource', resourceSchema);
exports.TeamModel = moongose_config_1.default.model('Team', teamSchema);
exports.default = {
    SkillModel: exports.SkillModel,
    RoleModel: exports.RoleModel,
    ResourceModel: exports.ResourceModel,
    TeamModel: exports.TeamModel,
};
