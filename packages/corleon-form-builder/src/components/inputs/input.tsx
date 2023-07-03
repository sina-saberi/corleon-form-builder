import React from 'react'
import { IInputProps } from '../../models/Props';
import { getDigits } from "./../../utils";
import Icon from '../icon/icon';

interface IInput extends IInputProps<HTMLInputElement> {

}

const Input = React.forwardRef<HTMLInputElement, IInput>(({ icon, disabled, value, autoComplete, onChange, label, placeholder, dir = "rtl" }, ref) => {
    return (
        <div className='corleon-field'>
            {label &&
                <label>
                    {label}
                </label>
            }
            <div dir={dir}>
                <input
                    disabled={disabled}
                    autoComplete={autoComplete}
                    ref={ref}
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder} />
                {icon && <Icon {...icon} />}
            </div>
        </div>
    )
})

export default React.memo(Input);