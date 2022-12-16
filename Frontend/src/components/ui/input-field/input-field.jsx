import React from "react";
import { Input, Label } from "reactstrap";
import { useFormikContext } from "formik";

const InputField = props => {
  const { values, setFieldValue, errors, touched } = useFormikContext();

  return (
    <React.Fragment>
      <div className="mb-1">
        <Label className="form-label">
          {props.label}:
        </Label>
        <div className="col-md-12">
          <Input
            name={`InputField-${props.name}`}
            value={values[props.name] || ""}
            onChange={e => {
              setFieldValue(props.name, e.target.value);
            }}
            className={
              errors[props.name]
                ? "form-control is-invalid"
                : "form-control is-valid"
            }
            placeholder={props.label}
          />
        </div>
      </div>
      <div className="mt-1" style={{ width: "400px" }}>
        {errors[props.name] && touched[props.name]
          ? <small className="bold text-danger">
              {errors[props.name]}
            </small>
          : ""}
      </div>
    </React.Fragment>
  );
};

export default InputField;
