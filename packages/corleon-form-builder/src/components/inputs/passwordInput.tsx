import React from 'react'
import { IInputProps } from '../../models/Props';
import Icon from '../icon/icon';

interface IInput extends IInputProps<HTMLInputElement> {

}

const PasswordInput = React.forwardRef<HTMLInputElement, IInput>(({ disabled, autoComplete, value, icon, onChange, label, placeholder, dir = "rtl" }, ref) => {
    const [show, setShow] = React.useState(false);
    return (
        <div className='corleon-field'>
            {label &&
                <label>
                    {label}
                </label>
            }
            <div dir={dir}>
                <span onClick={() => setShow(!show)} className='eye-button'>
                    <Icon name={show ? "eye-slash" : "eye"} />
                </span>
                <input
                    disabled={disabled}
                    type={show ? "text" : "password"}
                    ref={ref}
                    autoComplete={autoComplete}
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder} />
                {icon && <Icon {...icon} />}
            </div>
        </div>
    )
})

export default React.memo(PasswordInput);