import React from 'react';
import { Field, ErrorMessage } from "formik";
import TextError from "../text-error/text-error";
import InputMask from 'react-input-mask';


function MaskInput(props) {    
    return (
        <div className="row mb-1">
            <label className="form-label col-form-label col-md-2">{props.label}:</label>          
            <div className="col-md-10">                
                <Field name={props.name} label={props.label}>
                    {({ field, meta: { touched, error } }) => (
                        <InputMask                             
                            mask={props.mask}
                            type="text"                                                      
                            placeholder={props.label}
                            maskPlaceholder={null}
                            className={
                                touched && error
                                    ? "form-control is-invalid"
                                    : "form-control is-valid"
                            }
                            {...field}
                            autoFocus={props.focus}
                        />
                    )} 
                </Field>                
                <ErrorMessage name={props.name} component={TextError} />                
            </div>
        </div>
    );
}

export default MaskInput