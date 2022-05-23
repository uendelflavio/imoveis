import React, {Fragment} from 'react'
import { Field, ErrorMessage } from "formik";
import TextError from "../text-error/text-error";

function SelectInput({ label, name, dados }) {
    
            
  return (
    <Fragment>
        <div className="row mb-1">
            <label className="form-label col-form-label col-md-2">{label}:</label>
            <div className="col-md-10">
                <Field name={name}>
                    {({ field, meta: { touched, error } }) => (
                    <select className={
                        touched && error
                        ? "form-select is-invalid"
                        : "form-select is-valid"
                    }  {...field}>                              
                    {dados.map(item => {
                        return (<option key={item.value} value={item.value}>{item.text}</option>);
                    })}
                    </select>     
                    )}              
                </Field>
                <ErrorMessage name={name} component={TextError} />
            </div>
        </div>
    </Fragment>
  )
}

export default SelectInput