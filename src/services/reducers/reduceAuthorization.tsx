import {
    AUTH_REGISTER,
    AUTH_LOGIN,
    AUTH_LOGOUT,
    AUTH_TOKEN,
    GET_USER_INFO,
    UPDATE_USER_INFO,
    IS_AUTH,
    RESET_PASSWORD,
} from "../actions/actionsAuthorization";
import {getCookie} from "../utils";

const initialState = {
    user: {
        name: "",
        email: "",
    },
    accessToken: null,
    loader: false,
    userAuth: "",
    passReset: false,
};


export interface IUserAction {
    type: string,
    name: string,
    email: string,
    token: number,
};

export interface IUserState {
    user?: {
        name: string,
        email: string,
    },
    accessToken?: number | null,
    loader?: boolean,
    userAuth?: string | boolean,
    passReset?: boolean,
};

export const reduceAuthorization = (state = initialState, action: IUserAction): IUserState => {
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
                user: {
                    name: "",
                    email: "",
                },
                accessToken: null,
                userAuth: false,
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
