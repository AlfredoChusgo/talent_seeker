import { MongoClient } from 'mongodb';
import db from './data_layer/databases/moongose_config';
import * as dotenv from 'dotenv';
import express from 'express';
//import { SkillRepository } from './SkillRepository';
dotenv.config(); // Load environment variables from .env file

import skillsRoutes from './controllers/skill_routes';
import { SkillRepository } from './data_layer/repositories/skill_repository';



const app = express();
const port = process.env.PORT || 3000;
const skillRepo = new SkillRepository();

// Use the skills router for '/skills' routes
app.use('/skills', skillsRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

