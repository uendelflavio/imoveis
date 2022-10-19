import React from "react";
import { useFormikContext } from "formik";

const InputField = props => {    
  const formik = useFormikContext();   
  const [state, setState] = React.useState('')
 
  return (
    <React.Fragment>
    <div className="mb-1">
      <label className="form-label">{props.label}:</label>
      <div className="col-md-12">         
          <input    
          id={props.name} 
          name={props.name}              
          value={state}
            onChange={(e) => { e.preventDefault(); setState(e.target.value); formik.setFieldValue(props.name, state); }}           
          className={
          formik.touched[props.name] && formik.errors[props.name]
              ? "form-control is-invalid"
              : "form-control is-valid"
          }    
          autoFocus={props.focus}
          placeholder={props.label}
        />        
        </div>
      </div>
      <div className="mt-1" style={{ width: '400px' }} >                  
        { formik.errors[props.name]  ? <small className="bold text-danger">{formik.errors[props.name]}</small> : null}                     
      </div>
    </React.Fragment>
  );
};

export default InputField;