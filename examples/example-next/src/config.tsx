import { configuration, Input, CheckBox, RadioGroup, Select } from 'corleon-form-builder';

const builder = configuration({
    plugins: [Input, CheckBox, RadioGroup, Select],
    constraint: {
        type: "نوع فیلد"
    }
});

export const { FormBuilder, FormGenerator, FormProvider } = builder;