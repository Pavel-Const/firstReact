import React, {FC, ReactNode, useEffect} from "react";
import ReactDOM from "react-dom";
import modalStyles from "./modal.module.css";
import {ModalOverlay} from "../modal-overlay/modal-overlay";
import {CloseIcon} from "@ya.praktikum/react-developer-burger-ui-components";

interface IModal {
    isOpen: boolean | object,
    title?: string,
    children?: ReactNode;
    closeModal: () => void
}

const modalRoot = document.getElementById("root-modal")!;
const Modal: FC<IModal> = (props) => {
    const isOpen = props.isOpen;
    useEffect(() => {
        function closeByEscape(evt: { key: string; }) {
            if (evt.key === "Escape") {
                props.closeModal();
            }
        }

        if (isOpen) {
            document.addEventListener("keydown", closeByEscape);
            document.body.classList.add("modalOpen");

            return () => {
                document.removeEventListener("keydown", closeByEscape);
                document.body.classList.remove("modalOpen");
            };
        }
    }, [isOpen]);
    return ReactDOM.createPortal(
        <>
            <div className={[modalStyles.main].join(" ")}>
                <div>
                    <h2
                        className={[
                            modalStyles.title,
                            "text text_type_main-large title_modal",
                        ].join(" ")}
                    >
                        {props.title}
                    </h2>
                    <button
                        className={[modalStyles.btnClose, 'modal_close'].join(" ")}
                        onClick={props.closeModal}
                    >
                        <CloseIcon type="primary"/>
                    </button>
                </div>
                {props.children}
            </div>
            <ModalOverlay closeModal={props.closeModal}/>
        </>,
        modalRoot
    );
};


export default Modal;
