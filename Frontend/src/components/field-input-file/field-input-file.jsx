import React from "react";
import { Field, ErrorMessage  } from "formik";
import TextError from "../text-error/text-error";

const FieldInputFile = (props) => {
  
  return (
    <div className="row mb-1">
      <label className="form-label col-form-label col-md-2">{props.label}:</label>
      <div className="col-md-10">
        <Field           
            name={props.name}            
            id={props.name}>
            {({ field, meta: { touched, error } }) => (
                <input
                    type="file"
                    accept=".jpg, .jpeg, .png"
                    className={
                        touched && error
                        ? "form-control is-invalid"
                        : "form-control is-valid"
                    }
                {...field}      
                />
            )}
        </Field>
        <ErrorMessage name={props.name} component={TextError} />
      </div>
    </div>

  );
};

export default FieldInputFile;