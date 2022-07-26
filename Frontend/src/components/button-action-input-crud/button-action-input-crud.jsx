import React from 'react'
import { useFormikContext } from "formik";
import SweetAlert from 'react-bootstrap-sweetalert';
import { Button } from "reactstrap";

const ButtonActionInputCrud = (props) => {  
  const formik = useFormikContext();
  const [alertDelete, setAlertDelete] = React.useState(false);
  const [alertUpdate, setAlertUpdate] = React.useState(false);
  const [isNew, setIsNew] = React.useState(true);
  const toggleAlertDelete = (state) => { setAlertDelete(!alertDelete); }
  const toggleAlertUpdate = (state) => { setAlertUpdate(!alertUpdate); }
  const onClickDelete = (event) => { event.preventDefault(); setAlertDelete(true); }
  const onClickUpdate = (event) => { event.preventDefault(); setAlertUpdate(true); }
    
  return (
    <React.Fragment>
      <div className="d-flex justify-content-evenly hljs-wrapper rounded border border-1 p-1 mt-3">
      {isNew ?
          <Button
            onClick={() => { props.sendAction('new'); setIsNew(false);formik.submitForm(); }}
            className="btn-info btn-lg m-1"                    
            >
            <i className="fa fa-plus-circle me-2"/>
            Novo
          </Button>
      :
          <Button
            onClick={() => { props.sendAction('create'); setIsNew(true); formik.submitForm(); }}
            disabled={!formik.isValid}
            className="btn-success btn-lg m-1"                    
            >
            <i className="fa fa-plus me-2"/>
            Incluir
          </Button>
      }
      <Button
        disabled={!formik.isValid}
        onClick={onClickUpdate}                  
        className="btn-warning btn-lg m-1"
      >
      <i className="fa fa-edit me-2"/>
      Atualizar
      </Button>
      <Button       
        disabled={(props.id).toString().padStart(3, "0") === '000'}            
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
            title={<span>Deseja excluir o registro: {(props.id).toString().padStart(3, "0")}</span>}
            onConfirm={() => {
              props.sendAction('delete');             
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
            title={<span>Deseja atualizar o registro: {(props.id).toString().padStart(3, "0")}</span>}
            onConfirm={() => {
              props.sendAction('update');
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

export default ButtonActionInputCrud