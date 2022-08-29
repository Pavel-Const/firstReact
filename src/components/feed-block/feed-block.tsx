/* eslint-disable no-lone-blocks */
import React, {useEffect} from "react";
import styles from "./feed-block.module.css";
import {FeedCard} from "../feed-card/feed-card";
import {getFeed} from "../../services/api/apiIngredients";
import {useLocation} from "react-router-dom";
import {useDispatch, useSelector} from "../../index";


export const FeedBlock = (props: { path: string, title: string }) => {
    const {pathname} = useLocation();

    const {orders} = useSelector(
        (store) => store.reducerWs
    );
    const {ingredientData, load} = useSelector(
        (store) => store.reduceIngredients.ingredientList
    );
    const dispatch = useDispatch()
    useEffect(() => {
        // @ts-ignore
        dispatch(getFeed());
    }, []);
    return (
        <section className={pathname === "/feed"
            ? styles.block
            : styles.block__profile}>
            <h1 className={[styles.title, 'text text_type_main-large'].join(" ")}>
                {props.title}
            </h1>
            <div className={[styles.list, "scrollCustom"].join(" ")}>
                {load && orders.map((item) => {
                    let orderIngredients = item.ingredients.map((item: string) => {
                        return ingredientData.find((ingredient: { _id: string; }) => item === ingredient._id)
                    })
                    return (
                        <FeedCard path={props.path} key={item._id} id={item._id} orderIngredients={orderIngredients}
                                  item={item}
                        />
                    );
                })}
            </div>
        </section>
    );
};
