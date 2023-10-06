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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const moongose_config_1 = require("./data_layer/databases/moongose_config");
const dotenv = __importStar(require("dotenv"));
const express_1 = __importDefault(require("express"));
//import { SkillRepository } from './SkillRepository';
dotenv.config(); // Load environment variables from .env file
const skill_repository_1 = require("./data_layer/repositories/skill_repository");
const skill_routes_1 = __importDefault(require("./controllers/skill_routes"));
const server = (0, express_1.default)();
async function startServer() {
    const port = process.env.PORT || 3000;
    const skillRepo = new skill_repository_1.SkillRepository();
    const mongodbUri = "mongodb://localhost:27017";
    await (0, moongose_config_1.connectDB)(mongodbUri);
    // Use the skills router for '/skills' routes
    //server.use('/skills', skillsRoutes);
    server.use('/api', skill_routes_1.default);
    server.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
}
startServer();
//# sourceMappingURL=main.js.map