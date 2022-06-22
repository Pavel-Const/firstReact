import React from "react";
import constructorStyles from "./burger-constructor.module.css";
import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";
import { data } from "../../utils/data";
import { ConstructorCard } from "../constructor-card/constructor-card";
import { ConstructorOrder } from "../constructor-order/constructor-order";

export const BurgerConstructor = () => {
    return (
        <section className={[constructorStyles.main].join(" ")}>
            <div className={constructorStyles.block}>
                <ConstructorCard
                    name={`${data[0].name} (верх)`}
                    price={data[0].price}
                    img={data[0].image}
                    type="top"
                />
                <div
                    className={[constructorStyles.box, "scrollCustom"].join(
                        " "
                    )}
                >
                    {data.map((item, index) => (
                        <ConstructorCard
                            key={index}
                            name={item.name}
                            price={item.price}
                            img={item.image}
                            group={item.type}
                        />
                    ))}
                </div>
                <ConstructorCard
                    name={`${data[0].name} (низ)`}
                    price={data[0].price}
                    img={data[0].image}
                    type="bottom"
                />
            </div>
            <ConstructorOrder />
        </section>
    );
};
