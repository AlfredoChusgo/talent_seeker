import { SkillLevel } from "../redux/features/resource_list/resource_list_slice";


export function getSkillLevelString(skillLevel: SkillLevel): string {
    switch (skillLevel) {
      case SkillLevel.Novice:
        return "Novice";
      case SkillLevel.Beginner:
        return "Beginner";
      case SkillLevel.Intermediate:
        return "Intermediate";
      case SkillLevel.Proficient:
        return "Proficient";
      case SkillLevel.Advanced:
        return "Advanced";
      case SkillLevel.Expert:
        return "Expert";
      default:
        return "Unknown"; // Handle any unexpected values
    }
  }