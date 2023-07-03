import React from 'react'
import Icon, { IIconProps } from '../icon/icon';
import Spinner from '../spinner/spinner';

type buttonThemes = "normal" | "success" | "danger" | "info"
type Buttonsizes = "sm" | "md" | "lg";

interface IButtonProps {
    dir?: "rtl" | "ltr";
    text: string;
    icon?: IIconProps
    onClick?: (e: React.PointerEvent<HTMLButtonElement>) => void;
    type?: "button" | "submit";
    disabled?: boolean;
    loading?: boolean;
    theme?: buttonThemes;
    size?: Buttonsizes
}

const Button: React.FC<IButtonProps> = ({ size = "md", theme = "normal", text, dir, icon, onClick, type = "button", loading = false, disabled = false }) => {
    return (
        <button
            disabled={loading || disabled}
            type={type}
            onClick={onClick}
            dir={dir}
            className={`corleon-button ${theme} ${size}`}>
            <span>
                {loading && <Spinner size='xs' />}
                {text}
            </span>
            {icon && <Icon {...icon} />}
        </button>
    )
}

export default React.memo(Button);