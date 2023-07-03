import React from "react";
import { FieldPlugin, ITranslation, Schema } from "../models";

export type FormBuilderContextType = {
    plugins: FieldPlugin[];
    constraint: ITranslation;
    setSchema: React.Dispatch<React.SetStateAction<Schema>>;
    schema: Schema;
}

export default React.createContext<FormBuilderContextType | undefined>(undefined);