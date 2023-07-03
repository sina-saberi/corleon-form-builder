<h1 align="center">corleon-form-builder</h1>
<p align="center">
    an easy to use fully customizable form builder.
</p>

[![Stable Release](https://img.shields.io/npm/v/formik.svg)](https://www.npmjs.com/package/corleon-form-builder)

## Installation
in order to install the form-builder to your react or next app use this commands
<pre>
  using npm : npm i corleon-form-builder
  using yarn : yarn add corleon-form-builder
</pre>

## Quick start
first things first , in order to use default form-builder or form-generator components. you need to configure the plugins and constraints.
<br/>
<br/>
<b>config.ts</b>

```jsx
import { configuration, Input, CheckBox, RadioGroup, Select } from 'corleon-form-builder';

const builder = configuration({
    plugins: [Input, CheckBox, RadioGroup, Select], // enter at least one plugin to your plugin list 
    constraint: {}, //optional
});

export const { FormBuilder, FormGenerator, FormProvider } = builder;
```

## usage
now that you're exported <b>FormProvider</b> use it in some layout component on your choice
<br/>
<br/>
<b>src/layouts/layout.tsx</b>
```jsx
import { FormProvider } from '@/src/config';
  
function App() {
  <FormProvider>
    //components
  </FormProvider>
}
export default App;
```

## show form-builder
in order to show the default form-builder module you have to create a new component and import <b>FormBuilder</b> in it.
in this component you can customize some of the ui but the default module gono render anyway
<br/>
<br/>
<b>src/components/AppFormBuilder.tsx</b>
```jsx
import { FormBuilder } from '@/src/config';
function AppFormBuilder() {
  <div className="w-full max-h-full overflow-y-auto p-4">
    <div className='flex mb-5'>
        <div className="flex gap-2">
           <button onClick={() => { }>"create new field"</button>
           <button onClick={() => { }} >"remove all fields"</button>
        </div>
    </div>
    <FormBuilder />
  </div>
}
export default AppFormBuilder;
```
<br/>
<br/>
update your layout 
<br/>
<br/>
<b>src/layouts/layout.tsx</b>

```jsx
import { FormProvider } from '@/src/config';
import AppFormBuilder from '@/src/components/AppFormBuilder'; // add this line
  
function App() {
  <FormProvider>
    <AppFormBuilder/> {/*and this one*/}
  </FormProvider>
}
export default App;
```


now in order for thing to start working the package provided you a hook with every function you need to create , update, remove or even create a new module
(you can have your own FromBuilder , FormGenerator) but first let see some basics of this tool
## Create a new Field
<b>src/components/AppFormBuilder.tsx</b>
```jsx
import { FormBuilder } from '@/src/config';
import { useForm } from 'corleon-form-builder';
function AppFormBuilder() {
  const { createNewField , removeAll } = useForm();//add this tow methods

  <div className="w-full max-h-full overflow-y-auto p-4">
    <div className='flex mb-5'>
        <div className="flex gap-2">
           <button onClick={() => createNewField() /*use it at this point*/ }>"create new field"</button>
           <button onClick={() => removeAll() /*and this*/ }>"remove all fields"</button>
        </div>
    </div>
    <FormBuilder />
  </div>
}
export default AppFormBuilder;
```
<br/>
<p>
    in this state you shuld be able to create a schema of a form for your own at the ui . the logic is so simple but i will create a video of how to work with        the default module.
    <br/>
</p>
