import modalOverlayStyles from "./modal-overlay.module.css";
import PropTypes from "prop-types";
import React, {FC} from "react";

interface IProps {
    closeModal: () => void;
}

export const ModalOverlay: FC<IProps> = (props) => (
    <div className={modalOverlayStyles.main} onClick={props.closeModal}></div>
);

ModalOverlay.propTypes = {
    closeModal: PropTypes.func.isRequired,
};
