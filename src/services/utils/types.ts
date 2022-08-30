import React, {SyntheticEvent} from "react";

export interface ingredientType {
    src: string,
    name: string,
    price: number,
    id?: string,
    type?: "top" | "bottom" | undefined,
};

export interface ingredientTypeReq {
    calories: number,
    carbohydrates: number,
    fat: number,
    image: string,
    image_large: string,
    image_mobile: string,
    name: string,
    price: number,
    proteins: number,
    type: string,
    __v: number,
    _id: string,
    newId: string
};

export type TRef = HTMLDivElement | null

export interface ITargetValue {
    target: { name: string, value: string }
}

export interface IPrevent {
    preventDefault: () => void;
}

export interface IButton {
    type?: 'secondary' | 'primary';
    size?: 'small' | 'medium' | 'large';
    onClick?: (() => void) | ((e: SyntheticEvent) => void);
    disabled?: boolean;
    name?: string;
    htmlType?: 'button' | 'submit' | 'reset';
    children: React.ReactNode;
}

export interface IForms {
    [name: string]: string,
}

