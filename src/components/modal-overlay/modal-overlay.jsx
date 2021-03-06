import modalOverlayStyles from "./modal-overlay.module.css";
import PropTypes from "prop-types";
import React from "react";

export const ModalOverlay = (props) => (
    <div className={modalOverlayStyles.main} onClick={props.closeModal}></div>
);

ModalOverlay.propTypes = {
    closeModal: PropTypes.func.isRequired,
};
