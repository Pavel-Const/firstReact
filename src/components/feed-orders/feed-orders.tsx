/* eslint-disable no-lone-blocks */
import React from "react";
import styles from "./feed-orders.module.css";
import {IngredientCard} from "../ingredients-card/ingredient-card";
import {useSelector} from "../../index";

export const FeedOrders = () => {
    const {orders, total, totalToday} = useSelector(
        (store) => store.reducerWs
    );
    let done: number[] = []
    orders.forEach((item: { status: string; number: number; }) => {
        if (item.status === 'done') {
            done.push(item.number)
        }
    })
    return (
        <section className={[styles.block].join(" ")}>
            <div className={[styles.box].join(" ")}>
                <div className={[styles.column].join(" ")}>
                    <h2 className={[styles.title, 'text text_type_main-medium'].join(" ")}> Готовы:</h2>
                    <ul className={[styles.list].join(" ")}>
                        {done.map((item) => {
                            return (
                                <li className={[styles.ready, "text text_type_digits-default"].join(" ")}
                                    key={item}>{item}</li>
                            );
                        })}
                    </ul>
                </div>
                <div className={[styles.column].join(" ")}>
                    <h2 className={[styles.title, 'text text_type_main-medium'].join(" ")}> В работе:</h2>
                    <ul className={[styles.list].join(" ")}>
                        <li className={["text text_type_digits-default"].join(" ")}></li>
                    </ul>
                </div>
            </div>
            <div className={[styles.total].join(" ")}>
                <p className={[styles.total__title, 'text text_type_main-medium'].join(" ")}>Выполнено за все время:</p>
                <p className={[styles.total__num, "text text_type_digits-large"].join(" ")}>{total}</p>
            </div>
            <div className={[styles.total].join(" ")}>
                <p className={[styles.total__title, 'text text_type_main-medium'].join(" ")}>Выполнено за сегодня:</p>
                <p className={[styles.total__num, "text text_type_digits-large"].join(" ")}>{totalToday}</p>
            </div>
        </section>
    );
};
