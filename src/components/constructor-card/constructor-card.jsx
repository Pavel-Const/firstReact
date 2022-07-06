import React, { useRef } from "react";
import { useDispatch } from "react-redux";
import styles from "./constructor-card.module.css";
import {
    ConstructorElement,
    DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";
import {
    CHANGE_PRODUCT_CONSTRUCTOR,
    DELETE_CONSTRUCTOR_ITEM,
} from "../../services/actions/actions";
import { useDrag, useDrop } from "react-dnd";

export const ConstructorCard = (props) => {
    const ref = useRef(null);
    const [{ isDrag }, dragref] = useDrag({
        type: "elConstructor",
        item: { id: props.index },
        collect: (monitor) => ({
            isDrag: monitor.isDragging(),
        }),
    });
    const [{ handlerId }, dropref] = useDrop({
        accept: "elConstructor",
        collect(monitor) {
            return {
                handlerId: monitor.getHandlerId(),
            };
        },
        hover(item, monitor) {
            if (!ref.current) {
                return;
            }
            const dragIndex = item.id;
            const hoverIndex = props.index;

            if (dragIndex === hoverIndex) {
                return;
            }
            const hoverBoundingRect = ref.current?.getBoundingClientRect();
            const hoverMiddleY =
                (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
            const clientOffset = monitor.getClientOffset();
            const hoverClientY = clientOffset.y - hoverBoundingRect.top;

            if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
                return;
            }
            if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
                return;
            }
            dispatch({
                type: CHANGE_PRODUCT_CONSTRUCTOR,
                hoverIndex: hoverIndex,
                dragIndex: dragIndex,
            });
            item.id = hoverIndex;
        },
    });
    const dispatch = useDispatch();
    const deletItem = () => {
        dispatch({
            type: DELETE_CONSTRUCTOR_ITEM,
            index: props.index,
        });
    };
    const opacity = isDrag ? 0 : 1;
    dragref(dropref(ref));
    return (
        <>
            {props.type === undefined ? (
                <div
                    className={[styles.item].join(" ")}
                    style={{ opacity: opacity }}
                    data-handler-id={handlerId}
                    ref={ref}
                >
                    <DragIcon />
                    <ConstructorElement
                        text={props.name}
                        price={props.price}
                        thumbnail={props.img}
                        handleClose={deletItem}
                    />
                </div>
            ) : (
                <div className={[styles.item, "ml-8"].join(" ")}>
                    <ConstructorElement
                        text={props.name}
                        price={props.price}
                        thumbnail={props.img}
                        isLocked={true}
                        type={props.type}
                    />
                </div>
            )}
        </>
    );
};

ConstructorCard.propTypes = {
    img: PropTypes.string,
    name: PropTypes.string.isRequired,
    price: PropTypes.number,
    type: PropTypes.string,
    group: PropTypes.string,
    isLocked: PropTypes.bool,
};
