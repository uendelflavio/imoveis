import React from "react";
import Switch from "react-switch";
import { useFormikContext } from "formik";


const SwitchInput = props => {  
  const formik = useFormikContext();  
  const checked = React.useMemo(() => {
    if (typeof formik.values[props.name] === 'undefined'){
      return false
    }
    if (typeof formik.values[props.name] !== 'undefined') {
      return formik.values[props.name]
    }
  }, [formik, props.name]);

  return (  
  <React.Fragment>
    <div className="d-inline-flex flex-row flex-direction: row align-items: start pt-2 pb-1">
        <div className="form-check">          
          <label>  
              <div className="d-flex  justify-content-center" >
              <strong>{props.label}</strong>   
              </div>           
                  <Switch
                    checked={checked}
                    onChange={() => {  checked ? formik.setFieldValue(props.name, false, true) : formik.setFieldValue(props.name, true, false)}}                                                       
                    name={props.name}
                    id={props.name}
                    className="react-switch"
                  />                                      
          </label>            
      </div>   
    </div>
  </React.Fragment>
  );
};

export default SwitchInput;
