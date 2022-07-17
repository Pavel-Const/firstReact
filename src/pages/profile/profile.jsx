import styles from './profile.module.css'
import {NavLink} from "react-router-dom";
import {Button, Input} from "@ya.praktikum/react-developer-burger-ui-components";
import {useState} from "react";

export const Profile = () => {
    const [form, setValue] = useState({name: '', login: '', password: ''});
    const [changeField, setChangeField] = useState(false);
    const onChange = e => {
        setValue({...form, [e.target.name]: e.target.value});
    };
    const onIconClick = () => {
        setChangeField(!changeField)
    }

    return (
        <div className={[styles.container, 'container'].join(' ')}>
            <nav className={styles.nav}>
                <div className={styles.menu}>
                    <NavLink to={'/profile'}
                             className={[styles.menuLink, 'text text_type_main-medium text_color_inactive'].join(' ')}>
                        Профиль
                    </NavLink>
                    <NavLink to={'/profile/orders'}
                             className={[styles.menuLink, 'text text_type_main-medium text_color_inactive'].join(' ')}>
                        История заказов
                    </NavLink>
                    <span className={[styles.menuLink, 'text text_type_main-medium text_color_inactive'].join(' ')}>
                        Выход
                    </span>
                </div>
                <p className={[styles.description, 'text text_type_main-default'].join(' ')}>В этом
                    разделе вы можете
                    изменить свои персональные данные</p>
            </nav>
            <form action="" className={styles.form}>
                <Input value={form.name}
                       type={'text'} name={'name'}
                       placeholder={'Имя'} disabled={!changeField}
                       onChange={onChange} icon={changeField ? 'CloseIcon' : 'EditIcon'}
                       onIconClick={onIconClick}/>
                <Input value={form.login} type={'text'} name={'name'}
                       placeholder={'Логин'} disabled={!changeField}
                       onChange={onChange}
                       icon={changeField ? 'CloseIcon' : 'EditIcon'}
                       onIconClick={onIconClick}/>
                <Input value={form.name}
                       type={"password"} name={'password'}
                       placeholder={'Пароль'}
                       disabled={!changeField}
                       onChange={onChange}
                       icon={changeField ? 'CloseIcon' : 'EditIcon'}
                       onIconClick={onIconClick}/>
                <div className={styles.activity}>
                    <button className={'linkBlue text text_type_main-default'}>
                        Отмена
                    </button>
                    <Button>
                        Сохранить
                    </Button>
                </div>
            </form>
        </div>)
}