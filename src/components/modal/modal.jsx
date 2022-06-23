/* eslint-disable default-case */
import modalStyles from "./modal.module.css";

import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";

export const Modal = (props) => {
    let styleMain;
    switch (props.type) {
        case "order":
            styleMain = modalStyles.main_order;
            break;
        case "detail":
            styleMain = modalStyles.main_detail;
            break;
    }

    return (
        <div className={[modalStyles.main, styleMain].join(" ")}>
            <div>
                <h2
                    className={[
                        modalStyles.title,
                        "text text_type_main-large",
                    ].join(" ")}
                >
                    {props.type === "detail" && "Детали ингредиента"}
                </h2>
                <button
                    className={modalStyles.btnClose}
                    onClick={props.closeModal}
                >
                    <CloseIcon type="primary" />
                </button>
            </div>
            {props.children}
        </div>
    );
};
