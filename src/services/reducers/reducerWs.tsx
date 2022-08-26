import {
    WS_CONNECTION_SUCCESS,
    WS_CONNECTION_ERROR,
    WS_CONNECTION_CLOSE,
    WS_GET_MESSAGE
} from '../actions/actionsWs';

const initialState = {
    wsConnected: false,
    getData: false,
    orders: [],
    total: null,
    totalToday: null
};

export const reducerWs = (state = initialState, action: { type: any; payload: any; }) => {
    switch (action.type) {
        case WS_CONNECTION_SUCCESS:
            console.log('connect')
            return {
                ...state,
                wsConnected: true
            };

        case WS_CONNECTION_ERROR:
            console.log('error')
            return {
                ...state,
                wsConnected: false
            };

        case WS_CONNECTION_CLOSE:
            console.log('close')
            return {
                ...state,
                wsConnected: false
            };

        case WS_GET_MESSAGE:
            return {
                ...state,
                getData: true,
                orders: [...action.payload.orders],
                total: action.payload.total,
                totalToday: action.payload.totalToday,
            };

        default:
            return state;
    }
};