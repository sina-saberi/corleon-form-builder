import React from "react";
import { FieldPlugin } from "../../models";
import CheckBoxComponent from "./../checkBox/checkBox";

export const CheckBox: FieldPlugin<boolean> = {
    name: "CheckBox",
    validation: {
        requierd: true
    },
    Component: ({ label, onChange, value, error }) =>
        <div>
            <CheckBoxComponent
                value={value}
                onClick={(e) => onChange && onChange(e)}
                label={label}
            />
            {error && <span style={{ color: "red", fontSize: "13px" }}>{error}</span>}
        </div>
}