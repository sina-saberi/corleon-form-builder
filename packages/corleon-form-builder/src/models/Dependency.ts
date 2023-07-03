export type DependentField<TValue extends string | boolean | number = string> = {
    id: string;
    value: TValue;
}