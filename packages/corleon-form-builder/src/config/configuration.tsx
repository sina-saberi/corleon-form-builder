import { DefaultConstraints } from '../constraints';
import { IConfigurationProps } from '../models';
import formBuilderProvier from '../provider/FormBuilderProvier';
import formBuilder from '../modules/formBuilder';
import formGenerator from '../modules/formGenerator';

export const configuration = (props: IConfigurationProps) => {
    const consts = { ...DefaultConstraints, ...props.constraint };
    return {
        FormProvider: formBuilderProvier({ constraint: consts, plugins: props.plugins }),
        FormBuilder: formBuilder(),
        FormGenerator: formGenerator(),
    };
}