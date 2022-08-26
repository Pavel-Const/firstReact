import React from "react";
import styles from "./constructor-empty.module.css";

export const ConstructorEmpty = (props: { name: string }) => {
    return (
        <div className={[styles.main, "ml-8"].join(" ")}>
            <span className={styles.text}>{props.name}</span>
        </div>
    );
};

export const ConstructorEmptyTop = (props: { name: string }) => {
    return (
        <div className={[styles.main, styles.top, "ml-8"].join(" ")}>
            <span className={styles.text}>{props.name}</span>
        </div>
    );
};
export const ConstructorEmptyBottom = (props: { name: string }) => {
    return (
        <div className={[styles.main, styles.bottom, "ml-8"].join(" ")}>
            <span className={styles.text}>{props.name}</span>
        </div>
    );
};


