import React from 'react'
import SweetAlert from 'react-bootstrap-sweetalert';
import { Button } from "reactstrap";
import { useToggle } from 'react-use';
const AlertDelete = (props) => {  
    const onClickDelete = () => { setAlertDelete(true); }
    const toggleSweetAlert = (state) => {setAlertDelete(!sweetAlertDelete);}
    const [sweetAlertDelete, setAlertDelete] = useToggle(false);
        
    return (
      <React.Fragment>
        <Button
          onClick={onClickDelete}
          className="btn btn-danger btn-icon btn-circle btn-lg me-2"
          data-bs-toggle="tooltip"
          data-bs-placement="bottom"
          title="Excluir os Dados">
          <i className="fa fa-minus"/>
        </Button>        
        {(sweetAlertDelete &&
          <SweetAlert danger showCancel
            cancelBtnText="Cancelar"
            confirmBtnBsStyle="danger"
            cancelBtnBsStyle="default"            
            title={<span>Deseja excluir o registro: {(props.id).toString().padStart(3, "0")}</span>}
            onConfirm={() => { toggleSweetAlert(false); props.deleteData(props.id); }}
            onCancel={() => toggleSweetAlert(false) }            
            >
            Esta ação vai excluir permanentemente os dados.
          </SweetAlert>
        )}
      </React.Fragment>
    )
}

export default AlertDelete
