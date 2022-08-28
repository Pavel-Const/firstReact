import {getCookie} from "../utils";

let authToken
if (getCookie('accessToken')) {
    const accessToken: string | undefined = getCookie('accessToken')
    // @ts-ignore
    authToken = accessToken.split('Bearer ')[1];
}

export const baseUrl = "https://norma.nomoreparties.space/api";
export const wsUrl = "wss://norma.nomoreparties.space/orders/all";
export const wsUrlAuth = `wss://norma.nomoreparties.space/orders?token=${authToken}`;



