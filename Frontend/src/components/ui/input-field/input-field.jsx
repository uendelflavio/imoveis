import React from "react";
import { useFormikContext } from "formik";

const InputField = props => {
  const formik = useFormikContext();

  return (
    <React.Fragment>
      <div className="mb-1">
        <label className="form-label">
          {props.label}:
        </label>
        <div className="col-md-12">
          <input
            name={props.name}
            value={formik.values[props.name] || ""}
            onChange={e => {
              e.preventDefault();
              formik.setFieldValue(props.name, e.target.value);
            }}
            className={
              formik.touched[props.name] && formik.errors[props.name]
                ? "form-control is-invalid"
                : "form-control is-valid"
            }
            autoFocus={props.focus}
            placeholder={props.label}
          />
        </div>
      </div>
      <div className="mt-1" style={{ width: "400px" }}>
        {formik.errors[props.name]
          ? <small className="bold text-danger">
              {formik.errors[props.name]}
            </small>
          : null}
      </div>
    </React.Fragment>
  );
};

export default InputField;
