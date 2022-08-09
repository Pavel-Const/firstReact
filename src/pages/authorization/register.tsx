import styles from "./authorization.module.css";
import {

    Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import {Link, Redirect, useLocation} from "react-router-dom";
import React, {useState, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {register} from "../../services/api/api";
import {IS_AUTH} from "../../services/actions/actionsAuthorization";
import {IButton, IPrevent, ITargetValue} from "../../services/utils/types";
import {Button as ButtonUI} from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/button";

type TFormState = {
    name: string
    email: string
    password: string
}

interface ILocation {
    from?: {
        pathname?: string
    }
}

export const Register = () => {
    const [form, setValue] = useState<TFormState>({name: "", email: "", password: ""});
    const [visiblePassword, setVisible] = useState(false);
    const dispatch: any = useDispatch();
    const {userAuth} = useSelector((store: any) => store.reduceAuthorization);
    const location = useLocation<ILocation>();
    const Button: React.FC<IButton> = ButtonUI;

    const onChange = (e: ITargetValue) => {
        setValue({...form, [e.target.name]: e.target.value});
    };
    const onIconClick = () => {
        setVisible(!visiblePassword);
    };
    const registration = (e: IPrevent) => {
        e.preventDefault();
        return dispatch(register(form));
    };
    useEffect(() => {
        dispatch({
            type: IS_AUTH,
        });
    }, []);
    if (userAuth) {
        return <Redirect to={location.state?.from?.pathname ?? "/"}/>;
    }
    return (
        <div className={[styles.container, "container"].join(" ")}>
            <form
                action="src/pages/authorization/register.tsx"
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
