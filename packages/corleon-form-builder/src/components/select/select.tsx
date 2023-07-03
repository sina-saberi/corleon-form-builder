import React from 'react'
import Icon from './../icon/icon';
import { createPortal } from 'react-dom';
import Badge from '../badge/badge';
import { IOption } from '../../models/Props';

interface ISelect<TMode extends "single" | "multy"> {
    options: IOption[];
    label?: string;
    placeholder?: string;
    value: TMode extends "single" ? string : string[];
    onChange?: (e: TMode extends "single" ? IOption : IOption[]) => void;
}

const Select = <TMode extends "single" | "multy">({ value, label, mode, onChange, options, placeholder }: ISelect<TMode> & { mode: TMode }) => {
    const containerRef = React.useRef<HTMLDivElement>(null);
    const [open, setOpen] = React.useState(false);

    const change = React.useCallback((newValue: IOption, exist: boolean) => {
        if (onChange) {
            if (mode === "single" && !exist)
                onChange(newValue as any);
            if (mode === "multy" && Array.isArray(value) || value == undefined) {
                let values = options.filter(x => (value || []).some(y => y == x.value));
                if (exist)
                    values = values.filter(x => x.value != newValue.value);
                else
                    values.push(newValue);
                onChange(values as any);
            }
            setOpen(false);
        }
    }, [value, options, containerRef])

    const Value = React.useMemo<string | string[]>(() => {
        if (value && !Array.isArray(value)) {
            const item = options.find(x => x.value === value)
            if (item)
                return item.label;
        }

        if (value && Array.isArray(value)) {
            const item = options.filter(x => value.some(y => y === x.value)).map(x => x.label)
            if (item)
                return item;
        }

        if (placeholder)
            return placeholder;
        return "";
    }, [value, placeholder, options])

    const onFocus = (e: React.FocusEvent<HTMLButtonElement>) => {
        setOpen(true);
    }
    
    const onBlur = (e: React.FocusEvent<HTMLButtonElement>) => {
        if (!e.relatedTarget || !e.relatedTarget.classList.contains("option"))
            setOpen(false);
    }

    const getOptions = () => {
        if (containerRef.current) {
            const boundingRect = containerRef.current.getBoundingClientRect();
            const maxWidth = `${containerRef.current.clientWidth}px`;
            const top = `${boundingRect.top + containerRef.current.clientHeight + 10 + document.documentElement.scrollTop}px`;
            const left = `${boundingRect.left + document.documentElement.scrollLeft}px`;
            return (
                <div style={{ maxWidth, top, left }} className='options down'>
                    <ul>
                        {options.map((option) => {
                            const isOptionSelected = Array.isArray(value) ? value.some(x => x === option.value) : value == option.value;
                            return (
                                <li className='option' key={option.value}>
                                    <button className={`option ${isOptionSelected ? "selected" : ""}`} onClick={() => change(option, isOptionSelected)}>
                                        {option.label}
                                    </button>
                                </li>
                            )
                        })}
                    </ul>
                </div>
            )
        }
    }

    return (
        <div className='corleon-field'>
            {label &&
                <label>
                    {label}
                </label>
            }
            <div ref={containerRef}>
                <button onFocus={onFocus} onBlur={onBlur}>
                    <div>
                        {typeof Value == "string" ?
                            Value
                            :
                            Value.map(x => <Badge key={x}>{x}</Badge>)
                        }
                    </div>
                    <Icon name='arrow-down-1' />
                </button>
                {open && createPortal(getOptions(), document.body)}
            </div>
        </div>
    )
}
export default Select;