import React from 'react'
import { Button } from "reactstrap";
import { useFormikContext } from "formik";
const ButtonActionInputNew = props => {
    const formik = useFormikContext();
    return (
    <React.Fragment>
        <div className="d-flex justify-content-end">
            <Button
                    outline
                    color="info"
                    className='position-relative m-1 border-2 border-info text-center'                    
                    onClick={() => {
                        props.setDisableValidationImagem(true);
                        props.sendAction('new');
                        formik.submitForm();                        
                    }}                   
            >
            <i className="fa fa-plus-circle me-2"></i>
            Novo
            </Button>
        </div>
    </React.Fragment>
  )
}

export default ButtonActionInputNew