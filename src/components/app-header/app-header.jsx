import React from "react";
import headerStyles from "./header.module.css";
import HeaderButton from "../header-button/header-btn";
import {
    Logo,
    BurgerIcon,
    ListIcon,
    ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

function AppHeader() {
    return (
        <header className={headerStyles.header}>
            <div className={headerStyles.container}>
                <div className={headerStyles.block}>
                    <HeaderButton styles={"text text_type_main-default"}>
                        <BurgerIcon type="primary" /> Конструктор
                    </HeaderButton>
                    <HeaderButton
                        styles={
                            "text text_type_main-default text_color_inactive"
                        }
                    >
                        <ListIcon type="secondary" />
                        Лента заказов
                    </HeaderButton>
                </div>
                <div className={headerStyles.logo}>
                    <Logo />
                </div>
                <HeaderButton
                    styles={"text text_type_main-default text_color_inactive"}
                >
                    <ProfileIcon type="secondary" />
                    Личный кабинет
                </HeaderButton>
            </div>
        </header>
    );
}

export default AppHeader;
