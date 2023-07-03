import { Validations } from "./Validation";

export type FieldPluginComponent<TValue extends string | boolean | number, TData = any> = {
    label?: string;
    value?: TValue;
    onChange?: (e: TValue) => void;
    placeholder?: string;
    data?: TData;
    error?: string;
}

export type FieldDataPluginComponent<TData = any> = {
    label?: string;
    updateData: (data: TData) => void;
    data?: TData
}

export interface FieldPlugin<TValue extends string | boolean | number = string, TData = any> {
    name: string;
    displayName?: string;
    placeholder?: boolean;
    validation?: {
        [k in keyof Validations]?: boolean
    };
    data?: TData;
    defaultValue?: TValue;
    DataComponent?: (props: FieldDataPluginComponent<TData>) => React.ReactNode;
    Component: (props: FieldPluginComponent<TValue, TData>) => React.ReactNode;
}