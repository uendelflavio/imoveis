import React from 'react';
import { useFormikContext, useField } from "formik";
import InputMask from 'react-input-mask';

const MaskInput = props => {

    const [field] = useField(props.name);
    const formik = useFormikContext();  
    // console.log(field.value)
    return (
    <React.Fragment>
        <div className="mb-1">
            <label className="form-label">{props.label}:</label>          
                <div className="col-md-12">                
                    <InputMask                             
                        mask={props.mask}
                        name={props.name}
                        id={props.name}
                        value={field.value}
                        type="text"                                                      
                        placeholder={props.label}
                        maskPlaceholder={null}
                        autoFocus={props.focus}
                        onChange={(e) =>  formik.setFieldValue(props.name, e.target.value) }                        
                        className={ formik.errors[props.name]? "form-control is-invalid": "form-control is-valid"}                                      
                    />               
                    <div className="mt-1" style={{ width: '400px' }} >                  
                        { formik.errors[props.name]  ? <small className="bold text-danger">{formik.errors[props.name]}</small> : ''}                     
                    </div>                
                </div>
            </div>
        </React.Fragment>
    );
}

export default MaskInput