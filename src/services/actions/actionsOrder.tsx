export const GET_ORDER_INFO: 'GET_ORDER_INFO' = "GET_ORDER_INFO";
export const CLOSE_MODAL: 'CLOSE_MODAL' = "CLOSE_MODAL";


export type TActionsOrder =
    | IOrderInfo
    | ICloseModal

export interface IOrderInfo {
    readonly type: typeof GET_ORDER_INFO;
    open: boolean;
    order: string
};

export interface ICloseModal {
    readonly type: typeof CLOSE_MODAL;
};
