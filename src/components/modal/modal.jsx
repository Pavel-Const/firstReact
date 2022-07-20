import React, {useEffect} from "react";
import PropTypes from "prop-types";
import ReactDOM from "react-dom";
import modalStyles from "./modal.module.css";
import {ModalOverlay} from "../modal-overlay/modal-overlay";
import {CloseIcon} from "@ya.praktikum/react-developer-burger-ui-components";

const modalRoot = document.getElementById("root-modal");
const Modal = (props) => {
    const isOpen = props.isOpen;
    useEffect(() => {
        function closeByEscape(evt) {
            if (evt.key === "Escape") {
                props.closeModal();
            }
        }

        if (isOpen) {
            document.addEventListener("keydown", closeByEscape);
            document.querySelector("body").classList.add("modalOpen");

            return () => {
                document.removeEventListener("keydown", closeByEscape);
                document.querySelector("body").classList.remove("modalOpen");
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
                            "text text_type_main-large",
                        ].join(" ")}
                    >
                        {props.title}
                    </h2>
                    <button
                        className={modalStyles.btnClose}
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

Modal.propTypes = {
    isOpen: PropTypes.oneOfType([
        PropTypes.bool,
        PropTypes.object,
    ]),
    title: PropTypes.string,
};

export default Modal;
