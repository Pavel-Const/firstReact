import React from "react";
import styles from "./constructor-card.module.css";
import {
    ConstructorElement,
    DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";

export const ConstructorCard = (props) => {
    console.log(props.group);
    return (
        <>
            {props.type === undefined ? (
                props.group !== "bun" ? (
                    <div className={styles.item}>
                        <DragIcon />
                        <ConstructorElement
                            text={props.name}
                            price={props.price}
                            thumbnail={props.img}
                        />
                    </div>
                ) : null
            ) : (
                <div className={[styles.item, "ml-8"].join(" ")}>
                    <ConstructorElement
                        text={props.name}
                        price={props.price}
                        thumbnail={props.img}
                        isLocked={true}
                        type={props.type}
                    />
                </div>
            )}
        </>
    );
};

ConstructorCard.propTypes = {
    img: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    type: PropTypes.string,
    isLocked: PropTypes.bool,
};
