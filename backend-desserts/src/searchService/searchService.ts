import axios from 'axios';
import type { MealDBSummary, RecipeSummary } from '../shared/models.js';

const BASE_URL = 'https://www.themealdb.com/api/json/v1/1';

const mapToSummary = (meals: MealDBSummary[]): RecipeSummary[] => {
    return meals ? meals.map(m => ({
        id: m.idMeal,
        name: m.strMeal,
        image: m.strMealThumb
    })) : [];
};

export const byName = async (name: string) => {
    const { data } = await axios.get(`${BASE_URL}/search.php?s=${name}`);
    return mapToSummary(data.meals);
};

export const byFirstLetter = async (letter: string) => {
    const { data } = await axios.get(`${BASE_URL}/search.php?f=${letter}`);
    return mapToSummary(data.meals);
};

export const byIngredient = async (ing: string) => {
    const { data } = await axios.get(`${BASE_URL}/filter.php?i=${ing}`);
    return mapToSummary(data.meals);
};

export const byArea = async (area: string) => {
    const { data } = await axios.get(`${BASE_URL}/filter.php?a=${area}`);
    return mapToSummary(data.meals);
};