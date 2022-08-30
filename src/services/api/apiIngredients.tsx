import {
    GET_INGREDIENTS_LIST,
} from "../actions/actionsIngredients";
import {baseUrl} from "./url";
import {IForms, ingredientTypeReq} from "../utils/types";
import {AppDispatch, AppThunk} from "../../index";
import App from "../../components/app/App";

function checkResponse(res: Response) {
    if (res.ok) {
        return res.json();
    }
    return Promise.reject(`Ошибка ${res.status}`);
}

export function getFeed(): AppThunk {
    return function (dispatch: AppDispatch) {
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

