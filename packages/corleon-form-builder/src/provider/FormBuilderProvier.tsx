import React from 'react'
import { Schema } from '../models/Field';
import FormBuilderContext from "../context/FormBuilderContext";
import { IFormBuilderProvier, IConfigurationProps, ITranslation } from '../models';

interface IProvierConfigurationProps extends IConfigurationProps {
    constraint: ITranslation;
}
const FormBuilderProvier = ({ constraint, plugins }: IProvierConfigurationProps) =>
    ({ children }: IFormBuilderProvier) => {
        const [schema, setSchema] = React.useState<Schema>([]);
        return (
            <FormBuilderContext.Provider value={{ schema, setSchema, constraint, plugins }}>
                {typeof children != "function" ? children : children({ schema: schema })}
            </FormBuilderContext.Provider>
        )
    }

export default FormBuilderProvier