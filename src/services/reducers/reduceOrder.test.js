import * as types from '../actions/actionsOrder'
import {reduceOrder, initialState} from "./reduceOrder";

describe('ORDER reducer', () => {
    it('should return the initial state', () => {
        expect(reduceOrder(undefined, {})).toEqual(
            {
                ...initialState
            }
        )
    })

    it('should handle GET_ORDER_INFO', () => {
        expect(
            reduceOrder({}, {
                type: types.GET_ORDER_INFO,
                open: true,
                order: '666',
            })
        ).toEqual(
            {
                modalInfo: {
                    open: true,
                    title: "",
                    kind: "order",
                    order: '666',
                }
            }
        )
    })
    it('should handle CLOSE_MODAL', () => {
        expect(
            reduceOrder({}, {
                type: types.CLOSE_MODAL,
                open: false,
                order: '',
                ingredientItem: {},

            })
        ).toEqual(
            {
                modalInfo: {
                    open: false,
                    order: '',
                    ingredientItem: {},
                }
            }
        )
    })
})