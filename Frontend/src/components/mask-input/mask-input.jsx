import React from 'react';
import { Field, ErrorMessage } from "formik";
import TextError from "../text-error/text-error";
import InputMask from 'react-input-mask';


function MaskInput(props) {    
    return (
        <React.Fragment>
        <div className="mb-1">
            <label className="form-label">{props.label}:</label>          
            <div className="col-md-12">                
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
        </React.Fragment>
    );
}

export default MaskInput