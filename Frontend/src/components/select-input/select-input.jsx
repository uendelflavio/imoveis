import React from 'react';
import Select from 'react-select';
import { useFormikContext, useField } from "formik";

const SelectInput = (props) => {
  
  const [field] = useField(props.name);
  const formik = useFormikContext();  

  return (
    <React.Fragment>
      <div className="mb-1">
        <div className="col-md-12">
          <div className="form-group">
            <label htmlFor={props.label} className="form-label">
              {props.label}
            </label>    
                <Select            
                  name={props.name}       
                  options={props.options}
                  placeholder={props.label}
                  onChange={(v) => formik.setFieldValue(props.name, v.value)}               
                  value={props.options ? props.options.find((option) => option.value === field.value) : ''}
                  styles={{
                    container: (base) => ({
                      ...base,
                      borderRadius: '5px',
                      backgroundColor: formik.errors[props.name] ? '#ff5b57' : '#00acac',
                      padding: 1,
                    }),
                  }}                 
                />      
          </div>          
          <div className="mt-1" style={{ width: '400px' }} >                  
            { formik.errors[props.name]  ? <small className="bold text-danger">{formik.errors[props.name]}</small> : null}                     
          </div>         
        </div>
      </div>
    </React.Fragment>
  )
};






// import React from 'react';
// import Select from 'react-select';
// import { useField } from 'formik';
// import { FormGroup, Label } from "reactstrap";
// function SelectInput({ name,options,label, ...props }) {
//   const [field, meta, { setValue, setTouched }] = useField(props);
//   const onChange = value => setValue(value);
  
//   return (
//     <React.Fragment>
//       <FormGroup>
//         <Label for={props.label}>{props.label}</Label>
//         <Select
//         name={props.name}
//         defaultValue={options.find((option) => option.value === field.value)}
//         options={options}
//         onChange={onChange}
//         onBlur={setTouched}
//         />       
//       </FormGroup>
//       {meta.touched && meta.error ? (
//         <div className="form-text text-danger">{meta.error}</div>
//       ) : null}

//     </React.Fragment>
//   );
// }



export default SelectInput