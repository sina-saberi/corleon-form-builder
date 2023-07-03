import React from 'react'
import FormBuilderContext from "../context/FormBuilderContext";
import { IField, Schema } from '../models';
import { v4 as Guid } from "uuid"
import { getErrors } from '../utils/validation';

const useForm = () => {
    const ctx = React.useContext(FormBuilderContext);
    if (!ctx)
        throw new Error("no provider");

    const { schema, setSchema, plugins, constraint } = ctx;

    const createNewField = React.useCallback((props?: { [k in keyof IField]?: IField[k] }) => {
        if (plugins.length > 1 && plugins[0].name) {
            const newField = { uuid: Guid(), show: true, type: plugins[0].name, name: `new fiedl`, ...props };
            setSchema(p => [...p, newField]);
        } else throw Error("no plugin provided to create field");
    }, [schema, setSchema]);

    const updateField = React.useCallback((field: IField) => {
        setSchema(p => {
            return (p || []).map((item) => {
                if (field.uuid == item.uuid) {
                    return { ...field, uuid: item.uuid }
                }
                return { ...item }
            })
        });
    }, [setSchema]);

    const removeAll = React.useCallback(() => {
        setSchema([]);
    }, [schema, setSchema]);

    const removeField = (id: string) => {
        setSchema(p => p?.filter(i => i.uuid != id));
    }

    const changeFieldPosition = React.useCallback((field: IField, tofield: IField) => {
        if (schema && schema.length > 1) {
            let arr = [...schema];
            const toindex = schema.indexOf(tofield);
            const index = schema.indexOf(field);
            arr.splice(toindex, 1, field);
            arr.splice(index, 1, tofield);
            setSchema(arr);
        }
    }, [schema, setSchema]);

    const setFullSchema = React.useCallback((schema: Schema) => {
        setSchema(schema);
    }, [setSchema]);

    const errors = React.useMemo(() => {
        return getErrors(schema);
    }, [schema]);

    const validateValues = React.useCallback(() => {
        let errors = getErrors(schema);
        if (Object.values(errors).some(x => x))
            return errors;
        return false;
    }, [schema]);

    return {
        setFullSchema, updateField,
        createNewField, removeAll,
        removeField, changeFieldPosition,
        validateValues, errors,
        schema, constraint, plugins
    };
}

export default useForm