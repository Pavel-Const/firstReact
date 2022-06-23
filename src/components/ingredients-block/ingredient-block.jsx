import React from "react";
import styles from "./ingredient-block.module.css";
import { IngredientCard } from "../ingredients-card/ingredient-card";
import PropTypes from "prop-types";
export const IngredientBlock = (props) => (
    <section className={styles.block}>
        <h2>{props.title}</h2>
        <div className={styles.list}>
            {props.list.map((item) => (
                <IngredientCard
                    key={item._id}
                    id={item._id}
                    src={item.image}
                    price={item.price}
                    name={item.name}
                    openModal={props.openModal}
                />
            ))}
        </div>
    </section>
);
IngredientBlock.propTypes = {
    list: PropTypes.array.isRequired,
    title: PropTypes.string.isRequired,
};
