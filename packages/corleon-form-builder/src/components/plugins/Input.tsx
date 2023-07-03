import React from 'react';
import { FieldPlugin } from '../../models';
import * as Inputs from "./../inputs";

export const Input: FieldPlugin = {
    name: "Input",
    placeholder: true,
    validation: {
        min: true,
        match: true,
        max: true,
        requierd: true
    },
    Component: ({ label, value, onChange, placeholder, error }) =>
        <div>
            <Inputs.Input
                onChange={(e) => { onChange && onChange(e.target.value) }}
                label={label}
                placeholder={placeholder}
                value={value || ""}
            />
            {error && <span style={{ color: "red", fontSize: "13px" }}>{error}</span>}
        </div>
}