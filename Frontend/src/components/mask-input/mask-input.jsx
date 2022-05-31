import React from 'react';
import { Field, ErrorMessage } from "formik";
import TextError from "../text-error/text-error";
import InputMask from 'react-input-mask';


function MaskInput({ mask, name, label, focus  }) {    
    return (
        <div className="row mb-1">
            <label className="form-label col-form-label col-md-2">{label}:</label>          
            <div className="col-md-10">                
                <Field name={name} label={label}>
                    {({ field, meta: { touched, error } }) => (
                        <InputMask                             
                            mask={mask}
                            type="text"                                                      
                            placeholder={label}
                            maskPlaceholder={null}
                            className={
                                touched && error
                                    ? "form-control is-invalid"
                                    : "form-control is-valid"
                            }
                            {...field}
                            autoFocus={focus}
                        />
                    )} 
                </Field>                
                <ErrorMessage name={name} component={TextError} />                
            </div>
        </div>
    );
}

export default MaskInput