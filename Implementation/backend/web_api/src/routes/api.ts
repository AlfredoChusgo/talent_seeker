import { Router } from "express";
import {SkillController} from '../controllers/skill_controller';
import { RoleController } from "../controllers/role_controller";
import { ResourceController } from "../controllers/resource_controller";
import { TeamController } from "../controllers/team_controller";


export const router : Router = Router();

router.get("/skills",SkillController.getAll);
router.post("/skills",SkillController.create);
router.get("/skills/:id",SkillController.findById);
router.put("/skills/:id",SkillController.update);
router.delete("/skills/:id",SkillController.delete);

router.get("/roles",RoleController.getAll);
router.post("/roles",RoleController.create);
router.get("/roles/:id",RoleController.findById);
router.put("/roles/:id",RoleController.update);
router.delete("/roles/:id",RoleController.delete);

router.get("/resources",ResourceController.getAll);
router.post("/resources",ResourceController.create);
router.get("/resources/:id",ResourceController.findById);
router.put("/resources/:id",ResourceController.update);
router.delete("/resources/:id",ResourceController.delete);

router.get("/teams",TeamController.getAll);
router.post("/teams",TeamController.create);
router.get("/teams/:id",TeamController.findById);
router.put("/teams/:id",TeamController.update);
router.delete("/teams/:id",TeamController.delete);

