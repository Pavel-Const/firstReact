import styles from "./ingredient-detail.module.css";
import PropTypes from "prop-types";
import React, { useEffect } from "react";
import {
    useHistory,
    useLocation,
    useParams,
    useRouteMatch,
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getFeed } from "../../services/api/api";

export const IngredientDetails = () => {
    const { ingredientData, load } = useSelector(
        (store) => store.reduceIngredients.ingredientList
    );
    const { id } = useParams();
    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(() => {
        if (history.action === "POP") {
            dispatch(getFeed());
        }
    }, [dispatch]);

    const product = ingredientData.filter((item) => {
        return item._id === id;
    });
    return (
        load && (
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
                {/*<div className={[styles.content, "pb-5"].join(" ")}>*/}
                {/*    <img*/}
                {/*        className={styles.image}*/}
                {/*        src={props.product.image_large}*/}
                {/*        alt={props.product.name}*/}
                {/*    />*/}
                {/*    <h3 className="text text_type_main-medium mt-4">*/}
                {/*        {props.product.name}*/}
                {/*    </h3>*/}
                {/*    <div className={[styles.block, "mt-8"].join(" ")}>*/}
                {/*        <div className={styles.item}>*/}
                {/*            <span className="text_color_inactive">*/}
                {/*                Калории,ккал*/}
                {/*            </span>*/}
                {/*            <span className="text text_type_digits-default text_color_inactive">*/}
                {/*                {props.product.calories}*/}
                {/*            </span>*/}
                {/*        </div>*/}
                {/*        <div className={styles.item}>*/}
                {/*            <span className="text_color_inactive">Белки, г</span>*/}
                {/*            <span className="text text_type_digits-default text_color_inactive">*/}
                {/*                {props.product.proteins}*/}
                {/*            </span>*/}
                {/*        </div>*/}
                {/*        <div className={styles.item}>*/}
                {/*            <span className="text_color_inactive">Жиры, г</span>*/}
                {/*            <span className="text text_type_digits-default text_color_inactive">*/}
                {/*                {props.product.fat}*/}
                {/*            </span>*/}
                {/*        </div>*/}
                {/*        <div className={styles.item}>*/}
                {/*            <span className="text_color_inactive">Углеводы, г</span>*/}
                {/*            <span className="text text_type_digits-default text_color_inactive">*/}
                {/*                {props.product.carbohydrates}*/}
                {/*            </span>*/}
                {/*        </div>*/}
                {/*    </div>*/}
                {/*</div>*/}
            </>
        )
    );
};

IngredientDetails.propTypes = {
    product: PropTypes.shape({
        image_large: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        calories: PropTypes.number.isRequired,
        proteins: PropTypes.number.isRequired,
        fat: PropTypes.number.isRequired,
        carbohydrates: PropTypes.number.isRequired,
    }),
};
