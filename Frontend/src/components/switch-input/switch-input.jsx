import React from "react";
import Switch from "react-switch";
import { Field } from "formik";

const SwitchInput = (props) => {
  const [check, setCheck] = React.useState(typeof props.checkStatus === 'undefined' ? false :props.checkStatus);
  const handleSwitch = (form) => {
    setCheck(!check);
    if (check) {
      form.setFieldValue(props.name, false,true);  
    } else {
      form.setFieldValue(props.name, true,false);
    }    
  };

  return (  
  <React.Fragment>
    <div className="d-inline-flex flex-row flex-direction: row align-items: start pt-2 pb-1">
        <div className="form-check">          
          <label>  
              <div className="d-flex  justify-content-center" >
              <strong>{props.label}</strong>   
              </div>
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
  </React.Fragment>
  );
};

export default SwitchInput;
