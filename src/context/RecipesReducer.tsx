import { Recipe } from '../constants/Types';
type ActionMap<M extends { [index: string]: any }> = {
  [Key in keyof M]: M[Key] extends undefined
    ? {
        type: Key;
      }
    : {
        type: Key;
        payload: M[Key];
      };
};

export enum Types {
  Fetch = 'FETCH_RECIPES',
}

type RecipePayload = {
  [Types.Fetch]: Recipe[];
};
export type RecipeActions = ActionMap<RecipePayload>[keyof ActionMap<
  RecipePayload
>];
export const RecipesReducer = (state: Recipe[], action: RecipeActions) => {
  switch (action.type) {
    case 'FETCH_RECIPES':
      return action.payload;
    default:
      return state;
  }
};
