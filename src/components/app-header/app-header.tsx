import React from "react";
import headerStyles from "./header.module.css";
import HeaderButton from "../header-button/header-btn";
import {
    BurgerIcon,
    ListIcon,
    Logo,
    ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import {Link, useLocation} from "react-router-dom";

function AppHeader() {
    const {pathname} = useLocation();
    return (
        <header className={headerStyles.header}>
            <div className={headerStyles.container}>
                <div className={headerStyles.block}>
                    <Link to={"/"}>
                        <HeaderButton
                            styles={
                                pathname === "/"
                                    ? "text text_type_main-default"
                                    : "text text_type_main-default  text_color_inactive"
                            }
                        >
                            <BurgerIcon
                                type={
                                    pathname === "/" ? "primary" : "secondary"
                                }
                            />{" "}
                            Конструктор
                        </HeaderButton>
                    </Link>
                    <Link to={"/feed"}>
                        <HeaderButton
                            styles={
                                pathname === "/feed"
                                    ? "text text_type_main-default"
                                    : "text text_type_main-default  text_color_inactive"
                            }
                        >
                            <ListIcon
                                type={
                                    pathname === "/feed" ? "primary" : "secondary"
                                }
                            />{" "}
                            Лента заказов
                        </HeaderButton>
                    </Link>
                </div>
                <Link to={'/'} className={headerStyles.logo}>
                    <Logo/>
                </Link>
                <Link to={"/profile"}>
                    <HeaderButton
                        styles={
                            pathname === "/profile"
                                ? "text text_type_main-default"
                                : "text text_type_main-default  text_color_inactive"
                        }
                    >
                        <ProfileIcon
                            type={
                                pathname === "/profile"
                                    ? "primary"
                                    : "secondary"
                            }
                        />
                        Личный кабинет
                    </HeaderButton>
                </Link>
            </div>
        </header>
    );
}

export default AppHeader;
