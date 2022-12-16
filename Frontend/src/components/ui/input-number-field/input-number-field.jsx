import React from "react";
import NumericInput from "react-numeric-input";
import { useFormikContext } from "formik";
import { Label } from "reactstrap";
const InputNumberField = props => {
  const { values, setFieldValue, errors } = useFormikContext();

  React.useMemo(() => {
    NumericInput.style.btn.right = "32px";
    NumericInput.style["btnUp.mobile"].width = "5ex";
    NumericInput.style["btnDown.mobile"].width = "5ex";
    NumericInput.style["btnUp.mobile"].borderRadius = "5px";
    NumericInput.style["btnDown.mobile"].borderRadius = "5px";

    NumericInput.style.input.color = "green";
    NumericInput.style.input.textaling = "center";
  }, []);

  return (
    <React.Fragment>
      <div className="mb-2">
        <Label className="form-label">
          {props.label}:
        </Label>
        <div className="col-md-12">
          <NumericInput
            min={0}
            max={100}
            name={`InputNumberField-${props.name}`}
            value={
              typeof values[props.name] !== "number" ? 0 : values[props.name]
            }
            step={1}
            placeholder={props.label}
            onChange={num => setFieldValue(props.name, num)}
            className={
              errors[props.name]
                ? "form-control is-invalid text-center"
                : "form-control is-valid text-center"
            }
          />
          <div className="mt-1" style={{ width: "400px" }}>
            {errors[props.name]
              ? <small className="bold text-danger">
                  {errors[props.name]}
                </small>
              : ""}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};
export default InputNumberField;
