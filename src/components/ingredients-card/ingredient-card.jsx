import React from "react";
import styles from "./ingredient-card.module.css";
import {
    CurrencyIcon,
    Counter,
} from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";

export const IngredientCard = (props) => (
    <div className={styles.card}>
        <img src={props.src} alt="" className={styles.image} />
        <div className={styles.priceBlock}>
            <span className="text text_type_digits-default">{props.price}</span>
            <CurrencyIcon type="primary" />
        </div>
        <span
            className={[styles.name, "text text_type_main-default"].join(" ")}
        >
            {props.name}
        </span>
        <div className={styles.counter}>
            <Counter count={1} size="default" />
        </div>
    </div>
);
IngredientCard.propTypes = {
    src: PropTypes.string,
    name: PropTypes.string,
    price: PropTypes.number,
};
