import React from "react";
import styles from "./ingredient-card.module.css";
import {
    CurrencyIcon,
    Counter,
} from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { GET_INGREDIENT_INFO } from "../../services/actions/actions";
import { useDrag } from "react-dnd";
import { ingredientType } from "../../services/utils/types";

export const IngredientCard = (props) => {
    const { counter } = useSelector(
        (store) => store.getIngredients.ingredientList
    );
    let count = 0;
    if (counter !== undefined) {
        count = counter.filter((el) => {
            if (el.id === props.id) {
                return el;
            } else return null;
        });
        if (count.length) {
            count = count[0].count;
        } else count = 0;
    }

    const [, dragRef] = useDrag({
        type: "product",
        item: { id: props.id, type: props.type },
    });
    const dispatch = useDispatch();
    const open = () =>
        dispatch({
            type: GET_INGREDIENT_INFO,
            id: props.id,
            title: "Детали ингредиента",
        });

    return (
        <div className={styles.card} onClick={open} ref={dragRef}>
            <img src={props.src} alt={props.name} className={styles.image} />
            <div className={styles.priceBlock}>
                <span className="text text_type_digits-default">
                    {props.price}
                </span>
                <CurrencyIcon type="primary" />
            </div>
            <span
                className={[styles.name, "text text_type_main-default"].join(
                    " "
                )}
            >
                {props.name}
            </span>
            <div className={styles.counter}>
                <Counter count={count} size="default" />
            </div>
        </div>
    );
};
IngredientCard.propTypes = {
    ...ingredientType,
    id: PropTypes.string.isRequired,
};
