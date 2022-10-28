import React from 'react'
import NumericInput from 'react-numeric-input2';
import { useFormikContext } from "formik";

const InputNumberField =  props => {   
  
  const formik = useFormikContext();
  React.useMemo(() => {
    NumericInput.style.btn.right = '32px';
    NumericInput.style['btnUp.mobile'].width = '5ex';
    NumericInput.style['btnDown.mobile'].width = '5ex';
    NumericInput.style['btnUp.mobile'].borderRadius = '5px';
    NumericInput.style['btnDown.mobile'].borderRadius = '5px';
    NumericInput.style.input.color = 'green';
  },[]);
  
  return (
    <React.Fragment>
    <div className="mb-2">
      <label className="form-label">{props.label}:</label>
        <div className="col-md-12">  
              <NumericInput                
                min={0}
                max={100}           
                value={typeof formik.values[props.name] !== 'number'? '': formik.values[props.name]}
                step={1}
                placeholder={props.label}            
                onChange={(num) =>  formik.setFieldValue(props.name, num) }
                className={formik.errors[props.name] ? "form-control is-invalid": "form-control is-valid"}              
              />                               
          <div className="mt-1" style={{ width: '400px' }} >                  
            {  formik.errors[props.name]  ? <small className="bold text-danger">{formik.errors[props.name]}</small> : ''}                     
          </div> 
        </div>
      </div>      
    </React.Fragment>
  )
};
export default InputNumberField