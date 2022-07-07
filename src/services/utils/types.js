import PropTypes from "prop-types";

export const ingredientType = {
    src: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    type: PropTypes.string,
};
