import {
    AUTH_LOGIN,
    AUTH_LOGOUT,
    AUTH_REGISTER,
    AUTH_TOKEN,
    GET_USER_INFO, RESET_PASSWORD, UPDATE_USER_INFO
} from "../actions/actionsAuthorization";
import {baseUrl} from "./url";
import {deleteCookie, getCookie, setCookie} from "../utils";
import {IForms} from "../utils/types";
import {AppDispatch, AppThunk} from "../../index";
import App from "../../components/app/App";

function checkResponse(res: Response) {
    if (res.ok) {
        return res.json();
    }
    return Promise.reject(`Ошибка ${res.status}`);
}

export const passwordReset = (form: IForms): AppThunk => {
    return function (dispatch: AppDispatch) {
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

export const passwordNew = (form: IForms) => {
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

export function register(form: IForms): AppThunk {
    return function (dispatch: AppDispatch) {
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

export function login(form: IForms): AppThunk {
    return function (dispatch: AppDispatch) {
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

export function logout(token: string | undefined): AppThunk {
    return function (dispatch: AppDispatch) {
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
                    deleteCookie('accessToken');
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

export const getToken = (): AppThunk => {
    return async function (dispatch: AppDispatch) {
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
                alert(error.message);
            });
    }
}
// const saveTokens = (refreshToken: string, accessToken: string | number | boolean | null) => {
//     setCookie('accessToken', accessToken);
//     setCookie('token', refreshToken);
// }
// export const fetchWithRefresh = async (url: RequestInfo | URL, options: RequestInit | undefined) => {
//     try {
//         const res = await fetch(url, options);
//
//         return await checkResponse(res);
//     } catch (err) {
//         // @ts-ignore
//         if (err.message === 'jwt expired') {
//             // @ts-ignore
//             const {refreshToken, accessToken} = await getToken();
//             saveTokens(refreshToken, accessToken);
//
//             // @ts-ignore
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

export function getUser(token: string): AppThunk {
    return function (dispatch: AppDispatch) {
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
                }
            })
            .catch((error) => {
                console.log(error)
            });
    }
}

export function updateUser(form: IForms & { password: string | number }): AppThunk {
    return function (dispatch: AppDispatch) {
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
