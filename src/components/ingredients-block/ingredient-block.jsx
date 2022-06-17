import React from "react";
import styles from "./ingredient-block.module.css";
import { IngredientCard } from "../ingredients-card/ingredient-card";
import PropTypes from "prop-types";

import {} from "@ya.praktikum/react-developer-burger-ui-components";

export const IngredientBlock = (props) => (
    <section className={styles.block}>
        <h2>{props.title}</h2>
        <div className={styles.list}>
            {props.list.map((item, index) => (
                <IngredientCard
                    key={index}
                    src={item.image}
                    price={item.price}
                    name={item.name}
                />
            ))}
        </div>
    </section>
);
IngredientBlock.propTypes = {
    list: PropTypes.array,
    title: PropTypes.string,
};
