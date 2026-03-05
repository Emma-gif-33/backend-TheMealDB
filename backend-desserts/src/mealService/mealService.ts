import axios from 'axios';
import type {
    MealDBSummary,
    MealDBDetail,
    RecipeSummary,
    RecipeDetail,
    Ingredient
} from '../shared/models.js';

const BASE_URL = 'https://www.themealdb.com/api/json/v1/1';

const transformIngredients = (meal: any): Ingredient[] => {
    const ingredients: Ingredient[] = [];
    for (let i = 1; i <= 20; i++) {
        const name = meal[`strIngredient${i}`];
        const measure = meal[`strMeasure${i}`];

        if (name && name.trim() !== "") {
            ingredients.push({
                name: name.trim(),
                measure: measure ? measure.trim() : ""
            });
        }
    }
    return ingredients;
};

// --- SERVICIOS ---

// 1. Extraer info de los postres
export const getAllDesserts = async (): Promise<RecipeSummary[]> => {
    const { data } = await axios.get(`${BASE_URL}/filter.php?c=Dessert`);
    return data.meals.map((m: MealDBSummary) => ({
        id: m.idMeal,
        name: m.strMeal,
        image: m.strMealThumb
    }));
};

// 2. Búsquedas y Filtros
export const searchByName = async (name: string): Promise<RecipeSummary[]> => {
    const { data } = await axios.get(`${BASE_URL}/search.php?s=${name}`);
    return data.meals ? data.meals.map((m: MealDBSummary) => ({
        id: m.idMeal,
        name: m.strMeal,
        image: m.strMealThumb
    })) : [];
};

//filtrado por categoría
export const filterByCategory = async (cat: string): Promise<RecipeSummary[]> => {
    const { data } = await axios.get(`${BASE_URL}/filter.php?c=${cat}`);
    return data.meals.map((m: MealDBSummary) => ({
        id: m.idMeal,
        name: m.strMeal,
        image: m.strMealThumb
    }));
};

// 3. Detalle y Random
export const getRecipeById = async (id: string): Promise<RecipeDetail | null> => {
    const { data } = await axios.get(`${BASE_URL}/lookup.php?i=${id}`);
    if (!data.meals) return null;

    const m: MealDBDetail = data.meals[0];
    return {
        id: m.idMeal,
        name: m.strMeal,
        image: m.strMealThumb,
        instructions: m.strInstructions,
        region: m.strArea,
        category: m.strCategory,
        ingredients: transformIngredients(m)
    };
};

//muestra de la receta random
export const fetchRandom = async (): Promise<RecipeDetail> => {
    const { data } = await axios.get(`${BASE_URL}/random.php`);
    const m: MealDBDetail = data.meals[0];
    return {
        id: m.idMeal,
        name: m.strMeal,
        image: m.strMealThumb,
        instructions: m.strInstructions,
        region: m.strArea,
        category: m.strCategory,
        ingredients: transformIngredients(m)
    };
};