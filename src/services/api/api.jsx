// Наш первый thunk
import { GET_INGREDIENTS_LIST, GET_ORDER_INFO } from "../actions/actions";

import { baseUrl } from "./url";

function checkResponse(res) {
    if (res.ok) {
        return res.json();
    }
    return Promise.reject(`Ошибка ${res.status}`);
}

export function getFeed() {
    return function (dispatch) {
        fetch(`${baseUrl}/ingredients`)
            .then(checkResponse)
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
    return function (dispatch) {
        fetch(`${baseUrl}/orders`, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ ingredients: id }),
        })
            .then(checkResponse)
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
