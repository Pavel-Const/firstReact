import { combineReducers } from "redux";
import { reduceOrder } from "./reduceOrder";
import { reduceIngredients } from "./reduceIndredients";
import { reduceAuthorization } from "./reduceAuthorization";

export const rootReducer = combineReducers({
    reduceOrder,
    reduceIngredients,
    reduceAuthorization,
});
