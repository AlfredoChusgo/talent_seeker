import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';

//const mongodbUri = process.env.MONGODB_URI as string || "mongodb://myuser:mypassword@localhost:27017";
//const mongodbUri = process.env.MONGODB_URI as string || "mongodb://localhost:27017";
//const mongodbUri = "mongodb://localhost:27017";
const mongodbUri = process.env.MONGODB_URI as string;

mongoose.connect(mongodbUri);

//global.API_URL = 'https://example.com/api';
// const mongod = await new MongoMemoryServer.create();

// beforeAll(async () => {
//   const uri = await mongod.getUri();
//   process.env.MONGODB_URI = uri;
// });

// afterAll(async () => {
//   await mongod.stop();
// });

