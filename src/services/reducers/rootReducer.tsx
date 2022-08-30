import {combineReducers} from "redux";
import {reduceOrder} from "./reduceOrder";
import {reduceIngredients} from "./reduceIndredients";
import {reduceAuthorization} from "./reduceAuthorization";
import {reducerWs} from "./reducerWs";

export const rootReducer = combineReducers({
    reduceOrder,
    reduceIngredients,
    reduceAuthorization,
    reducerWs
});
