import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { CLOSE_MODAL } from "../../services/actions/actions";
import ReactDOM from "react-dom";
import modalStyles from "./modal.module.css";
import { ModalOverlay } from "../modal-overlay/modal-overlay";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";

const modalRoot = document.getElementById("root-modal");
const Modal = (props) => {
    const dispatch = useDispatch();
    const closeModal = () =>
        dispatch({
            type: CLOSE_MODAL,
        });
    const isOpen = props.isOpen;
    useEffect(() => {
        function closeByEscape(evt) {
            if (evt.key === "Escape") {
                closeModal();
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
                        onClick={closeModal}
                    >
                        <CloseIcon type="primary" />
                    </button>
                </div>
                {props.children}
            </div>
            <ModalOverlay closeModal={closeModal} />
        </>,
        modalRoot
    );
};

Modal.propTypes = {
    isOpen: PropTypes.bool,
    title: PropTypes.string,
};

export default Modal;
