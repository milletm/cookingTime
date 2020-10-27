export interface Ingredient {
  label: string;
  quantity: string;
  toShop?: boolean;
}
export interface Instruction {
  step: number;
  title: string;
  instruction: string;
  timer?: number;
}
export interface Recipe {
  id: string;
  title: string;
  imgUrl: string;
  time: string;
  ingredients: Ingredient[];
  instructions: Instruction[];
}

export interface ShoppingItem {
  recipeId: string;
  recipeTitle: string;
  ingredients: Ingredient[];
}
