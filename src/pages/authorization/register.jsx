import styles from "./authorization.module.css";
import {
    Button,
    Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, Redirect, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../../services/api/api";
import { IS_AUTH } from "../../services/actions/actionsAuthorization";

export const Register = () => {
    const [form, setValue] = useState({ name: "", email: "", password: "" });
    const [visiblePassword, setVisible] = useState(false);
    const dispatch = useDispatch();
    const { userAuth } = useSelector((store) => store.reduceAuthorization);
    const { state } = useLocation();
    const onChange = (e) => {
        setValue({ ...form, [e.target.name]: e.target.value });
    };
    const onIconClick = () => {
        setVisible(!visiblePassword);
    };
    const registration = (e) => {
        e.preventDefault();
        return dispatch(register(form));
    };
    useEffect(() => {
        dispatch({
            type: IS_AUTH,
        });
    }, []);
    if (userAuth) {
        return <Redirect to={state?.from || "/"} />;
    }
    return (
        <div className={[styles.container, "container"].join(" ")}>
            <form
                action="src/pages/authorization/register"
                className={styles.form}
                onSubmit={registration}
            >
                <h1 className={"text text_type_main-medium"}>Регистрация</h1>
                <Input
                    value={form.name}
                    type={"text"}
                    name={"name"}
                    placeholder={"Имя"}
                    onChange={onChange}
                />
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
                    Зарегистрироваться
                </Button>
            </form>
            <div className={styles.box}>
                <p
                    className={
                        "text text_type_main-default text_color_inactive"
                    }
                >
                    Уже зарегистрированы?{" "}
                    <Link to={"/login"}>
                        <span className={"linkBlue"}>Войти</span>
                    </Link>
                </p>
            </div>
        </div>
    );
};
