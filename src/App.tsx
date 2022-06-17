import React from "react";
import AppHeader from "./components/app-header/app-header";
import { BurgerIngredients } from "./components/burger-indredients/burger-ingredients";
import { BurgerConstructor } from "./components/burger-constructor/burger-constructor";
import "./App.css";

function App() {
    return (
        <div className="App">
            <AppHeader />
            <main className="main container">
                <BurgerIngredients />
                <BurgerConstructor />
            </main>
        </div>
    );
}

export default App;
