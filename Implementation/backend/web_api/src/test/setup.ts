import mongoose from 'mongoose';
import { connectDB } from '../data_layer/databases/moongose_config';

//const mongodbUri = process.env.MONGODB_URI as string || "mongodb://myuser:mypassword@localhost:27017";
//const mongodbUri = process.env.MONGODB_URI as string || "mongodb://localhost:27017";
//const mongodbUri = "mongodb://localhost:27017";
process.env.MONGODB_URI = "mongodb://myuser:mypassword@localhost:27017";
const mongodbUri = process.env.MONGODB_URI as string;

// mongoose.connect(mongodbUri);
// await connectDB("mongodb://myuser:mypassword@localhost:27017");

//global.API_URL = 'https://example.com/api';
// const mongod = await new MongoMemoryServer.create();

// beforeAll(async () => {
//   const uri = await mongod.getUri();
//   process.env.MONGODB_URI = uri;
// });

// afterAll(async () => {
//   await mongod.stop();
// });

