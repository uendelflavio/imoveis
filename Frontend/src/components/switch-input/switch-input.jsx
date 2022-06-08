import React, { useState } from "react";
import Switch from "react-switch";
import { Field } from "formik";

const SwitchInput = (props) => {
  const [check, setCheck] = useState(typeof props.checkStatus === 'undefined' ? false :props.checkStatus);
  const handleSwitch = (form) => {
    setCheck(!check);
    if (check) {
      form.setFieldValue(props.name, false,true);  
    } else {
      form.setFieldValue(props.name, true,false);
    }    
  };

  return (  
    <div className="d-inline-flex flex-row flex-direction: row align-items: start">
      <div className="form-check">
        <label className="form-check-label">
          <strong className="d-flex flex-wrap">{props.label}</strong>
          <Field name={props.name}>
            {({ form }) => (
              <Switch
                checked={check}
                onChange={() => handleSwitch(form)}              
                name={props.name}
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
