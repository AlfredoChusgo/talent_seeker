import { MongoClient } from 'mongodb';
import { connectDB } from './data_layer/databases/moongose_config';
import * as dotenv from 'dotenv';
import express from 'express';
import { Express } from 'express';

//import { SkillRepository } from './SkillRepository';
dotenv.config(); // Load environment variables from .env file

//import skillsRoutes from './controllers/skill_routes';
//import { SkillRepository } from './data_layer/repositories/skill_repository';
import { router } from './routes/api';
//import router from './controllers/skill_routes';

const server = express();

export function createServer(): Express {
  const server: Express = express();
  //const skillRepo: SkillRepository = new SkillRepository();

  server.use(express.json());
  // Use the skills router for '/skills' routes
  server.use('/api', router); // Replace '/api' with your desired API base path
  
  return server;
}


export async function startServer(server: Express, port: number, mongodbUri:string ): Promise<void> {
  //const mongodbUri: string = "mongodb://localhost:27017";
  await connectDB(mongodbUri);

  return new Promise<void>((resolve, reject) => {
    const httpServer = server.listen(port, () => {
      console.log(`Server is running on port ${port}`);
      resolve();
    });

    httpServer.on('error', (error) => {
      console.error('Server startup error:', error);
      reject(error);
    });
  });
}


// export async function startServer() : Promise<Express> {
  
//   const port = process.env.PORT || 3000;
//   const skillRepo = new SkillRepository();
//   const mongodbUri = "mongodb://localhost:27017";
//   await connectDB(mongodbUri);
//   server.use('/api', router);

//   return server;
// }

export default {server};

