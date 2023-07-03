import React from "react";
import { useForm } from "corleon-form-builder";
import SplitPane, { Pane } from "split-pane-react";
import 'split-pane-react/esm/themes/default.css';
import { FormBuilder, FormGenerator } from "@/src/config";

function App() {
  const { schema, createNewField, removeAll, errors, } = useForm();
  const [counter, setCounter] = React.useState(1)
  const [sizes, setSizes] = React.useState<number[] | string[]>([
    "80%",
    "20%"
  ]);

  return (
    <div dir="rtl" style={{ height: "100vh" }}>
      <SplitPane
        sashRender={() => <div className="bg-gray-400 w-full h-1"></div>}
        split='horizontal'
        sizes={sizes}
        onChange={(s) => { setSizes(s) }}
      >
        <Pane minSize={"10%"} maxSize={"90%"}>
          <div className="w-full h-full flex justify-between">
            <div className="w-full max-h-full overflow-y-auto p-4">
              <div className='flex mb-5'>
                <div className="flex gap-2">
                  <button onClick={() => { createNewField({ name: `field ${counter}` }); setCounter(x => x + 1) }}>"create new field"</button>
                  <button onClick={() => removeAll()} >"remove all fields"</button>
                </div>
              </div>
              <FormBuilder />
            </div>
            <div className="w-full flex flex-col items-center p-10">
              <div className="flex flex-col gap-4">
                <FormGenerator errors={errors} />
              </div>
            </div>
          </div>
        </Pane>
        <Pane minSize={"10%"} maxSize={"90%"}>
          <div dir="ltr" className='h-full flex justify-evenly overflow-y-auto'>
            <pre>
              {schema && JSON.stringify(schema, undefined, 4)}
            </pre>
            <pre>
              {schema && JSON.stringify(errors, undefined, 4)}
            </pre>
          </div>
        </Pane>
      </SplitPane>
    </div>
  );
}


export default App;
