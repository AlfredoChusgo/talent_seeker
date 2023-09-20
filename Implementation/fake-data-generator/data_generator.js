// generateFakeData.js

const { faker } = require('@faker-js/faker');
const generateFakeUser = () => {
    return {
      id: faker.datatype.uuid() ,
      //displayName: faker.internet.userName(),
      displayName: faker.word.noun(),
      groupId: faker.datatype.uuid(),
      groupDisplayName: faker.helpers.arrayElement(['PO',"Developer",'Skill']),
    };
  };
  
  const generateFakeUsers = (count) => {
    const users = [];
    for (let i = 0; i < count; i++) {
      users.push(generateFakeUser());
    }
    return users;
  };
  
  const saveToJSONFile = async (users, filename) => {
    const fs = require('fs/promises');
    const jsonData = JSON.stringify(users, null, 2);
    await fs.writeFile(filename, jsonData);
  };
  
  const main = async () => {
    const count = 100; // Generate 100 fake users
    const users = generateFakeUsers(count);
    await saveToJSONFile(users, 'output/search_home_data.json');
    console.log('Fake users generated and saved to fake-users.json');
  };
  
  main();
