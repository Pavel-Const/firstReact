import styles from './authorization.module.css'
import {Button, Input} from "@ya.praktikum/react-developer-burger-ui-components";
import {Link, Redirect, useHistory} from "react-router-dom";
import {useState, useEffect} from "react";
import {passwordReset} from "../../services/api/api";
import {useDispatch, useSelector} from "react-redux";
import {IS_AUTH} from "../../services/actions/actions";

export const ForgotPassword = () => {
    const [form, setValue] = useState({email: ''});
    const dispatch = useDispatch();
    const {userAuth, passReset} = useSelector((store) => store.getIngredients);
    const history = useHistory();
    const onChange = e => {
        setValue({...form, [e.target.name]: e.target.value});
    };
    const onClick = (e) => {
        e.preventDefault()
        dispatch(passwordReset(form))
    }
    useEffect(() => {
        dispatch({
            type: IS_AUTH
        })
    }, [])
    useEffect(() => {
        if (passReset) {
            history.replace({pathname: '/reset-password'});
        }
    }, [passReset])
    if (userAuth) {
        return (<Redirect
            to={'/'}
        />);
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