import React from 'react'
import Select from '../select/select'
import useForm from '../../hooks/useForm';
import { IField } from '../../models/Field';
import CheckBox from '../checkBox/checkBox';


interface IDependencyTab {
    field: IField;
    onChange: (e: IField) => void;
}
const DependencyTab = ({ field, onChange }: IDependencyTab) => {
    const { schema, constraint, plugins } = useForm();

    if (!field)
        return <React.Fragment></React.Fragment>

    const getTargetField = () => {
        const targetField = schema.find(x => x.uuid === field?.dependentField?.id);
        if (targetField) {
            const targetPlugin = plugins.find(x => x.name === targetField.type);
            if (targetPlugin && field)
                return (
                    <React.Fragment>
                        <targetPlugin.Component
                            label={constraint.dependentfieldvalue}
                            onChange={(e) => field.dependentField && onChange(({ ...field, dependentField: { ...field.dependentField, value: e } }))}
                            value={field.dependentField?.value || ""} />
                        <CheckBox onClick={x => onChange(({ ...field, show: x }))} Vertical={false} value={field?.show} label={constraint.show} />
                    </React.Fragment>
                )
        }
        return null;
    }

    return (
        <div>
            <Select
                label={constraint.dependentfield}
                options={schema.filter(x => x.uuid != field.uuid).map(x => ({ label: x.label || x.name, value: x.uuid }))}
                value={field.dependentField?.id || ""}
                onChange={x => onChange({ ...field, dependentField: { id: x.value, value: "" } })}
                mode='single'
            />
            {getTargetField()}
        </div>
    )
}

export default DependencyTab