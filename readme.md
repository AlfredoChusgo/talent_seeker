# Talent Seeker 🌟
Discover and manage talents with efficiency. A comprehensive solution for team and skill management.

### Demo site: https://alfredochusgo.github.io/talent_seeker/

## Table of Contents
- [Features](#features)
- [Domain Model](#domain-model)
- [Installation](#installation)
    - [Development](#development)
    - [Production](#Production)
- [Usage](#usage)
- [Tests](#tests)
- [Tech Stack](#tech-stack)
- [Contribution](#contribution)
- [License](#license)
- [Contact](#contact)

## Features
- Add and manage skills.
- Define and manage roles.
- Create resources with detailed profiles.
- Build teams with multiple resources.

## Installation
### Steps
1. Clone the repository:

`git clone https://github.com/yourusername/TalentSeeker.git`


## Development
### Web api
1. First, ensure you have a MongoDB instance operational. This can be on your local machine or a remote server. Remember to obtain the connection string for MongoDB, as you'll need it in the subsequent steps.
2. create a .env file in the **path:** "Implementation\backend\web_api", with the following env variables.

        MONGODB_URI = mongodb://myuser:mypassword@localhost:27017
        NODE_ENV=development
        PORT = 3000
3. install dependencies

        cd ...\Implementation\backend\web_api
        npm install

4. start the web service  
        
        npm run start:development

### Tests

    To run integration tests you can use the following command inside the \Implementation\backend\web_api directory.

        npm run test

### React application
you can start the react application in:
> **IN MEMORY MODE :**  In this mode all the data will be reset when the user 

> **WEB API MODE :**  In this mode, data is persisted in a MongoDB instance through the web API service.
#### IN MEMORY MODE
1. Create a .env file in the **path:** "Implementation\frontend\react_app", with the following env variables.

        VITE_APP_DEBUG: TRUE
        VITE_APP_MODE: DEVELOPMENT

2. start the application  <br>
        cd ...\Implementation\frontend\react_app
        npm run dev
#### WEB API MODE
1. Create a .env file in the **path:** "Implementation\frontend\react_app", with the following env variables. VITE_APP_BACKEND_WEB_API_URL env variable should be the uri of the web api

        VITE_APP_BACKEND_WEB_API_URL: http://localhost:3000
        VITE_APP_DEBUG: TRUE
        VITE_APP_MODE: PRODUCTION

3. install dependencies

        cd ...\Implementation\frontend\react_app
        npm install

2. start the application  
        
        npm run dev

### Production
you can just use the docker-compose file present in the path : *.../Implementation\docker-compose.yml*

_you can also customize the docker-compose.yml file as you wish_


run the command :

    docker-compose up --build

| Application | URL |
| ----------- | ----------- |
| Web api service | http://localhost:3000 |
| React WebApiMode | http://localhost:5050 |
| React InMemoryMode | http://localhost:8080 |


        


## Tech Stack
- Backend:
  - Node.js with Express
  - MongoDB with Mongoose
  - Supertest for integration testing

- Frontend:
  - React using Vite
  - Material-UI (MUI) for design components
  - React Redux Toolkit for state management
  - Localization with i18next
  - Two modes: In-memory repository & Web API repository

## Contribution
Interested in contributing? Please fork the repository, make your changes, and submit a pull request. We appreciate your insights and improvements!

## License
Talent Seeker is available under the [MIT License](link-to-license).

## Contact
For queries, suggestions, or feedback, feel free to reach out to us at [alfredochusgodev@gmail.com](mailto:alfredochusgodev@gmail.com).

