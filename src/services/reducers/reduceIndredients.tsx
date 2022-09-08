import {
    GET_INGREDIENTS_LIST,
    GET_INGREDIENT_INFO,
    ADD_PRODUCT_CONSTRUCTOR,
    GET_TOTAL_PRICE,
    DELETE_CONSTRUCTOR_ITEM,
    COUNTER_CONSTRUCTOR_ITEM,
    CHANGE_PRODUCT_CONSTRUCTOR, TActionsIngredients,
} from "../actions/actionsIngredients";
import {ingredientTypeReq} from "../utils/types";

type TInitialState = {
    ingredientList: {
        ingredientData: Array<ingredientTypeReq>,
        load: boolean,
        counter?: any[],
    },
    ingredientListConstructor: {
        buns: any[],
        other: any[],
    },
    totalPrice: string,
    modalInfo: {
        open: boolean,
        title: string,
        kind: string,
        ingredientItem: any[]
    },
}
export const initialState: TInitialState = {
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
};


export const reduceIngredients = (state = initialState, action: TActionsIngredients): TInitialState => {
    switch (action.type) {
        case GET_INGREDIENTS_LIST: {
            return {
                ...state,
                ingredientList: {
                    load: true,
                    ingredientData: [...action.dataProduct],
                },
            };
        }
        case GET_INGREDIENT_INFO: {
            return {
                ...state,
                modalInfo: {
                    open: true,
                    title: action.title,
                    kind: "detail",
                    ingredientItem: [
                        ...state.ingredientList.ingredientData,
                        // @ts-ignore
                    ].filter((item) => item._id === action.id),
                },
            };
        }
        case ADD_PRODUCT_CONSTRUCTOR: {
            if (action.kind === "bun") {
                return {
                    ...state,
                    ingredientListConstructor: {
                        ...state.ingredientListConstructor,
                        buns: [
                            [...state.ingredientList.ingredientData].filter(
                                // @ts-ignore
                                (item) => item._id === action.id
                            )[0],
                        ],
                    },
                };
            } else {
                let newOther = [...state.ingredientList.ingredientData]
                    .map((a) => {
                        // @ts-ignore
                        return {...a};
                    })
                    .filter((item) => item._id === action.id)[0];
                newOther.newId = action.newId;

                return {
                    ...state,
                    ingredientListConstructor: {
                        ...state.ingredientListConstructor,
                        other: [
                            ...state.ingredientListConstructor.other,
                            newOther,
                        ],
                    },
                };
            }
        }
        case GET_TOTAL_PRICE: {
            const priceOther = state.ingredientListConstructor.other.reduce(
                (acc, el: { price: number }) => {
                    return el.price + acc;
                },
                0
            );
            let priceBuns: number = 0;
            if (state.ingredientListConstructor.buns.length) {
                // @ts-ignore
                priceBuns = 2 * state.ingredientListConstructor.buns[0].price;
            }

            return {
                ...state,
                totalPrice: priceOther + priceBuns,
            };
        }
        case COUNTER_CONSTRUCTOR_ITEM: {
            return {
                ...state,
                ingredientList: {
                    ...state.ingredientList,
                    counter: action.count,
                },
            };
        }
        case DELETE_CONSTRUCTOR_ITEM: {
            return {
                ...state,
                ingredientListConstructor: {
                    ...state.ingredientListConstructor,
                    other: [...state.ingredientListConstructor.other]
                        .slice(0, action.index)
                        .concat(
                            [...state.ingredientListConstructor.other].slice(
                                action.index + 1
                            )
                        ),
                },
            };
        }
        case CHANGE_PRODUCT_CONSTRUCTOR: {
            const ingredients = [...state.ingredientListConstructor.other];
            if (action.dragIndex && action.hoverIndex) {
                ingredients.splice(action.dragIndex, 1);
                ingredients.splice(
                    action.hoverIndex,
                    0,
                    [...state.ingredientListConstructor.other].splice(
                        action.dragIndex,
                        1
                    )[0]
                );
            }
            return {
                ...state,
                ingredientListConstructor: {
                    ...state.ingredientListConstructor,
                    other: ingredients,
                },
            };
        }
        default: {
            return state;
        }
    }
};
