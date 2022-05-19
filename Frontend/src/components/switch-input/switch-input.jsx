import React, { useState, Fragment } from "react";
import Switch from "react-switch";
import { Field } from "formik";
const SwitchInput = ({ name }) => {
  const [check, setCheck] = useState(false);
  const handleSwitch = (form) => {
    setCheck(!check);
    form.setFieldValue(name, true, false);
  };
  return (
    <Fragment>
      <div className="form-check form-check-inline">
        <label className="form-check-label col-form-label col-md-2">
          <span>Vistoria</span>
          <Field>
            {({ form }) => (
              <Switch
                checked={check}
                onChange={() => handleSwitch(form)}
                name={name}
                className="react-switch"
              />
            )}
          </Field>
        </label>
      </div>
    </Fragment>
  );
};

export default SwitchInput;
