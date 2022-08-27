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
    TActionsWs
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

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;

export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, // return value type
    RootState, // app state type
    never, // extra argument type
    TActions // action type
    >;
const root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement
);


const store = createStore(rootReducer, compose(applyMiddleware(thunk), applyMiddleware(socketMiddleware())));


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
