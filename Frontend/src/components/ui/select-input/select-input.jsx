import React from "react";
import Select from "react-select";
import { useField, useFormikContext } from "formik";
import { Label } from "reactstrap";
const SelectInput = props => {
  const [field] = useField(props.name);
  const { setFieldValue, errors } = useFormikContext();

  return (
    <React.Fragment>
      <div className="mb-1">
        <div className="col-md-12">
          <div className="form-group">
            <Label htmlFor={props.label} className="form-label">
              {props.label}
            </Label>
            <Select
              name={`SelectInput-${props.name}`}
              options={props.options}
              placeholder={props.label}
              onChange={v => setFieldValue(props.name, v.value)}
              value={
                props.options
                  ? props.options.find(option => option.value === field.value)
                  : ""
              }
              styles={{
                container: base => ({
                  ...base,
                  borderRadius: "5px",
                  backgroundColor: errors[props.name] ? "#ff5b57" : "#00acac",
                  padding: 1
                })
              }}
            />
          </div>
          <div className="mt-1" style={{ width: "400px" }}>
            {errors[props.name]
              ? <small className="bold text-danger">
                  {errors[props.name]}
                </small>
              : null}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default SelectInput;
