import type { Config } from 'jest';

process.env.MONGODB_URI = "mongodb://localhost:27017";
const config: Config = {
  verbose: true,

  // The root of your source code (where your tests and source files are located)
  roots: ['<rootDir>/src'],

  rootDir: __dirname,
  // File extensions to consider when running tests
  moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx', 'json', 'node'],

  // The test environment (Node.js by default)
  testEnvironment: 'node',
  //setupFiles: ['<rootDir>/src/test/setup.ts'],
  //setupFiles: ['<rootDir>/jest.setup.ts'],
  setupFilesAfterEnv: ['<rootDir>/src/test/setup.ts'],

  // Transform TypeScript files using ts-jest
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },

  testEnvironmentOptions: {
    // Set the timeout value in milliseconds (e.g., 10000 for 10 seconds)
    timeout: 10000,
  },
};

export default config;
