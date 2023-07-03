import React from 'react'
import useForm from '../../hooks/useForm';
import { IField, IFieldSetting, Validations } from '../../models';
import * as Inputs from '../inputs/index';
import CheckBox from '../checkBox/checkBox';

interface IValidationTab {
    field: IField;
    onChange: (e: IField) => void;
}
const ValidationTab = ({ field, onChange }: IValidationTab) => {
    const { plugins, constraint } = useForm();
    let plugin = plugins.find(x => x.name === field.type);
    const defaultFieldProps: IFieldSetting = {
        label: "",
        dependentField: { id: "", value: "" },
        placeholder: "",
        value: "",
        ...field,
    }

    if (!plugin) return <React.Fragment></React.Fragment>;

    const changeFieldValidation = <TName extends keyof Validations, TProps extends keyof Validations[TName]>(name: TName, prop: TProps, value: Validations[TName][TProps]) => {
        onChange({
            ...field, validation: {
                ...field.validation,
                [name]: {
                    ...(field.validation || {})[name],
                    [prop]: value
                }
            }
        })
    }

    const validations = {
        requierd: { value: false, message: "" },
        min: { value: 0, message: "" },
        match: { value: "", message: "" },
        max: { value: 0, message: "" },
        ...defaultFieldProps.validation!
    }

    return (
        <React.Fragment>
            {plugin.validation?.min && (
                <div className='validation-section'>
                    <h3>{constraint.min}</h3>
                    <div>
                        <Inputs.NumericInput
                            label={constraint.value}
                            onChange={(e) => changeFieldValidation("min", "value", parseInt(e.target.value || "0"))}
                            value={validations.min.value.toString()}
                        />
                        <Inputs.Input
                            label={constraint.message}
                            onChange={(e) => changeFieldValidation("min", "message", e.target.value)}
                            value={validations.min.message}
                        />
                    </div>
                </div>
            )}
            {plugin.validation?.max && (
                <div className='validation-section'>
                    <h3>{constraint.max}</h3>
                    <div>
                        <Inputs.NumericInput
                            label={constraint.value}
                            onChange={(e) => changeFieldValidation("max", "value", parseInt(e.target.value || "0"))}
                            value={validations.max.value.toString()}
                        />
                        <Inputs.Input
                            onChange={(e) => changeFieldValidation("max", "message", e.target.value)}
                            value={validations.max.message}
                            label={constraint.message}
                        />
                    </div>
                </div>
            )}
            {plugin.validation?.requierd && (
                <div className='validation-section'>
                    <h3>{constraint.required}</h3>
                    <div>
                        <CheckBox
                            onClick={(e) => changeFieldValidation("requierd", "value", e)}
                            value={validations.requierd.value}
                            label={constraint.value}
                        />
                        <Inputs.Input
                            onChange={(e) => changeFieldValidation("requierd", "message", e.target.value)}
                            value={validations.requierd.message}
                            label={constraint.message}
                        />
                    </div>
                </div>
            )}
            {plugin.validation?.match && (
                <div className='validation-section'>
                    <h3>{constraint.match}</h3>
                    <div>
                        <Inputs.Input
                            onChange={(e) => changeFieldValidation("match", "value", e.target.value)}
                            value={validations.match.value}
                            label={constraint.value}
                        />
                        <Inputs.Input
                            onChange={(e) => changeFieldValidation("match", "message", e.target.value)}
                            value={validations.match.message}
                            label={constraint.message}
                        />
                    </div>
                </div>
            )}
            {(!plugin.validation?.match && !plugin.validation?.requierd && !plugin.validation?.max && !plugin.validation?.min) &&
                <div>"empty list"</div>
            }
        </React.Fragment>
    )
}

export default ValidationTab