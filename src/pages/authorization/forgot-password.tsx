import styles from "./authorization.module.css";
import {
    Button as ButtonUI,
    Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import {Link, Redirect, useHistory} from "react-router-dom";
import React, {useState, useEffect, SyntheticEvent} from "react";
import {passwordReset} from "../../services/api/api";
import {useDispatch, useSelector} from "react-redux";
import {IS_AUTH} from "../../services/actions/actionsAuthorization";
import {IButton, IPrevent, ITargetValue} from "../../services/utils/types";

export const ForgotPassword = () => {
    const Button: React.FC<IButton> = ButtonUI;
    const [form, setValue] = useState({email: ""});
    const dispatch: any = useDispatch();
    const {userAuth, passReset} = useSelector(
        (store: any) => store.reduceAuthorization
    );
    const history = useHistory();
    const onChange = (e: ITargetValue) => {
        setValue({...form, [e.target.name]: e.target.value});
    };
    const onSubmit = (e: IPrevent) => {
        e.preventDefault();
        dispatch(passwordReset(form));
    };
    useEffect(() => {
        dispatch({
            type: IS_AUTH,
        });
    }, []);
    useEffect(() => {
        if (passReset) {
            history.replace({pathname: "/reset-password"});
        }
    }, [passReset]);
    if (userAuth) {
        return <Redirect to={"/"}/>;
    }
    return (
        <div className={[styles.container, "container"].join(" ")}>
            <form action="" className={styles.form} onSubmit={onSubmit}>
                <h1 className={"text text_type_main-medium"}>
                    Восстановление пароля
                </h1>
                <Input
                    value={form.email}
                    type={"email"}
                    name={"email"}
                    placeholder={"Укажите e-mail"}
                    onChange={onChange}
                />
                <Button type="primary" size="medium">
                    Восстановить
                </Button>
            </form>
            <div className={styles.box}>
                <p
                    className={
                        "text text_type_main-default text_color_inactive"
                    }
                >
                    Вспомнили пароль?{" "}
                    <Link to={"/login"}>
                        <span className={"linkBlue"}>Войти</span>
                    </Link>
                </p>
            </div>
        </div>
    );
};
