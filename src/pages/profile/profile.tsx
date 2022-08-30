import styles from "./profile.module.css";
import {NavLink, Redirect, useLocation} from "react-router-dom";
import {Input} from "@ya.praktikum/react-developer-burger-ui-components";
import React, {useEffect, useRef, useState} from "react";
import {getToken, getUser, logout, updateUser} from "../../services/api/apiAuth";
import {getCookie} from "../../services/utils";
import {IButton, IPrevent, ITargetValue} from "../../services/utils/types";
import {Button as ButtonUI} from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/button";
import {WS_CONNECTION_CLOSE, WS_CONNECTION_START} from "../../services/actions/actionsWs";
import {FeedBlock} from "../../components/feed-block/feed-block";
import {useDispatch, useSelector} from "../../index";
import {IS_AUTH} from "../../services/actions/actionsAuthorization";
import {wsUrlAuth} from "../../services/api/url";

type TFormState = {
    name: string
    login: string
    password: string
}

export const Profile = () => {
    const {pathname} = useLocation();
    const [form, setValue] = useState<TFormState>({name: "", login: "", password: ""});
    const [changeFieldName, setChangeFieldName] = useState(false);
    const [changeFieldLogin, setChangeFieldLogin] = useState(false);
    const [changeFieldPass, setChangeFieldPass] = useState(false);
    const [changeAll, setChangeAll] = useState(false);
    const Button: React.FC<IButton> = ButtonUI;
    const {loader, user, userAuth} = useSelector(
        (store) => store.reduceAuthorization
    );
    const dispatch = useDispatch();
    const inputRefName = useRef<HTMLInputElement | null>(null);
    const inputRefLogin = useRef<HTMLInputElement | null>(null);
    const inputRefPassword = useRef<HTMLInputElement | null>(null);
    const accessToken: string | undefined = getCookie('accessToken')
    const logOut = (e: IPrevent) => {
        e.preventDefault();
        return dispatch(logout(getCookie("token")));
    };
    const saveUserInfo = (e: IPrevent) => {
        e.preventDefault();
        return dispatch(updateUser(form));
    };
    const onChange = (e: ITargetValue) => {
        setValue({...form, [e.target.name]: e.target.value});
        setChangeAll(true);
    };
    const onBlur = () => {
        setChangeFieldName(false);
        setChangeFieldLogin(false);
        setChangeFieldPass(false);
    };

    const onEditFocus = (inputRef: any) => {
        setTimeout(() => inputRef?.current?.focus(), 0);
    }

    const cancelClick = (e: IPrevent) => {
        e.preventDefault();

        setValue({...form, name: user.name, login: user.email});
        setChangeAll(false);

    };
    const editNameClick = () => {
        setChangeFieldName(!changeFieldName);
        onEditFocus(inputRefName)
    };
    const editLoginClick = () => {
        setChangeFieldLogin(!changeFieldLogin);
        onEditFocus(inputRefLogin)
    };
    const editPassClick = () => {
        setChangeFieldPass(!changeFieldPass);
        onEditFocus(inputRefPassword)
    };

    useEffect(() => {
        setValue({...form, name: user.name, login: user.email});
        if (accessToken) {
            let authToken = accessToken.split('Bearer ')[1];
            dispatch(getUser(accessToken));
            dispatch({
                type: WS_CONNECTION_START,
                url: `${wsUrlAuth}${authToken}`
            });
            return () => {
                dispatch({type: WS_CONNECTION_CLOSE});
            }
        } else {
            console.log('needRefresh')
            dispatch(getToken());
            // @ts-ignore
            loader && dispatch(getUser(accessToken));
        }

    }, [user.name, user.email, accessToken]);
    useEffect(() => {
        dispatch(getToken())
        dispatch({
            type: IS_AUTH,
        });

    }, []);
    if (!userAuth) {
        return (
            <Redirect
                to={
                    "/login"
                }
            />
        );
    }
    return (
        <div className={[styles.container, "container"].join(" ")}>
            <nav className={styles.nav}>
                <div className={styles.menu}>
                    <NavLink
                        to={"/profile"}
                        className={[
                            styles.menuLink,
                            "text text_type_main-medium text_color_inactive",
                        ].join(" ")}
                        activeClassName={
                            pathname === "/profile"
                                ? styles.menuLink_active
                                : undefined
                        }
                    >
                        Профиль
                    </NavLink>
                    <NavLink
                        to={"/profile/orders"}
                        className={[
                            styles.menuLink,
                            "text text_type_main-medium text_color_inactive",
                        ].join(" ")}
                        activeClassName={styles.menuLink_active}
                    >
                        История заказов
                    </NavLink>
                    <button
                        className={[
                            styles.menuLink,
                            "text text_type_main-medium text_color_inactive",
                        ].join(" ")}
                        onClick={logOut}
                    >
                        Выход
                    </button>
                </div>
                <p
                    className={[
                        styles.description,
                        "text text_type_main-default",
                    ].join(" ")}
                >
                    В этом разделе вы можете изменить свои персональные данные
                </p>
            </nav>
            {pathname === "/profile" && (
                <form action="" className={styles.form} onSubmit={saveUserInfo}>
                    <Input
                        value={form.name}
                        type={"text"}
                        name={"name"}
                        placeholder={"Имя"}
                        disabled={!changeFieldName}
                        onChange={onChange}
                        icon={changeFieldName ? "CloseIcon" : "EditIcon"}
                        onIconClick={() => {
                            editNameClick();
                        }}
                        size={"default"}
                        onBlur={onBlur}
                        ref={inputRefName}
                    />
                    <Input
                        value={form.login}
                        type={"text"}
                        name={"login"}
                        placeholder={"Логин"}
                        disabled={!changeFieldLogin}
                        onChange={onChange}
                        icon={changeFieldLogin ? "CloseIcon" : "EditIcon"}
                        onIconClick={editLoginClick}
                        onBlur={onBlur}
                        ref={inputRefLogin}
                    />
                    <Input
                        value={form.password}
                        type={"password"}
                        name={"password"}
                        placeholder={"Пароль"}
                        disabled={!changeFieldPass}
                        onChange={onChange}
                        icon={changeFieldPass ? "CloseIcon" : "EditIcon"}
                        onIconClick={editPassClick}
                        onBlur={onBlur}
                        ref={inputRefPassword}
                    />
                    {changeAll && (
                        <div className={styles.activity}>
                            <div
                                className={
                                    "linkBlue text text_type_main-default"
                                }
                                onClick={cancelClick}
                            >
                                Отмена
                            </div>
                            <Button>Сохранить</Button>
                        </div>
                    )}
                </form>
            )}
            {pathname === "/profile/orders" && (
                <div className={[
                    styles.orders,
                    "scrollCustom",
                ].join(" ")}>
                    <FeedBlock path={'profile/orders'} title={"История заказов"}/>
                </div>
            )}
        </div>
    );
};


