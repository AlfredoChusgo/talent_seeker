"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TeamModel = exports.ResourceModel = exports.RoleModel = exports.SkillModel = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const models_1 = require("./models");
// Define the Skill schema
const skillSchema = new mongoose_1.Schema({
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
    name: {
        type: String,
        required: true
    }
});
// Define the Resource schema
const resourceSchema = new mongoose_1.Schema({
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
    name: String,
    resources: [resourceSchema], // Reference an array of Resources
});
// Create and export the models based on the schemas
exports.SkillModel = mongoose_1.default.model('Skill', skillSchema);
exports.RoleModel = mongoose_1.default.model('Role', roleSchema);
exports.ResourceModel = mongoose_1.default.model('Resource', resourceSchema);
exports.TeamModel = mongoose_1.default.model('Team', teamSchema);
exports.default = {
    SkillModel: exports.SkillModel,
    RoleModel: exports.RoleModel,
    ResourceModel: exports.ResourceModel,
    TeamModel: exports.TeamModel,
};
//# sourceMappingURL=schemas.js.map