export const GET_INGREDIENTS_LIST: 'GET_INGREDIENTS_LIST' = "GET_INGREDIENTS_LIST";
export const DELETE_CONSTRUCTOR_ITEM: 'DELETE_CONSTRUCTOR_ITEM' = "DELETE_CONSTRUCTOR_ITEM";
export const COUNTER_CONSTRUCTOR_ITEM: 'COUNTER_CONSTRUCTOR_ITEM' = "COUNTER_CONSTRUCTOR_ITEM";
export const GET_INGREDIENT_INFO: 'GET_INGREDIENT_INFO' = "GET_INGREDIENT_INFO";
export const ADD_PRODUCT_CONSTRUCTOR: 'ADD_PRODUCT_CONSTRUCTOR' = "ADD_PRODUCT_CONSTRUCTOR";
export const CHANGE_PRODUCT_CONSTRUCTOR: 'CHANGE_PRODUCT_CONSTRUCTOR' = "CHANGE_PRODUCT_CONSTRUCTOR";
export const GET_TOTAL_PRICE: 'GET_TOTAL_PRICE' = "GET_TOTAL_PRICE";


export type TActionsIngredients =
    | IIngredientsGet
    | IIngredientsInfo
    | IProductConstructorAction
    | ITotalPrice
    | IConstructorItem
    | IDeleteConstructor
    | IChangeConstructor

export interface IIngredientsGet {
    readonly type: typeof GET_INGREDIENTS_LIST;
    dataProduct: [];
};

export interface IIngredientsInfo {
    readonly type: typeof GET_INGREDIENT_INFO;
    title: string;
    id: string;
};

export interface IProductConstructorAction {
    kind: string;
    readonly type: typeof ADD_PRODUCT_CONSTRUCTOR;
    id: string;
    newId: string;
};

export interface ITotalPrice {
    readonly type: typeof GET_TOTAL_PRICE;
};

export interface IConstructorItem {
    readonly type: typeof COUNTER_CONSTRUCTOR_ITEM;
    count: any;
};

export interface IDeleteConstructor {
    readonly type: typeof DELETE_CONSTRUCTOR_ITEM;
    index: number;
};

export interface IChangeConstructor {
    readonly type: typeof CHANGE_PRODUCT_CONSTRUCTOR;
    dragIndex: number | undefined;
    hoverIndex: number | undefined;
};