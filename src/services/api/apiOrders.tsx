import {
    GET_ORDER_INFO
} from "../actions/actionsOrder";
import {baseUrl} from "./url";
import {AppDispatch, AppThunk} from "../../index";

function checkResponse(res: Response) {
    if (res.ok) {
        return res.json();
    }
    return Promise.reject(`Ошибка ${res.status}`);
}

export function getOrderInfo(id: string[], token: string): AppThunk {
    return function (dispatch: AppDispatch) {
        fetch(`${baseUrl}/orders`, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: token
            },
            body: JSON.stringify({ingredients: id}),
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


