import styles from "./authorization.module.css";
import {Input} from "@ya.praktikum/react-developer-burger-ui-components";
import {Link, Redirect, useLocation} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {login} from "../../services/api/apiAuth";
import {IS_AUTH} from "../../services/actions/actionsAuthorization";
import {IButton, IPrevent, ITargetValue} from "../../services/utils/types";
import {Button as ButtonUI} from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/button";
import {useDispatch, useSelector} from "../../index";

type TFormState = {
    email: string
    password: string
}

interface ILocation {
    from?: {
        pathname?: string
    }
}

export const Login = () => {
    const [form, setValue] = useState<TFormState>({email: "", password: ""});
    const [visiblePassword, setVisible] = useState(false);
    const dispatch = useDispatch();
    const {userAuth} = useSelector((store) => store.reduceAuthorization);
    const location = useLocation<ILocation>();
    const Button: React.FC<IButton> = ButtonUI;
    const onChange = (e: ITargetValue) => {
        setValue({...form, [e.target.name]: e.target.value});
    };
    const onIconClick = () => {
        setVisible(!visiblePassword);
    };
    const logIn = (e: IPrevent) => {
        e.preventDefault();
        return dispatch(login(form));
    };
    useEffect(() => {
        dispatch({
            type: IS_AUTH,
        });
    }, []);
    if (userAuth) {
        return (
            <Redirect
                to={
                    location.state?.from?.pathname ?? "/"
                }
            />
        );
    }
    return (
        <div className={[styles.container, "container"].join(" ")}>
            <form action="" className={styles.form} onSubmit={logIn}>
                <h1 className={"text text_type_main-medium"}>Вход</h1>
                <Input
                    value={form.email}
                    type={"email"}
                    name={"email"}
                    placeholder={"E-mail"}
                    onChange={onChange}
                />
                <Input
                    value={form.password}
                    type={visiblePassword ? "text" : "password"}
                    name={"password"}
                    placeholder={"Пароль"}
                    onChange={onChange}
                    icon={visiblePassword ? "HideIcon" : "ShowIcon"}
                    onIconClick={onIconClick}
                />
                <Button type="primary" size="medium">
                    Войти
                </Button>
            </form>
            <div className={styles.box}>
                <p
                    className={
                        "text text_type_main-default text_color_inactive"
                    }
                >
                    Вы — новый пользователь?{" "}
                    <Link to={"/register"}>
                        <span className={"linkBlue"}>Зарегистрироваться</span>
                    </Link>
                </p>
                <p
                    className={
                        "text text_type_main-default text_color_inactive"
                    }
                >
                    Забыли пароль?{" "}
                    <Link to={"/forgot-password"}>
                        <span className={"linkBlue"}>Восстановить пароль</span>
                    </Link>
                </p>
            </div>
        </div>
    );
};
