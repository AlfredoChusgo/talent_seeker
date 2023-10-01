
import mongoose from 'mongoose';

//const mongodbUri = process.env.MONGODB_URI as string || "mongodb://myuser:mypassword@localhost:27017";
//const mongodbUri = process.env.MONGODB_URI as string || "mongodb://localhost:27017";
const mongodbUri = "mongodb://localhost:27017";

mongoose.connect(mongodbUri);

const db = mongoose.connection;

try{
  db.on('error', (err) => {
    console.error('MongoDB connection error:', err);
  });
  
  db.once('open', () => {
    console.log('Connected to MongoDB');
  });
}
catch (e){
  console.log(e);
}

// Now, you can use `db` to interact with your MongoDB database
export default db;