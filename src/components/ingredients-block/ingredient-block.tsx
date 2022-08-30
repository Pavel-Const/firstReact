import React, {FC} from "react";
import styles from "./ingredient-block.module.css";
import {IngredientCard} from "../ingredients-card/ingredient-card";
import PropTypes from "prop-types";
import {ingredientTypeReq} from "../../services/utils/types";

interface IProps {
    elementRef: any,
    title: string
    list: Array<ingredientTypeReq>
}

export const IngredientBlock: FC<IProps> = (props) => {
    return (
        <section className={styles.block}>
            <h2 ref={props.elementRef}>{props.title}</h2>
            <div className={styles.list}>
                {props.list.map((item) => {
                    return (
                        <IngredientCard
                            key={item._id}
                            id={item._id}
                            src={item.image}
                            price={item.price}
                            name={item.name}
                            typeIng={item.type}
                        />
                    );
                })}
            </div>
        </section>
    );
};
IngredientBlock.propTypes = {
    list: PropTypes.array.isRequired,
    title: PropTypes.string.isRequired,
};
