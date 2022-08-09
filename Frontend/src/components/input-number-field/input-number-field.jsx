import React from 'react'
import NumericInput from 'react-numeric-input';
import { useFormikContext } from "formik";

const InputNumberField = (props) => {
  const formik = useFormikContext();
  NumericInput.style.btn.right = '32px';
  NumericInput.style['btnUp.mobile'].width = '5ex';
  NumericInput.style['btnDown.mobile'].width = '5ex';
  NumericInput.style['btnUp.mobile'].borderRadius = '5px';
  NumericInput.style['btnDown.mobile'].borderRadius = '5px';
  NumericInput.style.input.color = 'green';
  console.log(formik.errors[props.name]);
  return (
    <React.Fragment>
    <div className="mb-1">
      <label className="form-label">{props.label}:</label>
        <div className="col-md-12">                     
              <NumericInput
                min={0}
                max={100}
                value={0}
                step={1}
                name={props.name}
                placeholder={props.label}                
                className="form-control is-valid"
              /> 
        </div>
      </div>
    </React.Fragment>
  )
}

export default InputNumberField