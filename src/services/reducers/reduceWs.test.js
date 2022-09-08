import {reducerWs, initialState} from "./reducerWs";
import {
    ADD_PRODUCT_CONSTRUCTOR, CHANGE_PRODUCT_CONSTRUCTOR, COUNTER_CONSTRUCTOR_ITEM, DELETE_CONSTRUCTOR_ITEM,
    GET_INGREDIENT_INFO,
    GET_INGREDIENTS_LIST,
    GET_TOTAL_PRICE
} from "../actions/actionsIngredients";
import {WS_CONNECTION_CLOSE, WS_CONNECTION_ERROR, WS_CONNECTION_SUCCESS, WS_GET_MESSAGE} from "../actions/actionsWs";

describe('WS reducer', () => {
    it('should return the initial state', () => {
        expect(reducerWs(undefined, {})).toEqual({
            wsConnected: false,
            getData: false,
            orders: [],
            total: null,
            totalToday: null
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