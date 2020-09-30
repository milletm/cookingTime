interface Ingredient {
  label: string;
  quantity: string;
}
interface Instruction {
  step: number;
  title: string;
  instruction: string;
}
export interface Recipe {
  id: string;
  title: string;
  imgUrl: string;
  time: string;
  ingredients: Ingredient[];
  instructions: Instruction[];
}
