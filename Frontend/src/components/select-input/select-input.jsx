import React from 'react'
import { Field, ErrorMessage } from "formik";
import TextError from "../text-error/text-error";
import { Input,Label } from "reactstrap";
function SelectInput(props) {
    const [selected, setSelected] = React.useState('');  
    const handleChange = event => {
        console.log('Label 👉️', event.target.selectedOptions[0].label);
        console.log(event.target.value);
        setSelected(event.target.value);
    };

  return (
    <React.Fragment>
        <div className="mb-1">              
            <Label  >{props.label}</Label>
            <div className="col-md-12">
                <Field name={props.name} id={props.name}>
                    {({ field, meta: { touched, error } }) => (
                        <Input 
                        type="select"
                        onChange={handleChange}
                        value={selected}  
                        defaultValue={{ key: props.label, value: props.label }}           
                        className={
                        touched && error
                        ? "form-select is-invalid"
                        : "form-select is-valid"
                        }                        
                        {...field}
                    >      
                    <option value={props.label}>{props.label}</option>          
                    {props.dados.map(item => {
                        return (<option key={item.value} value={item.value}>{item.text}</option>);
                    })}
                    </Input>     
                    )}              
                </Field>
                <ErrorMessage name={props.name} component={TextError} />
           </div>
        </div>
    </React.Fragment>
  )
}

export default SelectInput