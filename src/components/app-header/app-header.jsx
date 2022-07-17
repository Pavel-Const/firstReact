import React from "react";
import headerStyles from "./header.module.css";
import HeaderButton from "../header-button/header-btn";
import {BurgerIcon, ListIcon, Logo, ProfileIcon,} from "@ya.praktikum/react-developer-burger-ui-components";
import {Link} from "react-router-dom";

function AppHeader() {
    return (
        <header className={headerStyles.header}>
            <div className={headerStyles.container}>
                <div className={headerStyles.block}>
                    <Link to={'/'}>
                        <HeaderButton styles={"text text_type_main-default"}>
                            <BurgerIcon type="primary"/> Конструктор
                        </HeaderButton>
                    </Link>
                    <HeaderButton
                        styles={
                            "text text_type_main-default text_color_inactive"
                        }
                    >
                        <ListIcon type="secondary"/>
                        Лента заказов
                    </HeaderButton>
                </div>
                <div className={headerStyles.logo}>
                    <Logo/>
                </div>
                <Link to={'/profile'}>
                    <HeaderButton
                        styles={"text text_type_main-default text_color_inactive"}
                    >
                        <ProfileIcon type="secondary"/>
                        Личный кабинет
                    </HeaderButton>
                </Link>

            </div>
        </header>
    );
}

export default AppHeader;
