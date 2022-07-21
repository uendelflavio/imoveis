import React from 'react'
import { Field, ErrorMessage } from "formik";
import TextError from "../text-error/text-error";

function SelectInput(props) {
    
            
  return (
    <React.Fragment>
        <div className="mb-1">
            <label className="form-label">{props.label}:</label>
            <div className="col-md-12">
                <Field name={props.name} id={props.name}>
                    {({ field, meta: { touched, error } }) => (
                        <select
                        title="Choose one of the following..."
                        className={
                        touched && error
                        ? "form-select is-invalid"
                        : "form-select is-valid"
                        }
                        placeholder={props.label}
                        {...field}
                    >                              
                    {props.dados.map(item => {
                        return (<option key={item.value} value={item.value}>{item.text}</option>);
                    })}
                    </select>     
                    )}              
                </Field>
                <ErrorMessage name={props.name} component={TextError} />
           </div>
        </div>
    </React.Fragment>
  )
}

export default SelectInput