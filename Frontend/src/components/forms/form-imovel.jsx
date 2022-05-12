import React, { Fragment } from 'react'
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from 'reactstrap';

const FormImovel = ({ isModal,isUpdated, isId }) => {  
  const [modalOpen, setModalOpen] = React.useState(isModal); 
  const toggle = () => setModalOpen(!modalOpen);

    return (
      <Fragment>
        {!isUpdated ?
          <button type="button" onClick={toggle} className="btn btn-success btn-icon btn-circle btn-lg me-2"><i className="fa fa-plus"></i></button> :
          <button type="button" onClick={toggle} className="btn btn-warning btn-icon btn-circle btn-lg me-2"><i className="fa fa-check "></i></button>        
        }
        <Modal centered toggle={toggle} isOpen={modalOpen}>
            <ModalHeader toggle={toggle} >{!isUpdated ? 'Incluir Novo Imóvel' : '[' + (isId).toString().padStart(3, "0") + '] - Atualizar Imóvel '}</ModalHeader>
          <ModalBody>
            ...
          </ModalBody>
          <ModalFooter>
              <button onClick={toggle}  className={`btn ${!isUpdated ? 'btn-success' : 'btn-warning'}`} >{!isUpdated ? 'Incluir' : 'Atualizar'}</button>
              <button onClick={toggle}  className="btn btn-inverse" >Sair</button>
          </ModalFooter>
        </Modal>
      </Fragment>      
  )
}

export default FormImovel
