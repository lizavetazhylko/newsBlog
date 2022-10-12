import React from "react";
import './Button.css';

const Button = (props: IButton) => {
    const {
        content,
        isActive,
        onClick,
        color,
        type
    } = props;
    const buttonStyles = {
        height: 60,
        width: 120,
        color,
        opacity: isActive ? 1 : 0.5,
    };
    return (
        <button className = {`button button-${type}`}
                style = {buttonStyles}
                disabled = {!isActive}
                onClick={onClick}>
            {content}
        </button>
    ) 
}
export enum ButtonTypes {
    primary = "primary",
    secondary = "secondary",
}

interface IButton {
    content: string,
    isActive: boolean,
    onClick: () => void,
    color?: string,
    type: ButtonTypes
}

export default Button;