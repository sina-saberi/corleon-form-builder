import React from "react";

interface IRadioProps {
    label?: string;
    dir?: "rtl" | "ltr";
    Vertical?: boolean;
    value?: string;
    onClick?: (e?: string) => void;
    fieldValue?: string;
}

const Radio = ({ onClick, label, value, fieldValue, dir = "rtl", Vertical = true }: IRadioProps) => {
    return (
        <div onClick={() => onClick && onClick(value)} className={`corleon-field radio ${Vertical ? "" : "horizontal"}`}>
            {label &&
                <label>
                    {label}
                </label>
            }
            <span dir={dir}>
                {value === fieldValue && <div className={value === fieldValue ? "checked" : undefined}></div>}
            </span>
        </div>
    )
}

export default Radio