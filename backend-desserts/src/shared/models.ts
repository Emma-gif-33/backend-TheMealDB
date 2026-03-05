export interface MealDBSummary {
    idMeal: string;
    strMeal: string;
    strMealThumb: string;
}

export interface MealDBDetail extends MealDBSummary {
    strInstructions: string;
    strArea: string;
    strCategory: string;
    [key: string]: string | undefined;
}

export interface RecipeSummary {
    id: string;
    name: string;
    image: string;
}

export interface RecipeDetail extends RecipeSummary {
    instructions: string;
    region: string;
    category: string;
    ingredients: Ingredient[];
}

export interface Ingredient {
    name: string;
    measure: string;
}