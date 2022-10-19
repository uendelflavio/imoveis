import React from 'react';
import { useFormikContext } from "formik";
import InputMask from 'react-input-mask';

const MaskInput = props => {
    const [state, setState] = React.useState();    
    const formik = useFormikContext();  

    return (
    <React.Fragment>
        <div className="mb-1">
            <label className="form-label">{props.label}:</label>          
                <div className="col-md-12">                
                    <InputMask                             
                        mask={props.mask}
                        name={props.name}
                        id={props.name}
                        value={state}
                        type="text"                                                      
                        placeholder={props.label}
                        maskPlaceholder={null}
                        autoFocus={props.focus}
                        onChange={(e) => {setState(e.target.value); formik.setFieldValue(props.name, state);} }                        
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