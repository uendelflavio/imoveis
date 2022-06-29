import React, { useState, Fragment } from "react";
import { Formik, Form } from "formik";
import { Panel, PanelBody } from "../panel/panel";
import { Modal } from "reactstrap";
// import * as Yup from "yup";
import FieldInput from "../field-input/field-input";
import FieldInputFile from "../field-input-file/field-input-file";
import PanelHeaderOption from "../panel-header-option/panel-header-option";
import ButtonActionInput from "../button-action-input/button-action-input";
import ImovelImagemService from '../../services/ImovelImagemService';
import { toast } from 'react-toastify';



const FormImovelImagem = (props) => {


  const onSubmit =  (values) => {  
    if (props.isUpdated) {
      ImovelImagemService.update(values.id, values);      
      toast.success('O imovel: '+values.id+' foi atualizado com sucesso');
    } else {
      ImovelImagemService.create(values);
      toast.success('O imovel foi criado com sucesso');
    }    
    setInterval(function () {window.location.reload();}, 500);
  }
  
  // const validationSchema = Yup.object({  
  //   imagem: Yup.string().min(4,'4 caracteres no mínimo').required("O endereço é obrigatório!"),
  //   descricao: Yup.string().min(4,'4 caracteres no mínimo').required("O endereço é obrigatório!"),
  // });


  const [modalOpen, setModalOpen] = useState(props.isModal);
  const toggle = () => {
    setModalOpen(!modalOpen);    
  }  

  
  return (
    <Fragment>
      <button type="button" onClick={toggle} className="btn btn-pink btn-icon btn-circle btn-lg me-2" >
        <i className="fa fa-camera-retro"></i>
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
                descricao: props.row.descricao ,
                }}              
              // validationSchema={validationSchema}             
              >
              <Form>                                
                <FieldInput label="Descrição" name="descricao"/>
                <FieldInputFile label="Image" name="image" focus={true} />                                     
                <ButtonActionInput toggle={toggle} isUpdated={props.isUpdated} onSubmit={(values) => onSubmit(values)}/>
              </Form>
            </Formik>            
          </PanelBody>
        </Panel>
      </Modal>
   
    </Fragment>
  );
};

export default FormImovelImagem;
