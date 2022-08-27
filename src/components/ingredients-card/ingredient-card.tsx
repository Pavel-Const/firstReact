import React, {FC} from "react";
import styles from "./ingredient-card.module.css";
import {
    CurrencyIcon,
    Counter,
} from "@ya.praktikum/react-developer-burger-ui-components";
import {useDrag} from "react-dnd";
import {ingredientType} from "../../services/utils/types";
import {Link, useLocation} from "react-router-dom";
import {useSelector} from "../../index";

export const IngredientCard: FC<ingredientType & { id: string, typeIng: string }> = (props) => {
    const location = useLocation();
    const {counter} = useSelector(
        (store: any) => store.reduceIngredients.ingredientList
    );

    let count: any = 0;
    if (counter !== undefined) {
        count = counter.filter((el: { id: string; }) => {
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
        item: {id: props.id, type: props.typeIng},
    });

    return (
        <Link
            to={{
                pathname: `/ingredients/${props.id}`,
                state: {background: location},
            }}
            className={styles.card}
            ref={dragRef}
        >
            <img src={props.src} alt={props.name} className={styles.image}/>
            <div className={styles.priceBlock}>
                <span className="text text_type_digits-default">
                    {props.price}
                </span>
                <CurrencyIcon type="primary"/>
            </div>
            <span
                className={[styles.name, "text text_type_main-default"].join(
                    " "
                )}
            >
                {props.name}
            </span>
            <div className={styles.counter}>
                <Counter count={count} size="default"/>
            </div>
        </Link>
    );
};

