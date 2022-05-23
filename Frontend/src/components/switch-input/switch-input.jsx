import React, { useState } from "react";
import Switch from "react-switch";
import { Field } from "formik";
const SwitchInput = ({ label, name, checkState=false }) => {
  const [check, setCheck] = useState(checkState);
  const handleSwitch = (form) => {
    setCheck(!check);
    form.setFieldValue(name, true, false);
  };
  return (   
      <div className="form-check form-check-inline">
        <label className="form-check-label col-form-label col-md-2">
          <span>{label}</span>
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
  );
};

export default SwitchInput;
