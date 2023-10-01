import  mongoose, {  Schema, Document } from 'mongoose';
import { Resource, Role, Skill, SkillLevel, Team } from './models';


// Define the Skill schema
const skillSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  skillLevel: {
    type: String, // You can store SkillLevel as a string in the database
    enum: Object.values(SkillLevel), // Validate against SkillLevel values
  },
});

// Define the Role schema
const roleSchema = new Schema({
  name: {
    type: String,
    required: true
  }
});

// Define the Resource schema
const resourceSchema = new Schema({
  name: String,
  lastName: String,
  birthDate: String,
  occupation: String,
  location: String,
  biography: String,
  role: roleSchema, // Reference the Role schema
  skills: [skillSchema], // Reference an array of Skills
});

// Define the Team schema
const teamSchema = new Schema({
  name: String,
  resources: [resourceSchema], // Reference an array of Resources
});



// Create and export the models based on the schemas
export const SkillModel = mongoose.model<Skill>('Skill', skillSchema);
export const RoleModel = mongoose.model<Role>('Role', roleSchema);
export const ResourceModel = mongoose.model<Resource>('Resource', resourceSchema);
export const TeamModel = mongoose.model<Team>('Team', teamSchema);


export default {
  SkillModel,
  RoleModel,
  ResourceModel,
  TeamModel,
};
