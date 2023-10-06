import { MongoClient } from 'mongodb';
import { connectDB } from './data_layer/databases/moongose_config';
import * as dotenv from 'dotenv';
import express from 'express';
//import { SkillRepository } from './SkillRepository';
dotenv.config(); // Load environment variables from .env file

import skillsRoutes from './controllers/skill_routes';
import { SkillRepository } from './data_layer/repositories/skill_repository';
import router from './controllers/skill_routes';

const server = express();

async function startServer() {
  
  const port = process.env.PORT || 3000;
  const skillRepo = new SkillRepository();
  const mongodbUri = "mongodb://localhost:27017";
  await connectDB(mongodbUri);
  // Use the skills router for '/skills' routes
  //server.use('/skills', skillsRoutes);
  server.use('/api', router);

  server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });

}

startServer();