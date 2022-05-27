import { Field, ErrorMessage, useFormikContext} from "formik";
import TextError from "../text-error/text-error";
import InputMask from 'react-input-mask';
import React from 'react'

function MaskInput({ mask, name, label, focus }) {
    const { setFieldValue } = useFormikContext();  
    return (
        <div className="row mb-1">
            <label className="form-label col-form-label col-md-2">{label}:</label>
            <div className="col-md-10">                
                <Field
                    name={name}
                    label={label}
                    render={({ field, meta: { touched, error } }) => (
                        <InputMask                            
                            mask={mask}                       
                            className={
                                touched && error
                                ? "form-control is-invalid"
                                : "form-control is-valid"
                            }                            
                            placeholder={label}
                            type="text"
                            autoFocus={focus}
                            onChange={(e) => {
                                setFieldValue(name,e.target.value.replace(/\D/g, ''));
                            }}
                            {...field}
                        />
                )}>
                </Field>
                <ErrorMessage name={name} component={TextError} />
            </div>
        </div>
    );
}

export default MaskInput