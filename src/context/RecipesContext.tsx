import { Recipe } from "../constants/Types";
import { createCtx } from "../helpers/createCtx";

type State = Recipe[];
const initialState: State = [];

export type RecipesActions =
  | {
      type: "FETCH";
      payload: Recipe[];
    }
  | {
      type: "ADD";
      payload: Recipe;
    };

export const reducer = (
  recipeState: Recipe[],
  action: RecipesActions
): State => {
  switch (action.type) {
    case "FETCH":
      return action.payload;
    default:
      return recipeState;
  }
};

const [ctx, provider] = createCtx(reducer, initialState);
export const RecipesContext = ctx;
export const RecipesProvider = provider;
