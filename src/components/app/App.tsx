import React from "react";
import AppHeader from "../app-header/app-header";
import { BurgerIngredients } from "../burger-indredients/burger-ingredients";
import { BurgerConstructor } from "../burger-constructor/burger-constructor";
import appStyles from "./App.module.css";

function App() {
    return (
        <div className="App">
            <AppHeader />
            <main className={[appStyles.main, "container"].join(" ")}>
                <BurgerIngredients />
                <BurgerConstructor />
            </main>
        </div>
    );
}

export default App;
