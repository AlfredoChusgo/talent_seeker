import app, { createServer, startServer } from "./app";
import * as dotenv from 'dotenv';

dotenv.config(); // Load environment variables from .env file

const server = createServer();
const port:number = +(process.env.PORT ?? 3000);
// const mongodbUri = process.env.MONGODB_URI || "mongodb://myuser:mypassword@localhost:27017/";
const mongodbUri = process.env.MONGODB_URI || "";

startServer(server, port,mongodbUri)
  .then(() => {
    // Server started successfully
    console.log(`Server is running on port ${port}`);
  })
  .catch((error) => {
    console.error('Failed to start server:', error);
    process.exit(1); // Exit the application with an error code
  });

// app.listen(port, () => {
//     console.log(`Server is running on port ${port}`);
//   });