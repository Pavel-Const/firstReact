/* eslint-disable no-lone-blocks */
import React, {useEffect} from "react";
import styles from "./feed-detail.module.css";
import {CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components"
import {useHistory, useParams} from "react-router-dom";
import {getFeed} from "../../services/api/apiIngredients";
import {getToken, getUser} from "../../services/api/apiAuth";
import {WS_CONNECTION_CLOSE, WS_CONNECTION_START} from "../../services/actions/actionsWs";
import {wsUrl} from "../../services/api/url";
import {getCookie} from "../../services/utils";
import {useDispatch, useSelector} from "../../index";

export const FeedDetail = (props: { type?: string }) => {
    const {orders, getData} = useSelector(
        (store: any) => store.reducerWs
    );
    const {id} = useParams<{ id?: string }>();
    const product = orders.filter((item: { _id: string }) => {
        return item._id === id;
    });
    const {ingredientData} = useSelector(
        (store: any) => store.reduceIngredients.ingredientList
    );
    const dispatch: any = useDispatch();
    const history = useHistory();
    const accessToken: string | undefined = getCookie('accessToken')
    let date = new Date(product[0].createdAt)

    function addLeadZero(val: any) {
        if (+val < 10) return '0' + val;
        return val;
    };
    useEffect(() => {
        console.log(accessToken, props.type, history.action)
        if ((history.action === "POP" || history.action === "REPLACE") && props.type === 'feed') {
            dispatch({type: WS_CONNECTION_START, url: wsUrl});
            dispatch(getFeed());
            return () => {
                dispatch({type: WS_CONNECTION_CLOSE});
            }
        }
        if ((history.action === "POP" || history.action === "REPLACE") && props.type === 'lc') {
            dispatch(getFeed());
            if (accessToken) {
                // @ts-ignore
                let authToken = accessToken.split('Bearer ')[1];
                dispatch(getUser(accessToken));
                dispatch({
                    type: WS_CONNECTION_START,
                    url: `wss://norma.nomoreparties.space/orders?token=${authToken}`
                });
                return () => {
                    dispatch({type: WS_CONNECTION_CLOSE});
                }
            } else {
                dispatch(getToken());
                // @ts-ignore
                loader && dispatch(getUser(accessToken));
            }
            return () => {
                dispatch({type: WS_CONNECTION_CLOSE});
            }
        }
    }, [dispatch]);
    let orderIngredients: any[] = []
    let orderIngredientsNoDuble: any[] = []
    let totalPriceArr: [] = [];
    let totalPrice = 0;
    const counts: any = {};

    if (getData) {
        product[0].ingredients.forEach(function (x: string | number) {
            counts[x] = (counts[x] || 0) + 1;
        });
        orderIngredientsNoDuble = Object.keys(counts).map((item: string) => {
            return ingredientData.find((ingredient: { _id: string; }) => item === ingredient._id)
        })
        product.map((item: any) => {
            orderIngredients = item.ingredients.map((item: string) => {
                return ingredientData.find((ingredient: { _id: string; }) => item === ingredient._id)
            })
        })
        orderIngredients.forEach((item: any) => {
            // @ts-ignore
            return totalPriceArr.push(item.price);
        })
        // @ts-ignore
        totalPrice = totalPriceArr.reduce((a, b) => a + b)
    }


    return (
        <>
            {getData &&
                <div className={[styles.detail].join(" ")}>
                    <p className={[styles.num, "text text_type_digits-default"].join(" ")}>#{product[0].number}</p>
                    <h2 className={[styles.name, "text text_type_main-medium"].join(" ")}>{product[0].name}</h2>
                    {/*<p className={[styles.status].join(" ")}>Выполнен</p>*/}
                    <div className={[styles.structure].join(" ")}>
                        <h3 className={[styles.title, "text text_type_main-medium"].join(" ")}>Состав:</h3>
                        <ul className={[styles.list, "scrollCustom"].join(" ")}>
                            {orderIngredientsNoDuble.map((item, index) => {
                                return (<li className={[styles.item].join(" ")} key={item._id}>
                                    <div className={[styles.item__img].join(" ")}>
                                        <img src={item.image_mobile} alt=""/>
                                    </div>
                                    <p className={[styles.item__name, "text text_type_main-default"].join(" ")}>{item.name}</p>
                                    <div className={[styles.item__total].join(" ")}>
                                        <p className={[styles.item__quantity, "text text_type_digits-default"].join(" ")}>
                                            {counts[item._id]} x {item.price}</p>
                                        <CurrencyIcon type="primary"/>
                                    </div>
                                </li>)
                            })}

                        </ul>
                    </div>
                    <div className={[styles.total].join(" ")}>
                        <p className={[styles.time, "text text_type_main-default text_color_inactive"].join(" ")}>{
                            [addLeadZero(date.getDate()),
                                addLeadZero(date.getMonth() + 1),
                                date.getFullYear()
                            ].join('.')} {
                            [addLeadZero(date.getHours()),
                                addLeadZero(date.getMinutes() + 1),
                                date.getSeconds()
                            ].join(':')}</p>
                        <div className={[styles.item__total].join(" ")}>
                            <p className={[styles.item__quantity, "text text_type_digits-default"].join(" ")}>{totalPrice}</p>
                            <CurrencyIcon type="primary"/>
                        </div>
                    </div>
                </div>
            }
        </>

    )
        ;
};
