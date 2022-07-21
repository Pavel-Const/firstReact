import styles from "./authorization.module.css";
import {
    Button,
    Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, Redirect, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../services/api/api";
import { IS_AUTH } from "../../services/actions/actionsAuthorization";

export const Login = () => {
    const [form, setValue] = useState({ email: "", password: "" });
    const [visiblePassword, setVisible] = useState(false);
    const dispatch = useDispatch();
    const { userAuth } = useSelector((store) => store.reduceAuthorization);
    const location = useLocation();
    const onChange = (e) => {
        setValue({ ...form, [e.target.name]: e.target.value });
    };
    const onIconClick = () => {
        setVisible(!visiblePassword);
    };
    const logIn = (e) => {
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
                to={location.state ? location.state.from.pathname : "/"}
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
