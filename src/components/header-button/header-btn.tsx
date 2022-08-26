import React, {FC, ReactNode} from "react";
import styles from "./header-btn.module.css";

interface IProps {
    styles: string,
    children: ReactNode
}


const HeaderButton: FC<IProps> = (props) => (
    <p className={[props.styles, styles.button].join(" ")}>{props.children}</p>
);

export default HeaderButton;
