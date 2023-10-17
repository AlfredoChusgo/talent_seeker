import mongoose, { Schema, Document, Types } from 'mongoose';
import { Resource, Role, Skill, SkillLevel, Team } from './models';

export interface TeamDocument extends Document {
  name: string;
  resources: Types.ObjectId[];
}

export interface RoleDocument extends Document {
  name: string;
}
export interface SkillDocument extends Document {
  name: string;
}

export interface ResourceSkillDocument{
  skill: Types.ObjectId;
  skillLevel: SkillLevel;
}



// Define the Skill schema
const skillSchema = new Schema<SkillDocument>({
  name: {
    type: String,
    required: true
  },
  // skillLevel: {
  //   type: String, // You can store SkillLevel as a string in the database
  //   enum: Object.values(SkillLevel), // Validate against SkillLevel values
  // },
});

const resourceSkillSchema = new Schema<ResourceSkillDocument>({
  skill: { type: Schema.Types.ObjectId, ref: 'Skill', required : true },
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
  // skills: Types.ObjectId[];
  skills : ResourceSkillDocument[];
}

// Define the Resource schema
const resourceSchema = new Schema<ResourceDocument>({
  name: String,
  lastName: String,
  birthDate: String,
  occupation: String,
  locality: String,
  biography: String,
  role: { type: Schema.Types.ObjectId, ref: 'Role', default: null }, // Reference the Role schema
  // skills: [{ type: Schema.Types.ObjectId, ref: 'Skill' }], // Reference an array of Skills
  // skills: [resourceSkillSchema], // Reference an array of Skills
   skills: [{
    skill: { type: Schema.Types.ObjectId, ref: 'Skill', required : true },
    skillLevel: {
      type: String, // You can store SkillLevel as a string in the database
      enum: Object.values(SkillLevel), // Validate against SkillLevel values
    },
  }], // Reference an array of Skills
});

// Define the Team schema
const teamSchema = new Schema<TeamDocument>({
  name: String,
  resources: [{ type: Schema.Types.ObjectId, ref: 'Resource' ,default:[]}]// Reference an array of Resources
});

// Create and export the models based on the schemas
export const SkillModel = mongoose.model<SkillDocument>('Skill', skillSchema);
export const RoleModel = mongoose.model<RoleDocument>('Role', roleSchema);
export const ResourceModel = mongoose.model<ResourceDocument>('Resource', resourceSchema);
export const TeamModel = mongoose.model<TeamDocument>('Team', teamSchema);


export default {
  SkillModel,
  RoleModel,
  ResourceModel,
  TeamModel,
};
