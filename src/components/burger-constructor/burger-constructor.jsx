import React from "react";
import constructorStyles from "./burger-constructor.module.css";
import { ConstructorCard } from "../constructor-card/constructor-card";
import { ConstructorOrder } from "../constructor-order/constructor-order";

export const BurgerConstructor = (props) => {
    return (
        <section className={[constructorStyles.main].join(" ")}>
            <div className={constructorStyles.block}>
                <ConstructorCard
                    name={`${props.data[0].name} (верх)`}
                    price={props.data[0].price}
                    img={props.data[0].image}
                    type="top"
                />
                <div
                    className={[constructorStyles.box, "scrollCustom"].join(
                        " "
                    )}
                >
                    {props.data.map((item, index) => (
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
                    name={`${props.data[0].name} (низ)`}
                    price={props.data[0].price}
                    img={props.data[0].image}
                    type="bottom"
                />
            </div>
            <ConstructorOrder openModal={props.openModal} />
        </section>
    );
};
