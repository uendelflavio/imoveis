import React from 'react'
import SweetAlert from 'react-bootstrap-sweetalert';
import { useFormikContext } from "formik";
import { Button } from "reactstrap";

const CrudInputActionButton = props => {  
  const formik = useFormikContext();
  const [alertDelete, setAlertDelete] = React.useState(false);
  const [alertUpdate, setAlertUpdate] = React.useState(false);
  const [isId, setId] = React.useState(formik.values.id);

  const toggleAlertDelete = (state) => { setAlertDelete(!alertDelete); }
  const toggleAlertUpdate = (state) => { setAlertUpdate(!alertUpdate); }
  
  const onClickDelete = (event) => { event.preventDefault(); setAlertDelete(true); }
  const onClickUpdate = (event) => { event.preventDefault(); setAlertUpdate(true); }

  React.useEffect(() => {
    setId(formik.values.id);    
  }, [formik.values.id]);
  
  return (
    <React.Fragment>
      <div className="d-flex justify-content-evenly hljs-wrapper rounded border border-1 p-1 mt-3">
        {isId > 0 ?
          <Button
            onClick={() => {props.setAction('new');  formik.submitForm();  }}
            className="btn-info btn-lg m-1"                    
            >
            <i className="fas fa-plus-circle me-2"/>
            Novo
          </Button> 
        :
          <Button
            onClick={() => {props.setAction('create');  formik.submitForm(); }}
            disabled={!formik.isValid}
            className="btn-success btn-lg m-1"                    
            >
            <i className="fa fa-plus me-2"/>
            Incluir
          </Button>      
      }
      <Button         
        disabled={typeof isId !== 'undefined' && formik.isValid && isId === 0 }
        onClick={onClickUpdate}                  
        className="btn-warning btn-lg m-1"
      >
      <i className="fa fa-edit me-2"/>
      Atualizar
      </Button>
      <Button       
        disabled={typeof isId !== 'undefined' && isId === 0 }            
        onClick={onClickDelete}
        className="btn-danger btn-lg m-1"
      >
      <i className="fa fa-minus me-2"/>
      Excluir
      </Button>
      <Button      
        onClick={props.toggle}
        className="btn-gray btn-lg m-1"
        >
        <i className="fa fa-door-open me-2"/>
        Sair
      </Button>
      {(alertDelete &&
          <SweetAlert danger showCancel
            cancelBtnText="Cancelar"
            confirmBtnBsStyle="danger"
            cancelBtnBsStyle="default"
            title={<span>Deseja excluir o registro: {isId.toString().padStart(3, "0")}</span>}
            onConfirm={() => {              
              props.setAction('delete');   
              formik.setSubmitting(true);
              formik.submitForm();
              toggleAlertDelete(false);
            }}
            onCancel={() => toggleAlertDelete(false)}
            >
            Esta ação vai excluir permanentemente os dados.
            </SweetAlert>
        )}
        {(alertUpdate &&
          <SweetAlert warning showCancel
            cancelBtnText="Cancelar"
            confirmBtnBsStyle="warning"
            cancelBtnBsStyle="default"
            title={<span>Deseja atualizar o registro: {isId.toString().padStart(3, "0")}</span>}
            onConfirm={() => {              
              props.setAction('update');
              formik.submitForm();
              toggleAlertUpdate(false);
            }}
            onCancel={() => toggleAlertUpdate(false)}
            >
            Esta ação concluira a atualizaçao completa do registro.
          </SweetAlert>
        )}
      </div>
      </React.Fragment>
  )
}

export default CrudInputActionButton