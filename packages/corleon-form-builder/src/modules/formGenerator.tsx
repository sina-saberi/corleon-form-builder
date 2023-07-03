import React from 'react'
import useForm from '../hooks/useForm';

const FormGenerator = () =>
    ({ errors }: { errors?: { [name: string]: string | undefined } }) => {
        const { updateField, schema, plugins } = useForm();
        return (
            <React.Fragment>
                {schema.map((field, index) => {
                    let fieldSettings = plugins.find(p => p.name == field.type);
                    if (fieldSettings) {
                        const dependentField = field.dependentField ?
                            schema.find((i) => i.name == field.dependentField?.id && field.dependentField.value === i.value)
                            :
                            null;
                        if ((field.show && !dependentField) || (!field.show && dependentField))
                            return <fieldSettings.Component
                                error={errors && errors[field.name]}
                                placeholder={field.placeholder}
                                value={field.value}
                                label={field.label}
                                data={field.data}
                                onChange={(e) => updateField({ ...field, value: e })}
                                key={index} />
                    }
                })}
            </React.Fragment>
        )
    }

export default FormGenerator