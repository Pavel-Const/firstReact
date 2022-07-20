import {
    AUTH_LOGIN,
    AUTH_LOGOUT,
    AUTH_REGISTER,
    AUTH_TOKEN,
    GET_INGREDIENTS_LIST,
    GET_ORDER_INFO, GET_USER_INFO, RESET_PASSWORD, UPDATE_USER_INFO
} from "../actions/actions";

import {baseUrl} from "./url";
import {deleteCookie, setCookie} from "../utils";

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

export function passwordReset(form) {
    return function (dispatch) {
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

export function passwordNew(form) {

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

export function register(form) {
    return function (dispatch) {
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
                console.log(json)
                if (json.success) {
                    setCookie('token', json.refreshToken);
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

export function login(form) {
    return function (dispatch) {
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

export function logout(token) {
    return function (dispatch) {
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

export const getToken = (token) => {
    return async function (dispatch) {
        await fetch(`${baseUrl}/auth/token`, {
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
                    setCookie('token', json.refreshToken);
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

export function getUser(token) {
    return function (dispatch) {
        fetch(`${baseUrl}/auth/user`, {
            method: "GET",
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

export function updateUser(token, form) {
    return function (dispatch) {
        fetch(`${baseUrl}/auth/user`, {
            method: "PATCH",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: token
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
