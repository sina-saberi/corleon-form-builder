import React from 'react'
import { IField, IFieldSetting } from '../../models';
import * as Inputs from '../inputs/index';
import useForm from '../../hooks/useForm';
import Select from '../select/select';

interface ISettingTab {
    field: IField;
    onChange: (e: IField) => void;
}
const SettingTab = ({ field, onChange }: ISettingTab) => {
    const { plugins, constraint } = useForm();
    let plugin = plugins.find(x => x.name === field.type);
    const defaultFieldProps: IFieldSetting = {
        label: "",
        dependentField: { id: "", value: "" },
        placeholder: "",
        value: "",
        validation: {
            requierd: { value: true, message: "" },
            min: { value: 0, message: "" },
            match: { value: "", message: "" },
            max: { value: 0, message: "" },
            ...field.validation
        },
        ...field,
    }

    if (!plugin) return <React.Fragment></React.Fragment>;

    return (
        <React.Fragment>
            <div>
                <Inputs.Input
                    onChange={(e) => onChange({ ...field, name: e.target.value })}
                    label={constraint.name}
                    value={defaultFieldProps.name} />
            </div>
            <div>
                <Inputs.Input
                    onChange={(e) => onChange({ ...field, label: e.target.value })}
                    label={constraint.label}
                    value={defaultFieldProps.label} />
            </div>
            <div>
                <Select
                    mode='single'
                    options={plugins.map(x => ({ label: x.displayName || x.name, value: x.name }))}
                    value={defaultFieldProps.type}
                    onChange={(e) => onChange({ ...field, type: e.value })}
                    label={constraint.type}
                />
            </div>
            {plugin.placeholder && (
                <div>
                    <Inputs.Input
                        onChange={(e) => onChange({ ...field, placeholder: e.target.value })}
                        label={constraint.placeholder}
                        value={defaultFieldProps.placeholder} />
                </div>
            )}
            {plugin?.Component &&
                <div>
                    <plugin.Component
                        data={field.data}
                        onChange={(e) => onChange(({ ...field, value: e }))}
                        value={defaultFieldProps.value}
                        label={constraint.defaultvalue}
                    />
                </div>
            }
            {plugin?.DataComponent &&
                <div>
                    <plugin.DataComponent
                        updateData={(data) => onChange({ ...field, data: data })}
                        data={field.data}
                        label={constraint.addoption}
                    />
                </div>
            }
        </React.Fragment>
    )
}

export default SettingTab