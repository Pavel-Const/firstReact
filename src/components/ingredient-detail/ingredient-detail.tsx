import styles from "./ingredient-detail.module.css";
import React from "react";
import {
    useParams
} from "react-router-dom";
import {useSelector} from "../../index";

export const IngredientDetails = () => {
    const {ingredientData, load} = useSelector(
        (store) => store.reduceIngredients.ingredientList
    );
    const {id} = useParams<{ id?: string }>();
    const product = ingredientData.filter((item: { _id: string }) => {
        return item._id === id;
    });
    return (
        load ? (
            <>
                <div className={[styles.content, "pb-5"].join(" ")}>
                    <img
                        className={styles.image}
                        src={product[0].image_large}
                        alt={product[0].name}
                    />
                    <h3 className="text text_type_main-medium mt-4">
                        {product[0].name}
                    </h3>
                    <div className={[styles.block, "mt-8"].join(" ")}>
                        <div className={styles.item}>
                            <span className="text_color_inactive">
                                Калории,ккал
                            </span>
                            <span className="text text_type_digits-default text_color_inactive">
                                {product[0].calories}
                            </span>
                        </div>
                        <div className={styles.item}>
                            <span className="text_color_inactive">
                                Белки, г
                            </span>
                            <span className="text text_type_digits-default text_color_inactive">
                                {product[0].proteins}
                            </span>
                        </div>
                        <div className={styles.item}>
                            <span className="text_color_inactive">Жиры, г</span>
                            <span className="text text_type_digits-default text_color_inactive">
                                {product[0].fat}
                            </span>
                        </div>
                        <div className={styles.item}>
                            <span className="text_color_inactive">
                                Углеводы, г
                            </span>
                            <span className="text text_type_digits-default text_color_inactive">
                                {product[0].carbohydrates}
                            </span>
                        </div>
                    </div>
                </div>
            </>
        ) : null
    );
};


