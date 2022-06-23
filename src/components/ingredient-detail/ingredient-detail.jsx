import styles from "./ingredient-detail.module.css";
import PropTypes from "prop-types";

export const IngredientDetails = (props) => {
    return (
        <>
            <div className={styles.content}>
                <img
                    className={styles.image}
                    src={props.product.image_large}
                    alt={props.product.name}
                />
                <h3 className="text text_type_main-medium mt-4">
                    {props.product.name}
                </h3>
                <div className={[styles.block, "mt-8"].join(" ")}>
                    <div className={styles.item}>
                        <span className="text_color_inactive">
                            Калории,ккал
                        </span>
                        <span className="text text_type_digits-default text_color_inactive">
                            {props.product.calories}
                        </span>
                    </div>
                    <div className={styles.item}>
                        <span className="text_color_inactive">Белки, г</span>
                        <span className="text text_type_digits-default text_color_inactive">
                            {props.product.proteins}
                        </span>
                    </div>
                    <div className={styles.item}>
                        <span className="text_color_inactive">Жиры, г</span>
                        <span className="text text_type_digits-default text_color_inactive">
                            {props.product.fat}
                        </span>
                    </div>
                    <div className={styles.item}>
                        <span className="text_color_inactive">Углеводы, г</span>
                        <span className="text text_type_digits-default text_color_inactive">
                            {props.product.carbohydrates}
                        </span>
                    </div>
                </div>
            </div>
        </>
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
