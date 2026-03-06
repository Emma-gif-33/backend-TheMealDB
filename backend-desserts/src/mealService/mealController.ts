import type { Request, Response } from 'express';
import * as MealService from '../mealService/mealService.js';


export const getMeals = async (req: Request, res: Response) => {
    const { s, f, i, c } = req.query;

    try { //creo que acá iba mejor un swtich-
        let data;
        if (s) {
            data = await MealService.searchByName(String(s));
        } else if (f) {
            data = await MealService.searchByName(String(f));
        } else if (i) {
            data = await MealService.filterByCategory(String(i));
        } else if (c) {
            data = await MealService.filterByCategory(String(c));
        } else {
            data = await MealService.getAllDesserts(); //por defecto, trae toda la info.
        }
        res.json({
            success: true,
            count: data.length,
            data
        });
    } catch (error) {
        console.error('Error al obteener la lista de las recetas', error);
        res.status(500).json({ success: false, message: 'Error al procesar la lista de recetas' });
    }
};


export const getMealById = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        if (typeof id !== 'string') {
            return res.status(404).json({ message: "ID inválido, intente con uno existente." });
        }
        const data = await MealService.getRecipeById(id);
        res.json({ success: true, data });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error al obtener el detalle de la receta' });
    }
};


export const getRandomMeal = async (_req: Request, res: Response) => {
    try {
        const data = await MealService.fetchRandom();
        res.json({ success: true, data });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error al obtener receta aleatoria' });
    }
};