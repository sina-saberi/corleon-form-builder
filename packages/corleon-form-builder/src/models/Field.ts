import { Validations } from "./Validation";
import { DependentField } from "./Dependency";

export interface IField<TData = any, TValue extends string | boolean | number = string> {
    uuid: string;
    name: string;
    type: string;
    placeholder?: string;
    value?: TValue;
    label?: string;
    show: boolean;
    validation?: { [name in keyof Validations]?: Validations[name] };
    dependentField?: DependentField;
    data?: TData
}

export interface IFieldSetting<TData = any, TValue extends string | boolean | number = string> extends IField<TData, TValue> {
    uuid: string;
    name: string;
    type: string;
    placeholder: string;
    value: TValue;
    label: string;
    show: boolean;
    validation?: { [name in keyof Validations]?: Validations[name] };
    dependentField: DependentField;
    data?: TData
}

export type Schema = IField[]