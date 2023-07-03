import { IField, Schema, Validations } from "../models";

export type validationOptionType = ((field: IField) => { [k in keyof Validations]: validationMethodType });
export type validationMethodType = (e?: (instanse: ReturnType<validationOptionType>) => string | undefined) => string | undefined;

export const replaceValidationStringVariable = (value: string, name: string) => {
    return value.replaceAll("{0}", name);
}

export const validate: validationOptionType = (field) => {
    const { validation, value } = field;
    const name = field.label || field.name;
    return {
        requierd: (e) => {
            if (validation && validation.requierd && validation.requierd.value && !value)
                return replaceValidationStringVariable(validation.requierd.message, name);
            if (e)
                return e(validate(field));
        },
        min: (e) => {
            if (validation && validation.min && value && (typeof value == "string" && validation.min.value > value.length))
                return replaceValidationStringVariable(validation.min.message, name);
            if (validation && validation.min && value && (typeof value == "number" && validation.min.value > value))
                return replaceValidationStringVariable(validation.min.message, name);
            if (e)
                return e(validate(field));
        },
        max: (e) => {
            if (validation && validation.max && (typeof value == "string" && validation.max.value < value.length))
                return validation.max.message;
            if (validation && validation.max && (typeof value == "number" && validation.max.value < value))
                return validation.max.message;
            if (e)
                return e(validate(field));
        },
        match: (e) => {
            if (validation && validation.match && value && typeof value == "string" && !RegExp(validation.match.value).test(value)) {
                return replaceValidationStringVariable(validation.match.message, name);
            }
            if (e)
                return e(validate(field));
        }
    }
};

export const getErrors = (schema: Schema) => {
    return schema.reduce((perv, currentElemnt) => {
        if (currentElemnt.validation) {
            perv[currentElemnt.name] = currentElemnt.validation &&
                validate(currentElemnt)
                    .requierd(a => a.min(b => b.max(c => c.match())));
        }
        return perv;
    }, {} as { [name: string]: string | undefined });
};