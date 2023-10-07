import { Router } from "express";
import {SkillController} from '../controllers/skill_controller';
import { RoleController } from "../controllers/role_controller";


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

