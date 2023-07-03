import React from 'react';
import "./style.css";

const icons = {
    "mobile": "icon-mobile",
    "password-check": "icon-password-check",
    "eye": "icon-eye",
    "eye-slash": "icon-eye-slash",
    "sms": "icon-sms",
    "trash": "icon-trash",
    "document-upload": "icon-document-upload",
    "message-question": "icon-message-question",
    "close-circle": "icon-close-circle",
    "search-normal-1": "icon-search-normal-1",
    "arrow-up-2": "icon-arrow-up-2",
    "arrow-down-1": "icon-arrow-down-1",
    "arrow-left-3": "icon-arrow-left-3",
    "refresh": "icon-refresh"
}

export interface IIconProps {
    name: keyof typeof icons;
    className?: string;
    style?: React.StyleHTMLAttributes<HTMLElement>
}

const Icon: React.FC<IIconProps> = ({ name, className, style }) => {
    return (
        <i style={style} className={`${icons[name]} ${className || ""}`}></i>
    )
}

export default Icon