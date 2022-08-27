/* eslint-disable no-lone-blocks */
import React from "react";
import styles from "./feed-card.module.css";
import {CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components"
import {Link, useLocation} from "react-router-dom";


export const FeedCard = (props: { path: string; id: string; orderIngredients: any[]; item: { number: number, createdAt: string, name: string, _id: [] } }) => {
    const location = useLocation();
    let totalPriceArr: [] = [];
    props.orderIngredients.forEach((item: any) => {
        if (item !== undefined) {
            // @ts-ignore
            return totalPriceArr.push(item.price);
        }
    })
    // @ts-ignore
    let totalPrice = totalPriceArr.reduce((a, b) => a + b)
    let date = new Date(props.item.createdAt)

    function addLeadZero(val: any) {
        if (+val < 10) return '0' + val;
        return val;
    };
    return (
        <Link to={{
            pathname: `/${props.path}/${props.id}`,
            state: {background: location},
        }} className={[styles.card].join(" ")}>
            <div className={[styles.head].join(" ")}>
                <p className={[styles.number, 'text text_type_digits-default'].join(" ")}>#{props.item.number}</p>
                <p className={[styles.time, 'text text_type_main-default text_color_inactive'].join(" ")}>
                    {
                        [addLeadZero(date.getDate()),
                            addLeadZero(date.getMonth() + 1),
                            date.getFullYear()
                        ].join('.')} {
                    [addLeadZero(date.getHours()),
                        addLeadZero(date.getMinutes() + 1),
                        date.getSeconds()
                    ].join(':')}</p>
            </div>
            <p className={[styles.name, 'text text_type_main-medium'].join(" ")}>{props.item.name}</p>
            {/*<p className={[styles.name, 'text text_type_main-small'].join(" ")}>Создан</p>*/}
            <div className={[styles.foot].join(" ")}>
                <div className={[styles.box].join(" ")}>
                    {(props.orderIngredients.length < 6) ?
                        props.orderIngredients.map((item: any, index) => {
                            if (item !== undefined) {
                                if (props.orderIngredients.length < 6) {
                                    return (
                                        <div key={index} style={{zIndex: 6 - index}}
                                             className={[styles.item].join(" ")}>
                                            <img src={`${item.image_mobile}`} alt=""/>
                                        </div>)
                                }
                            }
                        })
                        : (props.orderIngredients.map((item: any, index) => {
                            if (index < 5) {
                                return (
                                    <div key={index} style={{zIndex: 6 - index}} className={[styles.item].join(" ")}>
                                        <img src={`${item.image_mobile}`} alt=""/>
                                    </div>)
                            } else if (index === 5) {
                                return (<div key={index} style={{zIndex: 1}}
                                             className={[styles.item, styles.item_last].join(" ")}>
                                    <img src={`${item.image_mobile}`} alt=""/>
                                    <p className={[styles.text].join(" ")}>+{props.orderIngredients.length - 5}</p>
                                </div>)
                            }
                        }))
                    }
                </div>
                <div className={[styles.total].join(" ")}>
                    <p className={[styles.price, "text text_type_digits-medium"].join(" ")}>{totalPrice}</p>
                    <CurrencyIcon type="primary"/>
                </div>
            </div>
        </Link>
    );
};
