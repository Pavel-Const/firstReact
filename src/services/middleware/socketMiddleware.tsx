// socketMiddleware.ts
import type {Middleware, MiddlewareAPI} from 'redux';
import {AppDispatch, RootState} from "../../index";
import {
    WS_CONNECTION_CLOSE,
    WS_CONNECTION_ERROR,
    WS_CONNECTION_START,
    WS_CONNECTION_SUCCESS,
    WS_GET_MESSAGE
} from "../actions/actionsWs";

//import type {AppActions, AppDispatch, RootState} from '../types';

export const socketMiddleware = (): Middleware => {
    return ((store: MiddlewareAPI<AppDispatch, RootState>) => {
        let socket: WebSocket | null = null;

        return next => (action) => {
            const {dispatch} = store;
            const {type, url} = action;
            if (type === WS_CONNECTION_START) {
                socket = new WebSocket(url)
            }
            if (socket) {
                socket.onopen = event => {
                    dispatch({type: WS_CONNECTION_SUCCESS, payload: event});
                };
                socket.onerror = event => {
                    dispatch({type: WS_CONNECTION_ERROR, payload: event});
                };
                socket.onmessage = event => {
                    const {data} = event;
                    const parsedData = JSON.parse(data);
                    const {success, ...restParsedData} = parsedData;
                    dispatch({type: WS_GET_MESSAGE, payload: restParsedData});
                };
                socket.onclose = event => {
                    dispatch({type: WS_CONNECTION_CLOSE, payload: event});
                };

            }

            next(action);
        };
    }) as Middleware;
};