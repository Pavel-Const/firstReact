// socketMiddleware.ts
import type {Middleware, MiddlewareAPI} from 'redux';

//import type {AppActions, AppDispatch, RootState} from '../types';

export const socketMiddleware = (wsActions: { onClose: string; onError: string; wsInit: string; onOpen: string; onMessage: string }): Middleware => {
    return ((store: MiddlewareAPI) => {
        let socket: WebSocket | null = null;

        return next => (action: any) => {
            const {dispatch} = store;
            const {type, url} = action;
            const {wsInit, onOpen, onClose, onError, onMessage} = wsActions
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