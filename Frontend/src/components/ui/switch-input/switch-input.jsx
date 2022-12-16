import React from "react";
import Switch from "react-switch";
import { useFormikContext } from "formik";
import { Label } from "reactstrap";
const SwitchInput = props => {
  const { values, setFieldValue } = useFormikContext();
  const checked = React.useMemo(
    () => {
      if (typeof values[props.name] === "undefined") {
        return false;
      }
      if (typeof values[props.name] !== "undefined") {
        return values[props.name];
      }
    },
    [values, props.name]
  );

  return (
    <React.Fragment>
      <div className="d-inline-flex flex-row flex-direction: row align-items: start pt-2 pb-1">
        <div className="form-check">
          <Label>
            <div className="d-flex  justify-content-center">
              <strong>
                {props.label}
              </strong>
            </div>
            <Switch
              name={`SwitchInput-${props.name}`}
              className="react-switch"
              checked={checked}
              onChange={() => {
                checked
                  ? setFieldValue(props.name, false, true)
                  : setFieldValue(props.name, true, false);
              }}
            />
          </Label>
        </div>
      </div>
    </React.Fragment>
  );
};

export default SwitchInput;
