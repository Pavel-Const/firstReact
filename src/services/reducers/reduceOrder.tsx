import {GET_ORDER_INFO, CLOSE_MODAL} from "../actions/actionsOrder";

const initialState = {
    modalInfo: {
        open: false,
        kind: "",
        title: "",
        ingredientItem: {},
        order: "",
    },
};

export interface IOrderAction {
    type: string;
    open: boolean;
    order: number
};

export const reduceOrder = (state = initialState, action: IOrderAction) => {
    switch (action.type) {
        case GET_ORDER_INFO: {
            return {
                ...state,
                modalInfo: {
                    open: action.open,
                    title: "",
                    kind: "order",
                    order: action.order,
                },
            };
        }
        case CLOSE_MODAL: {
            return {
                ...state,
                modalInfo: {
                    open: false,
                    ingredientItem: {},
                    order: "",
                },
            };
        }
        default: {
            return state;
        }
    }
};
