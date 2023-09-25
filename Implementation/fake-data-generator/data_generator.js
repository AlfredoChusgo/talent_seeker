// generateFakeData.js

const { faker } = require('@faker-js/faker');
const generateFakeSearchItem = () => {
  return {
    id: faker.datatype.uuid(),
    displayName: faker.word.noun(),
    objectType : faker.helpers.arrayElement(['role', "resource", 'skill'])
  };
};

let skills = [{
  "id": "1",
  "name": "SQL"
},
{
  "id": "2",
  "name": "C#"
},
{
  "id": "3",
  "name": "React"
},
{
  "id": "4",
  "name": "Angular"
},
{
  "id": "5",
  "name": "JavaScript"
},
{
  "id": "6",
  "name": "HTML"
},
{
  "id": "7",
  "name": "CSS"
},
{
  "id": "8",
  "name": "Node.js"
},
{
  "id": "9",
  "name": "Python"
},
{
  "id": "10",
  "name": "Java"
},
{
  "id": "11",
  "name": "ASP.NET"
},
{
  "id": "12",
  "name": "Ruby on Rails"
},
{
  "id": "13",
  "name": "TypeScript"
},
{
  "id": "14",
  "name": "PHP"
},
{
  "id": "15",
  "name": "Vue.js"
},
{
  "id": "16",
  "name": "Django"
},
{
  "id": "17",
  "name": "MySQL"
},
{
  "id": "18",
  "name": "MongoDB"
},
{
  "id": "19",
  "name": "Express.js"
},
{
  "id": "20",
  "name": "Redux"
}];

const generateFakeResourceItems = () => {
  let role = faker.helpers.arrayElement([
    { id: "74635442",name:"Product Owner"},
    { id: "94635441",name:"Developer"},
    { id: "11635445",name:"Quality Assurance"},
  ]);

  let skills = faker.helpers.arrayElements([{
    "id": "1",
    "name": "SQL",
    "skillLevel": faker.helpers.rangeToNumber({min:0,max:5})
  },
  {
    "id": "2",
    "name": "C#",
    "skillLevel": faker.helpers.rangeToNumber({min:0,max:5})
  },
  {
    "id": "3",
    "name": "React",
    "skillLevel": faker.helpers.rangeToNumber({min:0,max:5})
  },
  {
    "id": "4",
    "name": "Angular",
    "skillLevel": faker.helpers.rangeToNumber({min:0,max:5})
  },
  {
    "id": "5",
    "name": "JavaScript",
    "skillLevel": faker.helpers.rangeToNumber({min:0,max:5})
  },
  {
    "id": "6",
    "name": "HTML",
    "skillLevel": faker.helpers.rangeToNumber({min:0,max:5})
  },
  {
    "id": "7",
    "name": "CSS",
    "skillLevel": faker.helpers.rangeToNumber({min:0,max:5})
  },
  {
    "id": "8",
    "name": "Node.js",
    "skillLevel": faker.helpers.rangeToNumber({min:0,max:5})
  },
  {
    "id": "9",
    "name": "Python",
    "skillLevel": faker.helpers.rangeToNumber({min:0,max:5})
  },
  {
    "id": "10",
    "name": "Java",
    "skillLevel": faker.helpers.rangeToNumber({min:0,max:5})
  },
  {
    "id": "11",
    "name": "ASP.NET",
    "skillLevel": faker.helpers.rangeToNumber({min:0,max:5})
  },
  {
    "id": "12",
    "name": "Ruby on Rails",
    "skillLevel": faker.helpers.rangeToNumber({min:0,max:5})
  },
  {
    "id": "13",
    "name": "TypeScript",
    "skillLevel": faker.helpers.rangeToNumber({min:0,max:5})
  },
  {
    "id": "14",
    "name": "PHP",
    "skillLevel": faker.helpers.rangeToNumber({min:0,max:5})
  },
  {
    "id": "15",
    "name": "Vue.js",
    "skillLevel": faker.helpers.rangeToNumber({min:0,max:5})
  },
  {
    "id": "16",
    "name": "Django",
    "skillLevel": faker.helpers.rangeToNumber({min:0,max:5})
  },
  {
    "id": "17",
    "name": "MySQL",
    "skillLevel": faker.helpers.rangeToNumber({min:0,max:5})
  },
  {
    "id": "18",
    "name": "MongoDB",
    "skillLevel": faker.helpers.rangeToNumber({min:0,max:5})
  },
  {
    "id": "19",
    "name": "Express.js",
    "skillLevel": faker.helpers.rangeToNumber({min:0,max:5})
  },
  {
    "id": "20",
    "name": "Redux",
    "skillLevel": faker.helpers.rangeToNumber({min:0,max:5})
  }],{min:3,max:6});

  return {
    id: faker.string.uuid(),
    name : faker.person.firstName(),
    lastName : faker.person.lastName(),
    birthDate : faker.date.between({ from: '1980-01-01T00:00:00.000Z', to: '2005-01-01T00:00:00.000Z' }),
    occupation : faker.person.jobTitle(),
    location : faker.location.country(),
    biography : faker.lorem.paragraphs(5),
    role : role,
    skills : skills,
  };
};


const generateFakeSearchItems = (count) => {
  const users = [];
  for (let i = 0; i < count; i++) {
    users.push(generateFakeSearchItem());
  }
  return users;
};

const generateFakeResources = (count) => {
  const users = [];
  for (let i = 0; i < count; i++) {
    users.push(generateFakeResourceItems());
  }
  return users;
};

const generateSearchTeamItems = (teams) => {
  const items = [];
  
  teams.forEach(e=>{
    items.push({
      id: e.id,
      displayName: e.name,
      objectType: "team"
    })
  });
  return items;
};

const generateSearchItems = (resources) => {
  const result = [
    { id: "74635442", displayName: "Product Owner", objectType: "role" },
    { id: "94635441", displayName: "Developer", objectType: "role" },
    { id: "11635445", displayName: "Quality Assurance", objectType: "role" },
  ];

  skills.forEach(skill=>{
    result.push({
      id: skill.id,
      displayName: `${skill.name}`,
      objectType: 'skill',
    });
  });

  resources.forEach(element => {
    result.push({
      id: element.id,
      displayName: `${element.name} ${element.lastName}`,
      objectType: 'resource',
    });
  });

  return result;
};

const generateFakeTeamItems = (resources) => {
  return {
    id: faker.string.uuid(),
    name: faker.vehicle.model(),
    resources : faker.helpers.arrayElements(resources,{ min: 3, max: 10 })
  };
}

const generateTeams = (count,resources) => {
  const items = [];
  for (let i = 0; i < count; i++) {
    items.push(generateFakeTeamItems(resources));
  }
  return items;
}

const saveToJSONFile = async (users, filename) => {
  const fs = require('fs/promises');
  const jsonData = JSON.stringify(users, null, 2);
  await fs.writeFile(filename, jsonData);
};

const main = async () => {
  const count = 100; // Generate 100 fake users
  //const searchItems = generateFakeSearchItems(count);
  const resources = generateFakeResources(100);
  const searchItems = generateSearchItems(resources);
  const teams = generateTeams(30,resources);
  const searchTeamItems = generateSearchTeamItems(teams);

  await saveToJSONFile(searchItems, 'output/search_home_data.json');
  await saveToJSONFile(resources, 'output/resources_data.json');
  await saveToJSONFile(searchTeamItems, 'output/search_teams_data.json');
  await saveToJSONFile(teams, 'output/teams_data.json');
  console.log('Fake users generated and saved to fake-users.json');
};

main();
