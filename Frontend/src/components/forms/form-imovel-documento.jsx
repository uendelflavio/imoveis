import React, { useState, Fragment } from "react";
import { Formik, Form } from "formik";
import { Panel, PanelBody } from "../panel/panel";
import { Modal } from "reactstrap";
import * as Yup from "yup";
import FieldInput from "../field-input/field-input";
import PanelHeaderOption from "../panel-header-option/panel-header-option";
import ButtonActionInput from "../button-action-input/button-action-input";
import ImovelService from '../../services/ImovelService';
import { toast } from 'react-toastify';



const FormImovelDocumento = (props) => {


  const onSubmit =  (values) => {  
    if (props.isUpdated) {
      ImovelService.update(values.id, values);      
      toast.success('O imovel: '+values.id+' foi atualizado com sucesso');
    } else {
      ImovelService.create(values);
      toast.success('O imovel foi criado com sucesso');
    }    
    setInterval(function () {window.location.reload();}, 500);
  }
  
  const validationSchema = Yup.object({  
    link: Yup.string().min(4,'4 caracteres no mínimo').required("O endereço é obrigatório!"),
    descricao: Yup.string().min(4,'4 caracteres no mínimo').required("O endereço é obrigatório!"),
  });


  const [modalOpen, setModalOpen] = useState(props.isModal);
  const toggle = () => {
    setModalOpen(!modalOpen);    
  }  

  
  return (
    <Fragment>
      <button type="button" onClick={toggle} className="btn btn-purple btn-icon btn-circle btn-lg me-2" >
        <i className="fa fa-file"></i>
      </button>
      <Modal centered toggle={toggle} isOpen={modalOpen} autoFocus={false} >
        <Panel className="mb-0" >
          <PanelHeaderOption isUpdated={props.isUpdated} isId={props.isId} />          
          <PanelBody>                                                    
            <Formik               
              onSubmit={(values) => onSubmit(values)}
              enableReinitialize={true}
              initialValues={{
                id: props.row.id,   
                imovel_id: props.isId,
                link:  props.row.link,
                descricao: props.row.descricao,
                
                }}              
              validationSchema={validationSchema}             
              >
              <Form>                                
                <FieldInput label="Link" name="link" focus={true} />
                <FieldInput label="Descrição" name="descricao"/>                     
                <ButtonActionInput toggle={toggle} isUpdated={props.isUpdated} onSubmit={(values) => onSubmit(values)}/>
              </Form>
            </Formik>            
          </PanelBody>
        </Panel>
      </Modal>
   
    </Fragment>
  );
};

export default FormImovelDocumento;