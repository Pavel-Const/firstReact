import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getFeed } from "../../services/api/api";
import { useDrop } from "react-dnd";
import shortid from "shortid";

import {
    ADD_PRODUCT_CONSTRUCTOR,
    COUNTER_CONSTRUCTOR_ITEM,
} from "../../services/actions/actionsIngredients";

import constructorStyles from "./burger-constructor.module.css";
import { ConstructorCard } from "../constructor-card/constructor-card";
import { ConstructorOrder } from "../constructor-order/constructor-order";
import {
    ConstructorEmpty,
    ConstructorEmptyBottom,
    ConstructorEmptyTop,
} from "../constructor-empty/constructor-empty";

export const BurgerConstructor = () => {
    const { ingredientList, ingredientListConstructor } = useSelector(
        (store) => store.reduceIngredients
    );
    const dispatch = useDispatch();

    useEffect(() => {
        let arr = [];
        ingredientListConstructor.other.forEach((item) => {
            arr.push(item._id);
        });
        ingredientListConstructor.buns.forEach((item) => {
            arr.push(item._id);
        });
        for (let len = arr.length, i = len; --i >= 0; ) {
            if (arr[arr[i]]) {
                arr[arr[i]] += 1;
                arr.splice(i, 1);
            } else {
                arr[arr[i]] = 1;
            }
        }
        arr.sort(function (a, b) {
            return arr[b] - arr[a];
        });

        const result = arr.map((el, i, a) => ({
            id: el,
            count: a[el],
        }));
        dispatch({
            type: COUNTER_CONSTRUCTOR_ITEM,
            count: result,
        });
    }, [ingredientListConstructor]);

    const [, dropTarget] = useDrop({
        accept: "product",
        drop(item) {
            dispatch({
                type: ADD_PRODUCT_CONSTRUCTOR,
                id: item.id,
                kind: item.type,
                newId: shortid.generate(),
            });
        },
    });

    useEffect(() => {
        dispatch(getFeed());
    }, []);

    let arrayId = [];
    ingredientListConstructor.other.forEach((item) => {
        arrayId.push(item._id);
    });
    ingredientListConstructor.buns.forEach((item) => {
        arrayId.push(item._id);
    });

    return (
        <section className={[constructorStyles.main].join(" ")}>
            <div className={constructorStyles.block}>
                {ingredientList.load && (
                    <>
                        {ingredientListConstructor.buns.length ? (
                            <ConstructorCard
                                name={`${ingredientListConstructor.buns[0].name} (верх)`}
                                price={ingredientListConstructor.buns[0].price}
                                src={ingredientListConstructor.buns[0].image}
                                type="top"
                            />
                        ) : (
                            <ConstructorEmptyTop name={`Булка (верх)`} />
                        )}
                        <div
                            className={[
                                constructorStyles.box,
                                "scrollCustom",
                            ].join(" ")}
                            ref={dropTarget}
                        >
                            {ingredientListConstructor.other.length ? (
                                ingredientListConstructor.other.map(
                                    (item, index) => (
                                        <ConstructorCard
                                            key={item.newId}
                                            index={index}
                                            id={item._id}
                                            name={item.name}
                                            price={item.price}
                                            src={item.image}
                                        />
                                    )
                                )
                            ) : (
                                <ConstructorEmpty
                                    name={"Перенесите ингредиент сюда"}
                                />
                            )}
                        </div>
                        {ingredientListConstructor.buns.length ? (
                            <ConstructorCard
                                name={`${ingredientListConstructor.buns[0].name} (низ)`}
                                price={ingredientListConstructor.buns[0].price}
                                src={ingredientListConstructor.buns[0].image}
                                type="bottom"
                            />
                        ) : (
                            <ConstructorEmptyBottom name={`Булка (низ)`} />
                        )}
                    </>
                )}
            </div>
            <ConstructorOrder id={arrayId} />
        </section>
    );
};
