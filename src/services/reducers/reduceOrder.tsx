import {GET_ORDER_INFO, CLOSE_MODAL, TActionsOrder} from "../actions/actionsOrder";

type TInitialState = {
    modalInfo: {
        open: boolean,
        kind?: string,
        title?: string,
        ingredientItem?: {},
        order: string,
    },
}

export const initialState: TInitialState = {
    modalInfo: {
        open: false,
        kind: "",
        title: "",
        ingredientItem: {},
        order: "",
    },
};


export const reduceOrder = (state = initialState, action: TActionsOrder): TInitialState => {
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
