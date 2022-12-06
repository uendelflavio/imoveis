import React from "react";
import { Label } from "reactstrap";
import { Field, useFormikContext } from "formik";

const InputField = props => {
  const formik = useFormikContext();

  return (
    <React.Fragment>
      <div className="mb-1">
        <Label className="form-label">
          {props.label}:
        </Label>
        <div className="col-md-12">
          <Field
            name={props.name}
            value={formik.values[props.name] || ""}
            onChange={e => {
              formik.setFieldValue(props.name, e.target.value);
            }}
            className={
              formik.errors[props.name]
                ? "form-control is-invalid"
                : "form-control is-valid"
            }
            placeholder={props.label}
          />
        </div>
      </div>
      <div className="mt-1" style={{ width: "400px" }}>
        {formik.errors[props.name]
          ? <small className="bold text-danger">
              {formik.errors[props.name]}
            </small>
          : ""}
      </div>
    </React.Fragment>
  );
};

export default InputField;
