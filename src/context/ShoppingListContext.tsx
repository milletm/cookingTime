import { ShoppingItem } from "../constants/Types";
import { createCtx } from "../helpers/createCtx";
type State = ShoppingItem[];
const initialState: State = [];
type ShoppingListActions =
  | {
      type: "FETCH";
      payload: ShoppingItem[];
    }
  | {
      type: "ADD";
      payload: ShoppingItem;
    }
  | {
      type: "UPDATE";
      payload: {
        index: number;
        shoppingItem: ShoppingItem;
      };
    }
  | {
      type: "DELETE";
      payload: number;
    };

function reducer(state: State, action: ShoppingListActions): State {
  let newState;
  switch (action.type) {
    case "FETCH":
      return action.payload;
    case "ADD":
      return [...state, action.payload];
    case "UPDATE":
      newState = [...state];
      newState[action.payload.index] = action.payload.shoppingItem;
      return newState;
    case "DELETE":
      newState = [...state];
      newState.splice(action.payload, 1);
      return newState;
    default:
      throw new Error();
  }
}
const [ctx, provider] = createCtx(reducer, initialState);
export const ShoppingListContext = ctx;
export const ShoppingListProvider = provider;
