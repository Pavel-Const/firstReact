export const AUTH_REGISTER: 'AUTH_REGISTER' = "AUTH_REGISTER";
export const AUTH_LOGIN: 'AUTH_LOGIN' = "AUTH_LOGIN";
export const AUTH_LOGOUT: 'AUTH_LOGOUT' = "AUTH_LOGOUT";
export const AUTH_TOKEN: 'AUTH_TOKEN' = "AUTH_TOKEN";
export const GET_USER_INFO: 'GET_USER_INFO' = "GET_USER_INFO";
export const UPDATE_USER_INFO: 'UPDATE_USER_INFO' = "UPDATE_USER_INFO";
export const IS_AUTH: 'IS_AUTH' = 'IS_AUTH'
export const RESET_PASSWORD: 'RESET_PASSWORD' = 'RESET_PASSWORD'

export type TActionsAuthorization =
    | IUserRegister
    | IUserLogin
    | IUserLogout
    | IUserToken
    | IUserInfo
    | IUserUpdate
    | IUserAuth
    | IUserReset

export interface IUserRegister {
    readonly type: typeof AUTH_REGISTER;
    name: string,
    email: string,
    token: string,
};

export interface IUserLogin {
    readonly type: typeof AUTH_LOGIN;
    name: string,
    email: string,
    token: string,
};

export interface IUserLogout {
    readonly type: typeof AUTH_LOGOUT;

};

export interface IUserToken {
    readonly type: typeof AUTH_TOKEN;
    token: string,
};

export interface IUserInfo {
    readonly type: typeof GET_USER_INFO;
    name: string,
    email: string,
};

export interface IUserUpdate {
    readonly type: typeof UPDATE_USER_INFO;
    name: string,
    email: string,
};

export interface IUserAuth {
    readonly type: typeof IS_AUTH;

};

export interface IUserReset {
    readonly type: typeof RESET_PASSWORD;
};