import { Router } from "express";
import {SkillController} from '../controllers/skill_controller';


const router : Router = Router();

router.get("/skills",SkillController.getAll);
router.post("/skills",SkillController.create);
router.get("/skills/:id",SkillController.findById);
router.put("/skills/:id",SkillController.update);
router.put("/skills/:id",SkillController.delete);