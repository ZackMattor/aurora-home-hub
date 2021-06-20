import { Router } from 'express';
import { Animations } from '../../animations.js';

export function AnimationsController() {
  const router = Router();

  router.get('/animations', (req, res) => {
    res.json(Animations.serialize());
  });

  return router;
}
