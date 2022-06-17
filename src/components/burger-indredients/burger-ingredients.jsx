import React from "react";
import ingredientStyles from "./burger-ingredients.module.css";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import { data } from "../../utils/data";
import { IngredientBlock } from "../ingredients-block/ingredient-block";

export const BurgerIngredients = () => {
    const [current, setCurrent] = React.useState("one");
    let dataBun = [],
        dataMain = [],
        dataSauce = [];
    data.forEach((item) => {
        switch (item.type) {
            case "bun":
                dataBun.push(item);
                break;
            case "main":
                dataMain.push(item);
                break;
            case "sauce":
                dataSauce.push(item);
                break;
            default:
        }
    });

    return (
        <section className={[ingredientStyles.main].join(" ")}>
            <h2 className="text text_type_main-large mt-10">Соберите бургер</h2>
            <div
                style={{ display: "flex", minWidth: "600px" }}
                className={[ingredientStyles.tabs, "mt-5"].join(" ")}
            >
                <Tab
                    value="one"
                    active={current === "one"}
                    onClick={setCurrent}
                >
                    Булки
                </Tab>
                <Tab
                    value="two"
                    active={current === "two"}
                    onClick={setCurrent}
                >
                    Соусы
                </Tab>
                <Tab
                    value="three"
                    active={current === "three"}
                    onClick={setCurrent}
                >
                    Начинки
                </Tab>
            </div>
            <div
                className={[ingredientStyles.mainBlock, "scrollCustom"].join(
                    " "
                )}
            >
                {dataBun.length && (
                    <IngredientBlock title="Булки" list={dataBun} />
                )}
                {dataMain.length && (
                    <IngredientBlock title="Основа" list={dataMain} />
                )}
                {dataSauce.length && (
                    <IngredientBlock title="Соусы" list={dataSauce} />
                )}
            </div>
        </section>
    );
};
