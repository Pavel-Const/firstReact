import {
    AUTH_REGISTER,
    AUTH_LOGIN,
    AUTH_LOGOUT,
    AUTH_TOKEN,
    GET_USER_INFO,
    UPDATE_USER_INFO,
    IS_AUTH,
    RESET_PASSWORD, TActionsAuthorization,
} from "../actions/actionsAuthorization";
import {getCookie} from "../utils";

type TUserState = {
    user: {
        name: string,
        email: string,
    },
    accessToken: string,
    loader?: boolean,
    userAuth?: string | boolean,
    passReset?: boolean,
};
export const initialState: TUserState = {
    user: {
        name: "",
        email: "",
    },
    accessToken: '',
    loader: false,
    userAuth: false,
    passReset: false,
};


export const reduceAuthorization = (state = initialState, action: TActionsAuthorization): TUserState => {
    switch (action.type) {
        case AUTH_REGISTER:
            return {
                ...state,
                user: {
                    name: action.name,
                    email: action.email,
                },
                accessToken: action.token,
            };
        case AUTH_LOGIN:
            return {
                ...state,
                user: {
                    name: action.name,
                    email: action.email,
                },
                accessToken: action.token,
                userAuth: true,
            };
        case AUTH_LOGOUT:
            return {
                ...state,
                userAuth: false
            };
        case AUTH_TOKEN:
            return {
                ...state,
                accessToken: action.token,
                loader: true,
            };
        case GET_USER_INFO:
            return {
                ...state,
                user: {
                    name: action.name,
                    email: action.email,
                },
            };
        case UPDATE_USER_INFO:
            return {
                ...state,
                user: {
                    name: action.name,
                    email: action.email,
                },
                userAuth: true
            };
        case IS_AUTH:
            if (getCookie("token")) {
                return {
                    ...state,
                    userAuth: true,
                };
            } else {
                return {
                    ...state,
                    userAuth: false,
                };
            }
        case RESET_PASSWORD:
            return {
                ...state,
                passReset: true,
            };

        default: {
            return state;
        }
    }
};
