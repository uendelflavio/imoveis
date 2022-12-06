import React from 'react';
import { useFormikContext } from "formik";
import ReactInputMask from 'react-input-mask';
import { Label } from "reactstrap";
const InputMask = props => {
    const formik = useFormikContext();
    return (
    <React.Fragment>
        <div className="mb-1">
            <Label className="form-label">{props.label}:</Label>
                <div className="col-md-12">
                    <ReactInputMask
                        mask={props.mask}
                        name={props.name}
                        id={props.name}
                        value={formik.values[props.name] ?? '' }
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

export default InputMask
