import createDataContext from './createDataContext';
import React, { useReducer, Dispatch } from 'react';
import { Recipe } from '../constants/Types';
import { RecipeActions, RecipesReducer } from '../context/RecipesReducer';

type InitialStateType = {
  recipes: Recipe[];
};

const initialState = {
  recipes: [],
};

//Context
const RecipesContext = React.createContext<{
  state: InitialStateType;
  dispatch: Dispatch<RecipeActions>;
}>({
  state: initialState,
  dispatch: () => null,
});

const mainReducer = ({ recipes }: InitialStateType, action: RecipeActions) => ({
  recipes: RecipesReducer(recipes, action),
});

const RecipesProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(mainReducer, initialState);

  return (
    <RecipesContext.Provider value={{ state, dispatch }}>
      {children}
    </RecipesContext.Provider>
  );
};
export { RecipesProvider, RecipesContext };
