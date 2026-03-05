import { Router } from 'express';
import { getMeals, getMealById, getRandomMeal } from '../mealService/mealController.js';

const router = Router();

router.get('/', getMeals);
router.get('/random', getRandomMeal);
router.get('/:id', getMealById);

export default router;