/* eslint-disable default-case */
import orderStyles from "./order-detail.module.css";

export const OrderDetails = () => {
    return (
        <div className={[orderStyles.content, "pb-20"].join(" ")}>
            <h2
                className={[
                    orderStyles.idNum,
                    "text text_type_digits-large mt-4",
                ].join(" ")}
            >
                034536
            </h2>
            <span className="text text_type_main-medium mt-8">
                идентификатор заказа
            </span>
            <div className={orderStyles.icon}></div>
            <p className="mt-15">Ваш заказ начали готовить</p>
            <p className="text_color_inactive mt-2">
                Дождитесь готовности на орбитальной станции
            </p>
        </div>
    );
};
