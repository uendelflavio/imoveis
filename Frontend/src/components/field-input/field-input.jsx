import React,{ useState } from "react";
import { Field, ErrorMessage  } from "formik";
import TextError from "../text-error/text-error";

const FieldInput = (props) => {
  const [value, setValue] = useState(props.initialValue);
  const onChange = (e) => {
    setValue(e.target.value);
  };
  return (
    <React.Fragment>
    <div className="mb-1">
      <label className="form-label">{props.label}:</label>
      <div className="col-md-12">
        <Field
          type="text"
          name={props.name}
          id={props.name}>
          {({ field, meta: { touched, error } }) => (
            <input
              ref={props.inputRef}
              value={value}
              onChange={onChange}
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
    </React.Fragment>
  );
};

export default FieldInput;