import React from "react";
import styles from "./header-btn.module.css";

const HeaderButton = (props) => (
    <a href="#" className={[props.styles, styles.button].join(" ")}>
        {props.children}
    </a>
);

export default HeaderButton;
