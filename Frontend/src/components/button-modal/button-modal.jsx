import React from 'react'
import { Button } from "reactstrap";
const ButtonModal = props => {
  
  return (
  <React.Fragment>
      {props.isAction === 'create' ? (
        <Button onClick={props.toggle} className="btn btn-success btn-icon btn-circle btn-lg me-2" data-bs-toggle="tooltip" data-bs-placement="bottom" title="Cadastra os Dados">
          <i className="fa fa-plus"></i>
        </Button>
      ) : (
        <Button  onClick={props.toggle} className="btn btn-warning btn-icon btn-circle btn-lg me-2" data-bs-toggle="tooltip" data-bs-placement="bottom" title="Atualiza os Dados">
          <i className="fa fa-check "></i>
        </Button>
      )}
  </React.Fragment>
  )
}

export default ButtonModal