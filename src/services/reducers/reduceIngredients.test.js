import {reduceIngredients, initialState} from "./reduceIndredients";
import {
    CHANGE_PRODUCT_CONSTRUCTOR, COUNTER_CONSTRUCTOR_ITEM, DELETE_CONSTRUCTOR_ITEM,
    GET_INGREDIENT_INFO,
    GET_INGREDIENTS_LIST,
    GET_TOTAL_PRICE
} from "../actions/actionsIngredients";

describe('INGREDIENTS reducer', () => {
    it('should return the initial state', () => {
        expect(reduceIngredients(undefined, {})).toEqual({
            ...initialState
        })
    })

    it('should handle GET_TOTAL_PRICE', () => {
        const actions = {
            type: GET_TOTAL_PRICE,
        }
        expect(reduceIngredients(initialState, actions)).toEqual({
            ...initialState,
            totalPrice: 0
        })
    })
    it('should handle DELETE_CONSTRUCTOR_ITEM', () => {
        const actions = {
            type: DELETE_CONSTRUCTOR_ITEM,
        }
        expect(reduceIngredients(initialState, actions)).toEqual({
            ...initialState
        })
    })
    it('should handle CHANGE_PRODUCT_CONSTRUCTOR', () => {
        const actions = {
            type: CHANGE_PRODUCT_CONSTRUCTOR,
        }
        expect(reduceIngredients(initialState, actions)).toEqual({
            ...initialState
        })
    })
    it('should handle COUNTER_CONSTRUCTOR_ITEM', () => {
        const actions = {
            type: COUNTER_CONSTRUCTOR_ITEM,
        }
        expect(reduceIngredients(initialState, actions)).toEqual({
            ...initialState,
            ingredientList: {
                counter: undefined,
                ingredientData: [],
                load: false,

            }
        })
    })
    it('should handle GET_INGREDIENT_INFO', () => {
        const actions = {
            type: GET_INGREDIENT_INFO,
        }
        expect(reduceIngredients(initialState, actions)).toEqual({
            ...initialState,
            modalInfo: {
                open: true,
                title: undefined,
                kind: "detail",
                ingredientItem: []
            },
        })
    })
})