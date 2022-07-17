import styles from './authorization.module.css'
import {Button, Input} from "@ya.praktikum/react-developer-burger-ui-components";
import {Link} from "react-router-dom";
import {useState} from "react";
import {passwordNew} from "../../services/api/api";

export const ResetPassword = () => {
    const [form, setValue] = useState({pin: '', password: ''});
    const [visiblePassword, setVisible] = useState(false);
    const onChange = e => {
        setValue({...form, [e.target.name]: e.target.value});
    };
    const onIconClick = () => {
        setVisible(!visiblePassword)
    }
    const onClick = (e) => {
        e.preventDefault()
        passwordNew(form)
    }
    return (
        <div className={[styles.container, 'container'].join(' ')}>
            <form action="" className={styles.form}>
                <h1 className={'text text_type_main-medium'}>Восстановление пароля</h1>
                <Input value={form.password} type={visiblePassword ? 'text' : 'password'} name={'password'}
                       placeholder={'Введите новый пароль'}
                       onChange={onChange} icon={visiblePassword ? 'HideIcon' : 'ShowIcon'} onIconClick={onIconClick}/>
                <Input value={form.pin} type={'text'} name={'pin'} placeholder={'Введите код из письма'}
                       onChange={onChange}/>

                <Button type="primary" size="medium" onClick={onClick}>
                    Сохранить
                </Button>
            </form>
            <div className={styles.box}>
                <p className={'text text_type_main-default text_color_inactive'}>Вспомнили пароль? <Link
                    to={'/login'}><span className={'linkBlue'}>Войти</span></Link></p>
            </div>
        </div>
    )
}