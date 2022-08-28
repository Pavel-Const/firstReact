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

export const socketMiddleware = (wsActions: { onClose: "WS_CONNECTION_CLOSE"; onError: "WS_CONNECTION_ERROR"; wsInit: "WS_CONNECTION_START"; onOpen: "WS_CONNECTION_SUCCESS"; onMessage: "WS_GET_MESSAGE" }): Middleware => {
    return ((store: MiddlewareAPI<AppDispatch, RootState>) => {
        let socket: WebSocket | null = null;

        return next => (action) => {
            const {wsInit, onOpen, onClose, onError, onMessage} = wsActions
            const {dispatch} = store;
            const {type, url} = action;
            if (type === wsInit) {
                socket = new WebSocket(url)
            }
            if (socket) {
                socket.onopen = event => {
                    dispatch({type: onOpen, payload: event});
                };
                socket.onerror = event => {
                    dispatch({type: onError, payload: event});
                };
                socket.onmessage = event => {
                    const {data} = event;
                    const parsedData = JSON.parse(data);
                    const {success, ...restParsedData} = parsedData;
                    dispatch({type: onMessage, payload: restParsedData});
                };
                socket.onclose = event => {
                    dispatch({type: onClose, payload: event});
                };

            }

            next(action);
        };
    }) as Middleware;
};