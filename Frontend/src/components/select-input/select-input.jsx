import React, {Fragment} from 'react'
import { Field, ErrorMessage } from "formik";
import TextError from "../text-error/text-error";

function SelectInput(props) {
    
            
  return (
    <Fragment>
        <div className="row mb-1">
            <label className="form-label col-form-label col-md-2">{props.label}:</label>
            <div className="col-md-10">
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
    </Fragment>
  )
}

export default SelectInput