import * as types from '../actions/actionsIngredients'
import {reduceOrder} from "./reduceOrder";
import {CLOSE_MODAL, GET_ORDER_INFO} from "../actions/actionsOrder";
import {reduceIngredients, initialState} from "./reduceIndredients";
import {
    ADD_PRODUCT_CONSTRUCTOR, CHANGE_PRODUCT_CONSTRUCTOR, COUNTER_CONSTRUCTOR_ITEM, DELETE_CONSTRUCTOR_ITEM,
    GET_INGREDIENT_INFO,
    GET_INGREDIENTS_LIST,
    GET_TOTAL_PRICE
} from "../actions/actionsIngredients";

describe('INGREDIENTS reducer', () => {
    it('should return the initial state', () => {
        expect(reduceIngredients(undefined, {})).toEqual({
            ingredientList: {
                ingredientData: [], load: false, counter: [],
            }, ingredientListConstructor: {
                buns: [], other: [],
            }, totalPrice: "", modalInfo: {
                open: false, title: '', kind: "", ingredientItem: []
            },
        })
    })

    it('should handle GET_TOTAL_PRICE', () => {
        const actions = {
            type: GET_TOTAL_PRICE,
        }
        expect(reduceIngredients(initialState, actions)).toEqual({
            ingredientList: {
                ingredientData: [],
                load: false,
                counter: [],
            },
            ingredientListConstructor: {
                buns: [],
                other: [],
            },
            totalPrice: 0,
            modalInfo: {
                open: false,
                title: '',
                kind: "",
                ingredientItem: []
            },
        })
    })
    it('should handle DELETE_CONSTRUCTOR_ITEM', () => {
        const actions = {
            type: DELETE_CONSTRUCTOR_ITEM,
        }
        expect(reduceIngredients(initialState, actions)).toEqual({
            ingredientList: {
                ingredientData: [],
                load: false,
                counter: [],
            },
            ingredientListConstructor: {
                buns: [],
                other: [],
            },
            totalPrice: "",
            modalInfo: {
                open: false,
                title: '',
                kind: "",
                ingredientItem: []
            },
        })
    })
    it('should handle CHANGE_PRODUCT_CONSTRUCTOR', () => {
        const actions = {
            type: CHANGE_PRODUCT_CONSTRUCTOR,
        }
        expect(reduceIngredients(initialState, actions)).toEqual({
            ingredientList: {
                ingredientData: [],
                load: false,
                counter: [],
            },
            ingredientListConstructor: {
                buns: [],
                other: [],
            },
            totalPrice: "",
            modalInfo: {
                open: false,
                title: '',
                kind: "",
                ingredientItem: []
            },
        })
    })
    it('should handle COUNTER_CONSTRUCTOR_ITEM', () => {
        const actions = {
            type: COUNTER_CONSTRUCTOR_ITEM,
        }
        expect(reduceIngredients(initialState, actions)).toEqual({
            ingredientList: {
                ingredientData: [],
                load: false,
                counter: undefined,
            },
            ingredientListConstructor: {
                buns: [],
                other: [],
            },
            totalPrice: "",
            modalInfo: {
                open: false,
                title: '',
                kind: "",
                ingredientItem: []
            },
        })
    })
    it('should handle GET_INGREDIENT_INFO', () => {
        const actions = {
            type: GET_INGREDIENT_INFO,

        }
        expect(reduceIngredients(initialState, actions)).toEqual({
            ingredientList: {
                ingredientData: [],
                load: false,
                counter: [],
            },
            ingredientListConstructor: {
                buns: [],
                other: [],
            },
            totalPrice: "",
            modalInfo: {
                open: true,
                title: undefined,
                kind: "detail",
                ingredientItem: []
            },
        })
    })
})