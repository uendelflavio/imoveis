import React from "react";
import { Field, ErrorMessage } from "formik";
import TextError from "../text-error/text-error";

const FieldInput = ({ label, name, focus}) => {
  return (
    <div className="row mb-1">
      <label className="form-label col-form-label col-md-2">{label}:</label>
      <div className="col-md-10">
        <Field type="text" name={name} id={name} >
          {({ field, meta: { touched, error } }) => (
            <input      
                
              className={
                touched && error
                  ? "form-control is-invalid"
                  : "form-control is-valid"
              }
              {...field}
              autoFocus={focus}
            />
          )}
        </Field>
        <ErrorMessage name={name} component={TextError} />
      </div>
    </div>
  );
};

export default FieldInput;