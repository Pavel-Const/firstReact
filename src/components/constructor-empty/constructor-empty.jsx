import React from "react";
import PropTypes from "prop-types";
import styles from "./constructor-empty.module.css";

export const ConstructorEmpty = (props) => {
    return (
        <div className={[styles.main, "ml-8"].join(" ")}>
            <span className={styles.text}>{props.name}</span>
        </div>
    );
};

export const ConstructorEmptyTop = (props) => {
    return (
        <div className={[styles.main, styles.top, "ml-8"].join(" ")}>
            <span className={styles.text}>{props.name}</span>
        </div>
    );
};
export const ConstructorEmptyBottom = (props) => {
    return (
        <div className={[styles.main, styles.bottom, "ml-8"].join(" ")}>
            <span className={styles.text}>{props.name}</span>
        </div>
    );
};

ConstructorEmpty.propTypes = {
    name: PropTypes.string.isRequired,
};
