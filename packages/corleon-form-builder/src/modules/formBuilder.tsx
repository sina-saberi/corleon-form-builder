import React from 'react';
import useForm from '../hooks/useForm';
import { IField } from '../models';
import Button from '../components/button/button';
import Modal from '../components/modal/modal';
import FieldSetting from './fieldSetting';

const FormBuilder = () =>
  () => {
    const [modal, setModal] = React.useState<{ id: string; tab: string; } | undefined>();
    const { removeField, schema, changeFieldPosition, constraint } = useForm();

    const onDrop = (field: IField) => (e: React.DragEvent) => {
      let fromId = e.dataTransfer.getData("text");
      if (fromId != field.uuid)
        changeFieldPosition(schema.find(x => x.uuid === fromId)!, field);
    }

    return (
      <div className='corleon-form-builder'>
        {schema && schema.map((field, index) => (
          <div
            key={index}
            draggable
            onDrop={onDrop(field)}
            onDragOver={e => e.preventDefault()}
            onDragStart={(e) => e.dataTransfer.setData("text", field.uuid)}
          >
            <div className={`form-builder-field`}>
              <span className='form-builder-field-name'>{field.name}</span>
              <span className='form-builder-field-type'>{constraint.type} : {field.type}</span>
              <div className='form-builder-field-actions'>
                <div>
                  <Button onClick={() => setModal({ id: field.uuid, tab: constraint.settings })} text={constraint.settings} />
                  <Button onClick={() => setModal({ id: field.uuid, tab: constraint.validation })} text={constraint.validation} />
                  {schema.length > 1 && <Button onClick={() => setModal({ id: field.uuid, tab: constraint.dependency })} text={constraint.dependency} />}
                  <Button onClick={() => removeField(field.uuid)} text={constraint.remove} />
                </div>
              </div>
            </div>
          </div>
        ))}
        {modal != undefined && <Modal onClose={() => setModal(undefined)}><FieldSetting {...modal} /></Modal>}
      </div>
    )
  }

export default FormBuilder