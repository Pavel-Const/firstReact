import { combineReducers } from "redux";
import { getIngredients } from "./reducers";

export const rootReducer = combineReducers({
    getIngredients,
});
