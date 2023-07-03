import React from 'react';
import useForm from '../hooks/useForm';
import { IField } from '../models';
import Button from '../components/button/button';
import TabNavigation from '../components/tabNavigation/tabNavigation';
import SettingTab from '../components/tabs/settingTab';
import ValidationTab from '../components/tabs/validationTab';
import DependencyTab from '../components/tabs/dependencyTab';
import { validationDefaultMessages } from '../constraints';

const FieldSetting: React.FC<{ id: string, tab: string }> = ({ id, tab }) => {
    const [field, setField] = React.useState<IField | undefined>();
    const { schema, updateField, constraint, plugins } = useForm();

    const getData = React.useCallback(() => {
        if (id) {
            let findedField = schema.find(x => x.uuid == id);
            if (findedField) {
                setField(findedField);
            }
        }
    }, [schema, id, setField]);

    React.useEffect(() => {
        if (id) {
            getData();
        }
    }, []);

    const onSubmit = React.useCallback(() => {
        if (field) {
            let newField = { ...field };
            if (newField.validation)
                newField.validation = Object.entries(newField.validation).reduce((perv, [key, value]) => {
                    perv[key] = { ...value, message: value.message || (validationDefaultMessages as any)[key] }
                    return perv;
                }, {} as any);
            updateField(newField);
            close();
        }
    }, [updateField, field, close]);

    if (!field)
        return <React.Fragment></React.Fragment>

    let plugin = plugins.find(x => x.name === field.type);
    return (
        <div className='field-setting'>
            {plugin &&
                <TabNavigation
                    tabs={{
                        [constraint.settings]: <SettingTab onChange={x => setField({ ...field, ...x })} field={field} />,
                        [constraint.validation]: <ValidationTab onChange={x => setField({ ...field, ...x })} field={field} />,
                        [constraint.dependency]: schema.length > 1 ? <DependencyTab onChange={x => setField({ ...field, ...x })} field={field} /> : undefined,
                    }}
                    defaultTab={tab || constraint.settings}
                />
            }
            <div className='submit-container'>
                <Button onClick={onSubmit} theme='success' text='save' />
            </div>
        </div>
    )
}

export default FieldSetting