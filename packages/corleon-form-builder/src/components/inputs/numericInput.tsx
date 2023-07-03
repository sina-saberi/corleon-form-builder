import React from 'react'
import { IInputProps } from '../../models/Props';
import { getDigits } from "./../../utils";
import Icon from '../icon/icon';

interface INumericInput extends IInputProps<HTMLInputElement> {

}

const NumericInput = React.forwardRef<HTMLInputElement, INumericInput>(({ icon, disabled, autoComplete, value, onChange, label, placeholder, dir = "rtl" }, ref) => {
    return (
        <div className='corleon-field'>
            {label &&
                <label>
                    {label}
                </label>
            }
            <div dir={dir}>
                <input
                    autoComplete={autoComplete}
                    ref={ref}
                    disabled={disabled}
                    value={getDigits(value)}
                    onChange={(e) => { onChange && onChange({ ...e, target: { ...e.target, value: getDigits(e.target.value) } }) }}
                    placeholder={placeholder} />
                {icon && <Icon {...icon} />}
            </div>
        </div>
    )
})

export default React.memo(NumericInput);