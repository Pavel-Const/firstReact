// socketMiddleware.ts
import type {Middleware, MiddlewareAPI} from 'redux';
import {AppDispatch, RootState, wsActions as wsActionsObject} from "../../index";


export const socketMiddleware = (wsActions: typeof wsActionsObject): Middleware => {
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