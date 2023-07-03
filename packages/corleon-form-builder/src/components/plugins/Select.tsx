import React from 'react';
import { FieldPlugin } from '../../models';
import { v4 } from "uuid";
import Badge from '../badge/badge';
import Icon from '../icon/icon';
import * as Inputs from "./../inputs";
import { IOption } from '../../models/Props';
import Button from '../button/button';
import SelectComponent from './../select/select';

export const Select: FieldPlugin<string, IOption[]> = {
    name: "Select",
    placeholder: true,
    DataComponent: ({ data, label, updateData }) => {
        const [value, setValue] = React.useState("");
        return <div>
            {(data && data.length > 0) && (
                <div style={{ padding: "10px 0", display: "flex", flexWrap: "wrap", maxWidth: "200px", gap: "3px" }}>
                    {data.map(option => (
                        <Badge>
                            <button onClick={() => updateData(data.filter(x => x.value != option.value))} style={{ display: "flex", gap: "3px", alignItems: "center" }}>
                                {option.label}
                                <Icon name='close-circle' />
                            </button>
                        </Badge>
                    ))}
                </div>
            )}
            <Inputs.Input
                value={value}
                onChange={(e) => setValue(e.target.value)}
                label={label}
            />
            {(value) && (
                <div style={{ marginTop: "3px" }}>
                    <Button text='add' onClick={() => { value && updateData([...(data || []), { label: value, value: v4() }]); setValue("") }} />
                </div>
            )}
        </div>
    },
    Component: ({ label, value, onChange, data, placeholder, error }) =>
        <div>
            <SelectComponent
                mode='single'
                options={data || []}
                onChange={(e) => { onChange && onChange(e.value) }}
                label={label}
                placeholder={placeholder}
                value={value || ""}
            />
            {error && <span style={{ color: "red", fontSize: "13px" }}>{error}</span>}
        </div>
}
