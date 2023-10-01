// src/skills.router.ts
import { Router, Request, Response } from 'express';
import { SkillRepository } from '../data_layer/repositories/skill_repository';

const router = Router();
const skillRepo = new SkillRepository();

//router.use(bodyParser.json());

// Create a new skill
router.post('/', async (req: Request, res: Response) => {
  try {
    const skill = await skillRepo.create(req.body);
    res.status(201).json(skill);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Get all skills
router.get('/', async (req: Request, res: Response) => {
  try {
    const skills = await skillRepo.findAll();
    res.json(skills);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Get a skill by ID
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const skill = await skillRepo.findById(req.params.id);
    if (!skill) {
      res.status(404).json({ error: 'Skill not found' });
    } else {
      res.json(skill);
    }
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Update a skill by ID
router.put('/:id', async (req: Request, res: Response) => {
  try {
    const skill = await skillRepo.update(req.params.id, req.body);
    if (!skill) {
      res.status(404).json({ error: 'Skill not found' });
    } else {
      res.json(skill);
    }
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Delete a skill by ID
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    await skillRepo.delete(req.params.id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

export default router;
