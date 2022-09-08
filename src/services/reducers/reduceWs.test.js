import {reducerWs, initialState} from "./reducerWs";

import {WS_CONNECTION_CLOSE, WS_CONNECTION_ERROR, WS_CONNECTION_SUCCESS, WS_GET_MESSAGE} from "../actions/actionsWs";

describe('WS reducer', () => {
    it('should return the initial state', () => {
        expect(reducerWs(undefined, {})).toEqual({
            ...initialState
        })
    })

    it('should handle WS_CONNECTION_SUCCESS', () => {
        const actions = {
            type: WS_CONNECTION_SUCCESS,
        }
        expect(reducerWs({}, actions)).toEqual({
            wsConnected: true
        })
    })
    it('should handle WS_CONNECTION_ERROR', () => {
        const actions = {
            type: WS_CONNECTION_ERROR,
        }
        expect(reducerWs({}, actions)).toEqual({
            wsConnected: false
        })
    })
    it('should handle WS_CONNECTION_CLOSE', () => {
        const actions = {
            type: WS_CONNECTION_CLOSE,
        }
        expect(reducerWs({}, actions)).toEqual({
            wsConnected: false
        })
    })
    it('should handle WS_GET_MESSAGE', () => {
        const actions = {
            type: WS_GET_MESSAGE,
            payload: {
                orders: [1, 2, 3],
                total: 666,
                totalToday: 666,
            }
        }
        expect(reducerWs(initialState, actions)).toEqual({
            wsConnected: false,
            getData: true,
            orders: [1, 2, 3],
            total: 666,
            totalToday: 666
        })
    })

})