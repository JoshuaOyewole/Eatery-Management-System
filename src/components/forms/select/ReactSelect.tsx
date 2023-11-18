import React from 'react'
import Select, { ActionMeta, SingleValue } from 'react-select'
import { mealProps } from '../../../utils/types';


interface optionProps{
 /*  mealProps?: mealProps, */
  options: Array<{
    value: string,
    label: string
  }>,
  className:string,
  label?: string,
  id?: string,
  onChange: (newValue: SingleValue<{ value: string; label: string; }>, actionMeta: ActionMeta<{ value: string; label: string; }>)=>void
}

const ReactSelect: React.FunctionComponent<optionProps> = (props) => {
  return (
    <div>
        {props.label && <label htmlFor={props.id} className="mealLabel">{props.label} * </label>}
        <Select options={props.options} onChange={props.onChange}/>
    </div>
  );
};

export default ReactSelect;
