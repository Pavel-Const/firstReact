import styles from './authorization.module.css'
import {Button, Input} from "@ya.praktikum/react-developer-burger-ui-components";
import {Link} from "react-router-dom";
import {useState} from "react";
import {passwordReset} from "../../services/api/api";

export const ForgotPassword = () => {
    const [form, setValue] = useState({email: ''});

    const onChange = e => {
        setValue({...form, [e.target.name]: e.target.value});
    };
    const onClick = (e) => {
        e.preventDefault()
        passwordReset(form)
    }
    return (
        <div className={[styles.container, 'container'].join(' ')}>
            <form action="" className={styles.form}>
                <h1 className={'text text_type_main-medium'}>Восстановление пароля</h1>
                <Input value={form.email} type={'email'} name={'email'} placeholder={'Укажите e-mail'}
                       onChange={onChange}/>
                <Button type="primary" size="medium" onClick={onClick}>
                    Восстановить
                </Button>
            </form>
            <div className={styles.box}>
                <p className={'text text_type_main-default text_color_inactive'}>Вспомнили пароль? <Link
                    to={'/login'}><span className={'linkBlue'}>Войти</span></Link>
                </p>
            </div>
        </div>
    )
}