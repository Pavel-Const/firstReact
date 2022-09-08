import * as types from '../actions/actionsAuthorization'
import {reduceAuthorization, initialState} from "./reduceAuthorization";


describe('AUTH reducer', () => {
    it('should return the initial state', () => {
        expect(reduceAuthorization(undefined, {})).toEqual(
            {
                ...initialState
            }
        )
    })

    it('should AUTH_REGISTER', () => {
        expect(
            reduceAuthorization({}, {
                type: types.AUTH_REGISTER,
            })
        ).toEqual(
            {
                user: {},
            }
        )
    })
    it('should AUTH_LOGIN', () => {
        expect(
            reduceAuthorization({}, {
                type: types.AUTH_LOGIN,

            })
        ).toEqual(
            {
                user: {},
                userAuth: true,
            }
        )
    })
    it('should AUTH_LOGOUT', () => {
        expect(
            reduceAuthorization({}, {
                type: types.AUTH_LOGOUT,

            })
        ).toEqual(
            {
                userAuth: false
            }
        )
    })
    it('should AUTH_TOKEN', () => {
        expect(
            reduceAuthorization({}, {
                type: types.AUTH_TOKEN,

            })
        ).toEqual(
            {
                loader: true,
            }
        )
    })
    it('should GET_USER_INFO', () => {
        expect(
            reduceAuthorization({}, {
                type: types.GET_USER_INFO,

            })
        ).toEqual(
            {
                user: {}
            }
        )
    })
    it('should UPDATE_USER_INFO', () => {
        expect(
            reduceAuthorization({}, {
                type: types.UPDATE_USER_INFO,

            })
        ).toEqual(
            {
                user: {},
                userAuth: true
            }
        )
    })
    it('should IS_AUTH', () => {
        expect(
            reduceAuthorization({}, {
                type: types.IS_AUTH,

            })
        ).toEqual(
            {
                userAuth: false
            }
        )
    })
    it('should RESET_PASSWORD', () => {
        expect(
            reduceAuthorization({}, {
                type: types.RESET_PASSWORD,

            })
        ).toEqual(
            {
                passReset: true,
            }
        )
    })
})