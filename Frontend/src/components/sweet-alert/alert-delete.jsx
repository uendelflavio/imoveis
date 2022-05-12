import React, { Fragment }  from 'react'
import SweetAlert from 'react-bootstrap-sweetalert';


const AlertDelete = ({rowID}) => {  
    const onClickDelete = () => { setAlertDelete(true); }
    const toggleSweetAlert = (state) => {setAlertDelete(!sweetAlertDelete);}
    const [sweetAlertDelete, setAlertDelete] = React.useState(false);
    
    return (
      <Fragment>
        <button
          type="button"
          onClick={onClickDelete}
          className="btn btn-danger btn-icon btn-circle btn-lg me-2">
          <i className="fa fa-minus"></i>
        </button>
        {(sweetAlertDelete &&
          <SweetAlert danger showCancel
            cancelBtnText="Cancelar"
            confirmBtnBsStyle="danger"
            cancelBtnBsStyle="default"
            title={<span>Deseja excluir o registro: {(rowID).toString().padStart(3, "0")}</span>}
            onConfirm={() => toggleSweetAlert(false)}
            onCancel={() => toggleSweetAlert(false)}
            >
            Esta ação vai excluir permanentemente os dados.
            </SweetAlert>
        )}
      </Fragment>
    )
}

export default AlertDelete
