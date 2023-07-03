export type ValidationType<TValue extends string | number | boolean = string> = { value: TValue; message: string; };
export type Validations = {
    requierd: ValidationType<boolean>;
    min: ValidationType<number>;
    max: ValidationType<number>;
    match: ValidationType<string>;
}