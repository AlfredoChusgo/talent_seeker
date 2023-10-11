import app, { createServer, startServer } from "./app";

const server = createServer();
const port:number = +(process.env.PORT ?? 3000);

startServer(server, port,"mongodb://localhost:27017")
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