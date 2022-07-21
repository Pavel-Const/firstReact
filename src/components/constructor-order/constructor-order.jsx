import React, { useEffect } from "react";
import styles from "./constructor-order.module.css";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { getOrderInfo } from "../../services/api/api";
import {
    CurrencyIcon,
    Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { GET_TOTAL_PRICE } from "../../services/actions/actionsIngredients";
import { useHistory, useLocation } from "react-router-dom";

export const ConstructorOrder = (props) => {
    const { totalPrice, ingredientListConstructor } = useSelector(
        (store) => store.reduceIngredients
    );
    const { userAuth } = useSelector((store) => store.reduceAuthorization);
    const history = useHistory();
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch({
            type: GET_TOTAL_PRICE,
        });
    }, [ingredientListConstructor]);
    const open = () => {
        if (ingredientListConstructor.buns.length && userAuth) {
            return dispatch(getOrderInfo(props.id));
        } else {
            history.replace({
                pathname: "/login",
                state: { from: { pathname: "/" } },
            });
        }
    };
    return (
        <div className={[styles.block].join(" ")}>
            <div className={[styles.priceBlock].join(" ")}>
                <span
                    className={[
                        styles.price,
                        "text text_type_digits-medium",
                    ].join(" ")}
                >
                    {totalPrice}
                </span>
                <CurrencyIcon type="primary" />
            </div>
            <Button onClick={open} type="primary" size="large">
                Оформить заказ
            </Button>
        </div>
    );
};
ConstructorOrder.propTypes = {
    id: PropTypes.array.isRequired,
};
