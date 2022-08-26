/* eslint-disable no-lone-blocks */
import React, {useEffect} from "react";
import styles from "./feed-block.module.css";
import {FeedCard} from "../feed-card/feed-card";
import {useDispatch, useSelector} from "react-redux";
import {getFeed} from "../../services/api/api";
import {useLocation} from "react-router-dom";


export const FeedBlock = () => {
    const {pathname} = useLocation();

    const {orders} = useSelector(
        (store: any) => store.reducerWs
    );
    const {ingredientData, load} = useSelector(
        (store: any) => store.reduceIngredients.ingredientList
    );
    const dispatch: any = useDispatch()
    useEffect(() => {
        dispatch(getFeed());
    }, []);
    console.log(orders)
    return (
        <section className={pathname === "/feed"
            ? styles.block
            : styles.block__profile}>
            <h1 className={[styles.title, 'text text_type_main-large'].join(" ")}>Лента заказов</h1>
            <div className={[styles.list, "scrollCustom"].join(" ")}>
                {load && orders.map((item: any) => {
                    let orderIngredients = item.ingredients.map((item: string) => {
                        return ingredientData.find((ingredient: { _id: string; }) => item === ingredient._id)
                    })
                    return (
                        <FeedCard key={item._id} id={item._id} orderIngredients={orderIngredients} item={item}
                        />
                    );
                })}
            </div>
        </section>
    );
};
