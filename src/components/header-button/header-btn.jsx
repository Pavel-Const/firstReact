import React from "react";
import styles from "./header-btn.module.css";

const HeaderButton = (props) => (
    <p className={[props.styles, styles.button].join(" ")}>
        {props.children}
    </p>
);

export default HeaderButton;
