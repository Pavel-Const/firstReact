import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getFeed } from "../../services/api/api";
import { useDrop } from "react-dnd";
import {
    ADD_PRODUCT_CONSTRUCTOR,
    COUNTER_CONSTRUCTOR_ITEM,
} from "../../services/actions/actions";

import constructorStyles from "./burger-constructor.module.css";
import { ConstructorCard } from "../constructor-card/constructor-card";
import { ConstructorOrder } from "../constructor-order/constructor-order";

export const BurgerConstructor = () => {
    const { ingredientList, ingredientListConstructor } = useSelector(
        (store) => store.getIngredients
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
    return (
        <section className={[constructorStyles.main].join(" ")}>
            <div className={constructorStyles.block}>
                {ingredientList.load && (
                    <>
                        <ConstructorCard
                            name={`${ingredientListConstructor.buns[0].name} (верх)`}
                            price={ingredientListConstructor.buns[0].price}
                            img={ingredientListConstructor.buns[0].image}
                            type="top"
                        />
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
                                            img={item.image}
                                        />
                                    )
                                )
                            ) : (
                                <ConstructorCard
                                    name={"Добавьте ингредиент"}
                                    isLocked={true}
                                />
                            )}
                        </div>
                        <ConstructorCard
                            name={`${ingredientListConstructor.buns[0].name} (низ)`}
                            price={ingredientListConstructor.buns[0].price}
                            img={ingredientListConstructor.buns[0].image}
                            type="bottom"
                        />
                    </>
                )}
            </div>
            <ConstructorOrder id={arrayId} />
        </section>
    );
};
