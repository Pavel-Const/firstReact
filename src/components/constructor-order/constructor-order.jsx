import React from "react";
import styles from "./constructor-order.module.css";
import {
    CurrencyIcon,
    Button,
} from "@ya.praktikum/react-developer-burger-ui-components";

export const ConstructorOrder = (props) => {
    return (
        <div className={[styles.block].join(" ")}>
            <div className={[styles.priceBlock].join(" ")}>
                <span
                    className={[
                        styles.price,
                        "text text_type_digits-medium",
                    ].join(" ")}
                >
                    610
                </span>
                <CurrencyIcon type="primary" />
            </div>
            <Button type="primary" size="large">
                Оформить заказ
            </Button>
        </div>
    );
};
