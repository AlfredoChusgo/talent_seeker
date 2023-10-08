import mongoose, { Schema, Document, Types } from 'mongoose';
import { Resource, Role, Skill, SkillLevel, Team } from './models';

export interface RoleDocument extends Document {
  name: string;
}

export interface SkillDocument extends Document {
  name: string;
  skillLevel: SkillLevel;
}



// Define the Skill schema
const skillSchema = new Schema<SkillDocument>({
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
const roleSchema = new Schema<RoleDocument>({
  name: {
    type: String,
    required: true
  }
});

export interface ResourceDocument extends Document {
  name: string;
  lastName: string;
  birthDate: string;
  occupation: string;
  locality: string;
  biography: string;
  role: Types.ObjectId;
  skills: Types.ObjectId[];
}

// Define the Resource schema
const resourceSchema = new Schema<ResourceDocument>({
  name: String,
  lastName: String,
  birthDate: String,
  occupation: String,
  locality: String,
  biography: String,
  role: { type: Schema.Types.ObjectId, ref: 'RoleDocument', default: null }, // Reference the Role schema
  skills: [{ type: Schema.Types.ObjectId, ref: 'SkillDocument' }], // Reference an array of Skills
});

// Define the Team schema
const teamSchema = new Schema({
  name: String,
  resources: [resourceSchema], // Reference an array of Resources
});



// Create and export the models based on the schemas
export const SkillModel = mongoose.model<SkillDocument>('Skill', skillSchema);
export const RoleModel = mongoose.model<RoleDocument>('Role', roleSchema);
export const ResourceModel = mongoose.model<ResourceDocument>('Resource', resourceSchema);
export const TeamModel = mongoose.model<Team>('Team', teamSchema);


export default {
  SkillModel,
  RoleModel,
  ResourceModel,
  TeamModel,
};
