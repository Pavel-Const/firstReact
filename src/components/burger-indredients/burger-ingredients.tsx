/* eslint-disable no-lone-blocks */
import React, {useEffect, useState} from "react";
import ingredientStyles from "./burger-ingredients.module.css";
import {Tab as TabUI} from "@ya.praktikum/react-developer-burger-ui-components";
import {IngredientBlock} from "../ingredients-block/ingredient-block";
import {getFeed} from "../../services/api/apiIngredients";
import {ingredientTypeReq, TRef} from "../../services/utils/types";
import {useDispatch, useSelector} from "../../index";

export const BurgerIngredients = () => {
    const [current, setCurrent] = useState("one");
    const {ingredientData, load} = useSelector(
        (store: any) => store.reduceIngredients.ingredientList
    );
    const dispatch = useDispatch();
    const Tab: React.FC<{
        active: boolean;
        value: string;
        onClick: (value: string) => void;
        children: React.ReactNode;
    }> = TabUI;
    useEffect(() => {
        // @ts-ignore
        dispatch(getFeed());
    }, [dispatch]);

    const dataBun: Array<ingredientTypeReq> = [],
        dataMain: Array<ingredientTypeReq> = [],
        dataSauce: Array<ingredientTypeReq> = [];
    {
        load &&
        ingredientData.forEach((item: ingredientTypeReq) => {
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
    }
    const bunRef = React.useRef<TRef>(null);
    const mainRef = React.useRef<TRef>(null);
    const sauceRef = React.useRef<TRef>(null);
    const parentRef = React.useRef<TRef>(null);

    const onScroll = () => {

        const parent = parentRef.current?.getBoundingClientRect();
        const bun = bunRef.current?.getBoundingClientRect();
        const main = mainRef.current?.getBoundingClientRect();
        const sauce = sauceRef.current?.getBoundingClientRect();
        if (parent && bun && main && sauce) {
            const bunY = Math.abs(bun.top - parent.top);
            const mainY = Math.abs(main.top - parent.top);
            const sauceY = Math.abs(sauce.top - parent.top);
            if (bunY < mainY && bunY < sauceY) {
                setCurrent("one");
            } else if (mainY < bunY && mainY < sauceY) {
                setCurrent("two");
            } else {
                setCurrent("three");
            }
        }

    };
    return (
        <section className={[ingredientStyles.main].join(" ")}>
            <h2 className="text text_type_main-large mt-10">Соберите бургер</h2>
            <div
                className={[ingredientStyles.tabs, "mt-5"].join(" ")}
                ref={parentRef}
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
                    Начинки
                </Tab>
                <Tab
                    value="three"
                    active={current === "three"}
                    onClick={setCurrent}
                >
                    Соусы
                </Tab>
            </div>
            <div
                className={[ingredientStyles.mainBlock, "scrollCustom"].join(
                    " "
                )}
                onScroll={onScroll}
            >
                {dataBun.length && (
                    <IngredientBlock
                        title="Булки"
                        list={dataBun}
                        elementRef={bunRef}
                    />
                )}
                {dataMain.length && (
                    <IngredientBlock
                        title="Начинки"
                        list={dataMain}
                        elementRef={mainRef}
                    />
                )}
                {dataSauce.length && (
                    <IngredientBlock
                        title="Соусы"
                        list={dataSauce}
                        elementRef={sauceRef}
                    />
                )}
            </div>
        </section>
    );
};
