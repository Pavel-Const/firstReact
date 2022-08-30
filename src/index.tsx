import React from "react";
import ReactDOM from "react-dom/client";
import {applyMiddleware, compose, createStore} from "redux";
import thunk, {ThunkAction, ThunkDispatch} from "redux-thunk";
import {
    Provider, TypedUseSelectorHook,
    useDispatch as dispatchHook,
    useSelector as selectorHook,
} from "react-redux";
import {BrowserRouter as Router} from "react-router-dom";
import "./index.css";
import "./reset.css";
import App from "./components/app/App";
import reportWebVitals from "./reportWebVitals";
import {rootReducer} from "./services/reducers/rootReducer";
import {socketMiddleware} from "./services/middleware/socketMiddleware";
import {
    TActionsWs, WS_CONNECTION_CLOSE, WS_CONNECTION_ERROR, WS_CONNECTION_START, WS_CONNECTION_SUCCESS, WS_GET_MESSAGE
} from "./services/actions/actionsWs";
import {TActionsOrder} from "./services/actions/actionsOrder";
import {TActionsIngredients} from "./services/actions/actionsIngredients";
import {TActionsAuthorization} from "./services/actions/actionsAuthorization";

export const useDispatch = () => dispatchHook<AppDispatch>()
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook
export type TActions =
    | TActionsWs
    | TActionsOrder
    | TActionsIngredients
    | TActionsAuthorization
export const wsActions = {
    wsInit: WS_CONNECTION_START,
    onOpen: WS_CONNECTION_SUCCESS,
    onClose: WS_CONNECTION_CLOSE,
    onError: WS_CONNECTION_ERROR,
    onMessage: WS_GET_MESSAGE
};
export type AppDispatch = ThunkDispatch<RootState, never, TActions>;
export type RootState = ReturnType<typeof store.getState>
//export type AppDispatch = typeof store.dispatch;

export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, // return value type
    RootState,
    never,
    TActions>;
const root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement
);


const store = createStore(rootReducer, compose(applyMiddleware(thunk), applyMiddleware(socketMiddleware(wsActions))));


root.render(
    <Router>
        <React.StrictMode>
            <Provider store={store}>
                <App/>
            </Provider>
        </React.StrictMode>
    </Router>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
