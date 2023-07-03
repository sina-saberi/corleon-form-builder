import { IIconProps } from "../components/icon/icon";
import { DefaultConstraints } from "../constraints";
import { ITranslation } from "./Constraints";
import { Schema } from "./Field";
import { FieldPlugin } from "./Plugin";

export interface IFormBuilderProvier {
    children: React.ReactNode | ((props: { schema: Schema | undefined }) => React.ReactNode);
}

export interface IConfigurationProps {
    plugins: FieldPlugin<any>[];
    constraint?: { [T in keyof ITranslation]?: string };
}

export interface IInputProps<ElemntType extends HTMLElement> {
    value: string;
    onChange?: (e: React.ChangeEvent<ElemntType>) => void;
    label?: string;
    placeholder?: string;
    dir?: "rtl" | "ltr";
    icon?: IIconProps;
    autoComplete?: string;
    disabled?: boolean
}

export type IOption = { label: string; value: string }