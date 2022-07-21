import React from "react";
import ReactDOM from "react-dom/client";
import {applyMiddleware, createStore} from "redux";
import thunk from "redux-thunk";
import {Provider} from "react-redux";
import {BrowserRouter as Router} from "react-router-dom";
import "./index.css";
import "./reset.css";
import App from "./components/app/App";
import reportWebVitals from "./reportWebVitals";
import {rootReducer} from "./services/reducers/rootReducer";

const root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement
);

const store = createStore(rootReducer, applyMiddleware(thunk));

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
