import React from 'react'
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from 'reactstrap';

export const FormImovel = () => {

const [modalDialog, setModal] = React.useState(false);
const [isUpdated, setIsUpdated] = React.useState(false);
const [isId, setID] = React.useState('');

function toggleModal(name, type_button, linha) {
    switch (name) {
      case 'modalDialog':
        setIsUpdated(type_button);
        setModal(!modalDialog);
        setID(linha)
        break;
      default:
        break;
    }
  }
    return (
      <div>
      <Modal centered isOpen={modalDialog} toggle={() => toggleModal('modalDialog')}>
        <ModalHeader toggle={() => toggleModal('modalDialog')} close={<button className="btn-close" onClick={() => toggleModal('modalDialog')}></button>}>{!isUpdated ? 'Incluir Novo Imóvel' : '[' + (isId).toString().padStart(3, "0") + '] - Atualizar Imóvel '}</ModalHeader>
        <ModalBody>
          ...
        </ModalBody>
        <ModalFooter>
          <button className={`btn ${!isUpdated ? 'btn-success' : 'btn-warning'}`} >{!isUpdated ? 'Incluir' : 'Atualizar'}</button>
          <button className="btn btn-inverse" onClick={() => toggleModal('modalDialog')}>Sair</button>
        </ModalFooter>
      </Modal>
      </div>
  )
}
