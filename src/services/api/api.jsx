// Наш первый thunk
import {
    GET_INGREDIENTS_LIST,
    GET_CONSTRUCTOR_LIST,
    GET_INGREDIENT_INFO,
    DELETE_INGREDIENT_INFO,
    GET_ORDER_INFO,
} from "../actions/actions";

import { urlIngredients, urlOrder } from "./url";

export function getFeed() {
    // Воспользуемся первым аргументом из усилителя redux-thunk - dispatch
    return function (dispatch) {
        fetch(urlIngredients)
            .then((res) => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(`Ошибка ${res.status}`);
            })
            .then((json) => {
                if (json.success) {
                    dispatch({
                        type: GET_INGREDIENTS_LIST,
                        dataProduct: json.data,
                    });
                } else {
                    alert(json.message);
                }
            })
            .catch((error) => {
                alert(error);
            });
    };
}
export function getOrderInfo(id) {
    // Воспользуемся первым аргументом из усилителя redux-thunk - dispatch
    return function (dispatch) {
        fetch(urlOrder, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ ingredients: id }),
        })
            .then((res) => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(`Ошибка ${res.status}`);
            })
            .then((json) => {
                if (json.success) {
                    dispatch({
                        type: GET_ORDER_INFO,
                        order: json.order.number,
                        open: true,
                    });
                } else {
                    alert(json.message);
                }
            })
            .catch((error) => {
                alert(error);
            });
    };
}
