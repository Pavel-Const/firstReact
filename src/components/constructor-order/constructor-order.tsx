import React, {SyntheticEvent, useEffect} from "react";
import styles from "./constructor-order.module.css";
import {useDispatch, useSelector} from "react-redux";
import {getOrderInfo} from "../../services/api/api";
import {
    CurrencyIcon,
    Button as ButtonUI
} from "@ya.praktikum/react-developer-burger-ui-components";
import {GET_TOTAL_PRICE} from "../../services/actions/actionsIngredients";
import {useHistory} from "react-router-dom";

export const ConstructorOrder = (props: { id: Array<string> }) => {
    const {totalPrice, ingredientListConstructor} = useSelector(
        (store: any) => store.reduceIngredients
    );
    const {userAuth} = useSelector((store: any) => store.reduceAuthorization);
    const history = useHistory();
    const dispatch: any = useDispatch();
    const Button: React.FC<{
        type?: 'secondary' | 'primary';
        size?: 'small' | 'medium' | 'large';
        onClick?: (() => void) | ((e: SyntheticEvent) => void);
        disabled?: boolean;
        name?: string;
        htmlType?: 'button' | 'submit' | 'reset';
        children: React.ReactNode;
    }> = ButtonUI;
    useEffect(() => {
        dispatch({
            type: GET_TOTAL_PRICE,
        });
    }, [ingredientListConstructor]);
    const open = () => {
        if (ingredientListConstructor.buns.length && userAuth) {
            return dispatch(getOrderInfo(props.id));
        } else {
            history.replace({
                pathname: "/login",
                state: {from: {pathname: "/"}},
            });
        }
    };
    return (
        <div className={[styles.block].join(" ")}>
            <div className={[styles.priceBlock].join(" ")}>
                <span
                    className={[
                        styles.price,
                        "text text_type_digits-medium",
                    ].join(" ")}
                >
                    {totalPrice}
                </span>
                <CurrencyIcon type="primary"/>
            </div>
            <Button onClick={open} type="primary" size="large">
                Оформить заказ
            </Button>
        </div>
    );
};

