import {
    AUTH_LOGIN,
    AUTH_LOGOUT,
    AUTH_REGISTER,
    AUTH_TOKEN,
    GET_USER_INFO, RESET_PASSWORD, UPDATE_USER_INFO
} from "../actions/actionsAuthorization";
import {
    GET_INGREDIENTS_LIST,
} from "../actions/actionsIngredients";
import {
    GET_ORDER_INFO
} from "../actions/actionsOrder";

import {baseUrl} from "./url";
import {deleteCookie, getCookie, setCookie} from "../utils";
import {IForms, ingredientTypeReq} from "../utils/types";

function checkResponse(res: { ok: any; json: () => any; status: any; }) {
    if (res.ok) {
        return res.json();
    }
    return Promise.reject(`Ошибка ${res.status}`);
}

export function getFeed() {
    return function (dispatch: (arg0: { type: string; dataProduct: Array<ingredientTypeReq>; }) => void) {
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

export function getOrderInfo(id: string[], token: string) {
    return function (dispatch: (arg0: { type: string; order: number; open: boolean; }) => void) {
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

export function passwordReset(form: IForms) {
    return function (dispatch: (arg0: { type: string; }) => void) {
        fetch(`${baseUrl}/password-reset`, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({'email': form.email}),
        })
            .then(checkResponse)
            .then((json) => {
                if (json.success) {
                    dispatch({
                        type: RESET_PASSWORD
                    })
                } else {
                    alert(json.message);
                }
            })
            .catch((error) => {
                alert(error);
            });
    }
}

export function passwordNew(form: IForms) {
    fetch(`${baseUrl}/password-reset/reset`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            'password': form.password,
            'token': form.pin
        }),
    })
        .then(checkResponse)
        .then((json) => {
            if (json.success) {
                console.log(json)
            } else {
                alert(json.message);
            }
        })
        .catch((error) => {
            alert(error);
        });
}

export function register(form: IForms) {
    return function (dispatch: (arg0: { type: string; name: string; email: string; token: string; }) => void) {
        fetch(`${baseUrl}/auth/register`, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                "email": form.email,
                "password": form.password,
                "name": form.name
            }),
        })
            .then(checkResponse)
            .then((json) => {
                if (json.success) {
                    setCookie('token', json.refreshToken);
                    setCookie('accessToken', json.accessToken);
                    dispatch({
                        type: AUTH_REGISTER,
                        name: json.user.name,
                        email: json.user.email,
                        token: json.accessToken,
                    });
                } else {
                    console.log(json.message);
                }
            })
            .catch((error) => {
                alert(error);
            });
    }
}

export function login(form: IForms) {
    return function (dispatch: (arg0: { type: string; name: string; email: string; token: string; }) => void) {
        fetch(`${baseUrl}/auth/login`, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                "email": form.email,
                "password": form.password,
            }),
        })
            .then(checkResponse)
            .then((json) => {
                if (json.success) {
                    setCookie('token', json.refreshToken);
                    setCookie('accessToken', json.accessToken);
                    dispatch({
                        type: AUTH_LOGIN,
                        name: json.user.name,
                        email: json.user.email,
                        token: json.accessToken,
                    });
                } else {
                    console.log(json.message);
                }
            })
            .catch((error) => {
                alert(error);
            });
    }
}

export function logout(token: string | undefined) {
    return function (dispatch: (arg0: { type: string; }) => void) {
        fetch(`${baseUrl}/auth/logout`, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                "token": token
            }),
        })
            .then(checkResponse)
            .then((json) => {
                if (json.success) {
                    deleteCookie('token');
                    dispatch({
                        type: AUTH_LOGOUT,
                    });
                } else {
                    console.log(json.message);
                }
            })
            .catch((error) => {
                alert(error);
            });
    }
}

export const getToken = (token: string | undefined) => {
    return async function (dispatch: (arg0: { type: string; token: string; }) => void) {
        await fetch(`${baseUrl}/auth/token`, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                "token": getCookie('token')
            }),
        })
            .then(checkResponse)
            .then((json) => {
                if (json.success) {
                    setCookie('token', json.refreshToken);
                    setCookie('accessToken', json.accessToken);
                    dispatch({
                        type: AUTH_TOKEN,
                        token: json.accessToken,
                    });
                } else {
                    console.log(json.message);
                }
            })
            .catch((error) => {
                alert(error);
            });
    }
}

// export const fetchWithRefresh = async (url, options) => {
//     try {
//         const res = await fetch(url, options);
//
//         return await checkResponse(res);
//     } catch (err) {
//         if (err.message === 'jwt expired') {
//             const {refreshToken, accessToken} = await getToken();
//             saveTokens(refreshToken, accessToken);
//
//             options.headers.authorization = accessToken;
//
//             const res = await fetch(url, options);
//
//             return await checkResponse(res);
//         } else {
//             return Promise.reject(err);
//         }
//     }
// }

export function getUser(token: string) {
    return function (dispatch: (arg0: { type: string; name: string; email: string; }) => void) {
        fetch(`${baseUrl}/auth/user`, {
            method: "GET",
            // @ts-ignore
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: token
            },

        })
            .then(checkResponse)
            .then((json) => {
                if (json.success) {
                    dispatch({
                        type: GET_USER_INFO,
                        name: json.user.name,
                        email: json.user.email,
                    });
                } else {
                    console.log(json.message);
                }
            })
            .catch((error) => {
                alert(error);
            });
    }
}

export function updateUser(form: IForms & { password: string | number }) {
    return function (dispatch: (arg0: { type: string; name: string; email: string; }) => void) {
        fetch(`${baseUrl}/auth/user`, {
            method: "PATCH",
            // @ts-ignore
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: getCookie('accessToken')
            },
            body: JSON.stringify({
                "email": form.login,
                "password": form.password,
                "name": form.name
            }),
        })
            .then(checkResponse)
            .then((json) => {
                if (json.success) {
                    dispatch({
                        type: UPDATE_USER_INFO,
                        name: json.user.name,
                        email: json.user.email,
                    });
                } else {
                    console.log(json.message);
                }
            })
            .catch((error) => {
                alert(error);
            });
    }
}
