import styles from './profile.module.css'
import {NavLink, useLocation} from "react-router-dom";
import {Button, Input} from "@ya.praktikum/react-developer-burger-ui-components";
import {useEffect, useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getToken, getUser, logout, updateUser} from "../../services/api/api";
import {getCookie} from "../../services/utils";
import {IS_AUTH} from "../../services/actions/actions";

export const Profile = () => {
    const {pathname} = useLocation()

    const [form, setValue] = useState({name: '', login: '', password: ''});
    const [changeFieldName, setChangeFieldName] = useState(false);
    const [changeFieldLogin, setChangeFieldLogin] = useState(false);
    const [changeFieldPass, setChangeFieldPass] = useState(false);
    const [changeAll, setChangeAll] = useState(false)
    const {accessToken, loader, user, userAuth} = useSelector((store) => store.getIngredients);
    const dispatch = useDispatch();
    const inputRefName = useRef(null)
    const inputRefLogin = useRef(null)
    const inputRefPassword = useRef(null)
    const logOut = (e) => {
        e.preventDefault()
        return dispatch(logout(getCookie('token')))
    }
    const saveUserInfo = (e) => {
        e.preventDefault()
        return dispatch(updateUser(accessToken, form))
    }
    const onChange = e => {
        setValue({...form, [e.target.name]: e.target.value});
        setChangeAll(true)
    };
    const onBlur = () => {
        setChangeFieldName(false)
        setChangeFieldLogin(false)
        setChangeFieldPass(false)
    }
    const cancelClick = (e) => {
        e.preventDefault()
        setValue({...form, name: user.name, login: user.email});
        setChangeAll(false)
    }
    const editNameClick = (e) => {
        setChangeFieldName(!changeFieldName)
        setTimeout(() => inputRefName.current.focus(), 0)
    }
    const editLoginClick = () => {
        setChangeFieldLogin(!changeFieldLogin)
        setTimeout(() => inputRefLogin.current.focus(), 0)

    }
    const editPassClick = () => {
        setChangeFieldPass(!changeFieldPass)
        setTimeout(() => inputRefPassword.current.focus(), 0)

    }
    useEffect(() => {
        if (userAuth) {
            if (accessToken) {
                dispatch(getUser(accessToken))
            } else {
                dispatch(getToken(getCookie('token')));
                loader && dispatch(getUser(accessToken))
            }
            setValue({...form, name: user.name, login: user.email});
        }
    }, [accessToken, loader, user.name, user.email]);
    useEffect(() => {
        dispatch({
            type: IS_AUTH
        })
    }, [])

    return (<div className={[styles.container, 'container'].join(' ')}>
        <nav className={styles.nav}>
            <div className={styles.menu}>
                <NavLink to={'/profile'}
                         className={[styles.menuLink, 'text text_type_main-medium text_color_inactive'].join(' ')}
                         activeClassName={pathname === '/profile' && styles.menuLink_active}>
                    Профиль
                </NavLink>
                <NavLink to={'/profile/orders'}
                         className={[styles.menuLink, 'text text_type_main-medium text_color_inactive'].join(' ')}
                         activeClassName={styles.menuLink_active}>
                    История заказов
                </NavLink>
                <button className={[styles.menuLink, 'text text_type_main-medium text_color_inactive'].join(' ')}
                        onClick={logOut}>
                    Выход
                </button>
            </div>
            <p className={[styles.description, 'text text_type_main-default'].join(' ')}>В этом
                разделе вы можете
                изменить свои персональные данные</p>
        </nav>
        {pathname === '/profile' && <form action="" className={styles.form}>
            <Input value={form.name}
                   type={'text'} name={'name'}
                   placeholder={'Имя'} disabled={!changeFieldName}
                   onChange={onChange} icon={changeFieldName ? 'CloseIcon' : 'EditIcon'}
                   onIconClick={() => {
                       editNameClick()
                   }}
                   size={'default'}
                   onBlur={onBlur}
                   ref={inputRefName}/>
            <Input value={form.login} type={'text'} name={'login'}
                   placeholder={'Логин'} disabled={!changeFieldLogin}
                   onChange={onChange}
                   icon={changeFieldLogin ? 'CloseIcon' : 'EditIcon'}
                   onIconClick={editLoginClick}
                   onBlur={onBlur}
                   ref={inputRefLogin}/>
            <Input value={form.password}
                   type={"password"} name={'password'}
                   placeholder={'Пароль'}
                   disabled={!changeFieldPass}
                   onChange={onChange}
                   icon={changeFieldPass ? 'CloseIcon' : 'EditIcon'}
                   onIconClick={editPassClick}
                   onBlur={onBlur}
                   ref={inputRefPassword}/>
            {
                changeAll &&
                <div className={styles.activity}>
                    <button className={'linkBlue text text_type_main-default'} onClick={cancelClick}>
                        Отмена
                    </button>
                    <Button onClick={saveUserInfo}>
                        Сохранить
                    </Button>
                </div>
            }

        </form>}

    </div>)
}