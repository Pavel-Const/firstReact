import React, {FC, useRef} from "react";
import styles from "./constructor-card.module.css";
import {
    ConstructorElement,
    DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import {
    CHANGE_PRODUCT_CONSTRUCTOR,
    DELETE_CONSTRUCTOR_ITEM,
} from "../../services/actions/actionsIngredients";
import {ingredientType} from "../../services/utils/types";
import {useDrag, useDrop, XYCoord} from "react-dnd";
import {useDispatch} from "../../index";

export const ConstructorCard: FC<ingredientType & {
    group?: string,
    isLocked?: boolean,
    index: number,
}> = (props) => {
    const ref = useRef<HTMLDivElement>(null);
    const [{isDrag}, dragref] = useDrag({
        type: "elConstructor",
        item: {id: props.index},
        collect: (monitor) => ({
            isDrag: monitor.isDragging(),
        }),
    });
    const [{handlerId}, dropref] = useDrop({
        accept: "elConstructor",
        collect(monitor) {
            return {
                handlerId: monitor.getHandlerId(),
            };
        },
        hover(item: any, monitor) {
            if (!ref.current) {
                return;
            }
            const dragIndex: number | undefined = item.id;
            const hoverIndex: number | undefined = props.index;

            if (dragIndex === hoverIndex) {
                return;
            }
            const hoverBoundingRect = ref.current?.getBoundingClientRect();
            const hoverMiddleY =
                (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
            const clientOffset: XYCoord | null = monitor.getClientOffset();
            // @ts-ignore
            const hoverClientY = clientOffset.y - hoverBoundingRect.top;
            if (dragIndex && hoverIndex) {
                if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
                    return;
                }
                if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
                    return;
                }
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
    const deleteItem = () => {
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
                    style={{opacity: opacity}}
                    data-handler-id={handlerId}
                    ref={ref}
                >
                    <DragIcon type={'primary'}/>
                    <ConstructorElement
                        text={props.name}
                        price={props.price}
                        thumbnail={props.src}
                        handleClose={deleteItem}
                    />
                </div>
            ) : (
                <div className={[styles.item, "ml-8"].join(" ")}>
                    <ConstructorElement
                        text={props.name}
                        price={props.price}
                        thumbnail={props.src}
                        isLocked={true}
                        type={props.type}
                    />
                </div>
            )}
        </>
    );
};


