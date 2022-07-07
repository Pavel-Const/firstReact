import React, { useEffect } from "react";
import styles from "./constructor-order.module.css";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { getOrderInfo } from "../../services/api/api";
import {
    CurrencyIcon,
    Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { GET_TOTAL_PRICE } from "../../services/actions/actions";

export const ConstructorOrder = (props) => {
    const { totalPrice, ingredientListConstructor } = useSelector(
        (store) => store.getIngredients
    );
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch({
            type: GET_TOTAL_PRICE,
        });
    }, [ingredientListConstructor]);
    const open = () => {
        if (ingredientListConstructor.buns.length) {
            return dispatch(getOrderInfo(props.id));
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
