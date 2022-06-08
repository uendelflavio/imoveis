import React from "react";
import { Field, ErrorMessage  } from "formik";
import TextError from "../text-error/text-error";

const FieldInput = (props) => {
  
  return (
    <div className="row mb-1">
      <label className="form-label col-form-label col-md-2">{props.label}:</label>
      <div className="col-md-10">
        <Field
          type="text"
          name={props.name}
          id={props.name}>
          {({ field, meta: { touched, error } }) => (
            <input
              className={
                touched && error
                  ? "form-control is-invalid"
                  : "form-control is-valid"
              }
              {...field}
              autoFocus={props.focus}
              placeholder={props.label}
            />
          )}
        </Field>
        <ErrorMessage name={props.name} component={TextError} />
      </div>
    </div>

  );
};

export default FieldInput;