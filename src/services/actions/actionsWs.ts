import {CLOSE_MODAL} from "./actionsOrder";

export const WS_CONNECTION_START: 'WS_CONNECTION_START' = "WS_CONNECTION_START";
export const WS_CONNECTION_SUCCESS: 'WS_CONNECTION_SUCCESS' = "WS_CONNECTION_SUCCESS";
export const WS_GET_MESSAGE: 'WS_GET_MESSAGE' = "WS_GET_MESSAGE";
export const WS_CONNECTION_ERROR: 'WS_CONNECTION_ERROR' = "WS_CONNECTION_ERROR";
export const WS_CONNECTION_CLOSE: 'WS_CONNECTION_CLOSE' = "WS_CONNECTION_CLOSE";

// export const wsActions = {
//     wsInit: WS_CONNECTION_START,
//     onOpen: WS_CONNECTION_SUCCESS,
//     onClose: WS_CONNECTION_CLOSE,
//     onError: WS_CONNECTION_ERROR,
//     onMessage: WS_GET_MESSAGE
// };

export type TActionsWs =
    | IConnectionStart
    | IConnectionSuccess
    | IGetMessage
    | IConnectionError
    | IConnectionClose

export interface IConnectionStart {
    readonly type: typeof WS_CONNECTION_START;
};

export interface IConnectionSuccess {
    readonly type: typeof WS_CONNECTION_SUCCESS;
};

export interface IGetMessage {
    readonly type: typeof WS_GET_MESSAGE;
    payload: {
        orders: [];
        total: number;
        totalToday: number;
    }
};

export interface IConnectionError {
    readonly type: typeof WS_CONNECTION_ERROR;
};

export interface IConnectionClose {
    readonly type: typeof WS_CONNECTION_CLOSE;
};