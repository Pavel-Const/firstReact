import styles from "./authorization.module.css";
import {
    Button,
    Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import {Link, Redirect} from "react-router-dom";
import React, {useState, useEffect} from "react";
import {passwordNew} from "../../services/api/api";
import {useDispatch, useSelector} from "react-redux";
import {IS_AUTH} from "../../services/actions/actionsAuthorization";
import {IButton, IPrevent, ITargetValue} from "../../services/utils/types";
import {Button as ButtonUI} from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/button";

export const ResetPassword = () => {
    const Button: React.FC<IButton> = ButtonUI;

    const [form, setValue] = useState({pin: "", password: ""});
    const [visiblePassword, setVisible] = useState(false);
    const dispatch: any = useDispatch();
    const {userAuth, passReset} = useSelector(
        (store: any) => store.reduceAuthorization
    );
    const onChange = (e: ITargetValue) => {
        setValue({...form, [e.target.name]: e.target.value});
    };
    const onIconClick = () => {
        setVisible(!visiblePassword);
    };
    const onSubmit = (e: IPrevent) => {
        e.preventDefault();
        passwordNew(form);
    };
    useEffect(() => {
        dispatch({
            type: IS_AUTH,
        });
    }, []);
    if (userAuth) {
        return <Redirect to={"/"}/>;
    } else if (!passReset) {
        return <Redirect to={"/forgot-password"}/>;
    }
    return (
        <div className={[styles.container, "container"].join(" ")}>
            <form action="" className={styles.form} onSubmit={onSubmit}>
                <h1 className={"text text_type_main-medium"}>
                    Восстановление пароля
                </h1>
                <Input
                    value={form.password}
                    type={visiblePassword ? "text" : "password"}
                    name={"password"}
                    placeholder={"Введите новый пароль"}
                    onChange={onChange}
                    icon={visiblePassword ? "HideIcon" : "ShowIcon"}
                    onIconClick={onIconClick}
                />
                <Input
                    value={form.pin}
                    type={"text"}
                    name={"pin"}
                    placeholder={"Введите код из письма"}
                    onChange={onChange}
                />

                <Button type="primary" size="medium">
                    Сохранить
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
