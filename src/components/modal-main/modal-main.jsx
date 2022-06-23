import React from "react";
import ReactDOM from "react-dom";
import { OrderDetails } from "../order-detail/order-detail";
import { IngredientDetails } from "../ingredient-detail/ingredient-detail";
import { ModalOverlay } from "../modal-overlay/modal-overlay";
import { Modal } from "../modal/modal";
import PropTypes from "prop-types";

const modalRoot = document.getElementById("root-modal");

class ModalMain extends React.Component {
    render() {
        return ReactDOM.createPortal(
            <>
                <Modal
                    type={this.props.type}
                    closeModal={this.props.closeModal}
                    product={this.props.product}
                >
                    {this.props.type === "order" && <OrderDetails />}
                    {this.props.type === "detail" && (
                        <IngredientDetails product={this.props.product} />
                    )}
                </Modal>
                <ModalOverlay closeModal={this.props.closeModal} />
            </>,
            modalRoot
        );
    }
}
ModalMain.propTypes = {
    type: PropTypes.string.isRequired,
};
export default ModalMain;
