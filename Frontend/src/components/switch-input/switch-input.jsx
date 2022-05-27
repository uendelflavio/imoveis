import React, { useState } from "react";
import Switch from "react-switch";
import { Field } from "formik";

const SwitchInput = ({ label, name, checkStatus }) => {
  const [check, setCheck] = useState(checkStatus);
  const handleSwitch = (form) => {
    setCheck(!check);
    if (check) {
      form.setFieldValue(name, false,true);  
    } else {
      form.setFieldValue(name, true,false);
    }    
  };

  return (  
    <div className="d-inline-flex flex-row flex-direction: row align-items: start">
      <div className="form-check">
        <label className="form-check-label">
          <strong className="d-flex flex-wrap">{label}</strong>
          <Field name={name}>
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
    </div>
  );
};

export default SwitchInput;
