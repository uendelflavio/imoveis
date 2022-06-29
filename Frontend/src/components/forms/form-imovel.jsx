import React, { useState, Fragment } from "react";
import { Formik, Form } from "formik";
import { Panel, PanelBody } from "../panel/panel";
import { Modal } from "reactstrap";
import * as Yup from "yup";
import SwitchInput from "../switch-input/switch-input";
import FieldInput from "../field-input/field-input";
import PanelHeaderOption from "../panel-header-option/panel-header-option";
import ButtonActionInput from "../button-action-input/button-action-input";
import ButtonModal from "../button-modal/button-modal";
import SelectInput from "../select-input/select-input";
import MaskInput from "../mask-input/mask-input";
import ImovelService from '../../services/ImovelService';
import { toast } from 'react-toastify';



const FormImovel = (props) => {

  const dados = [
      { value: '',text: ''   },
      { value: 'AC', text: 'Acre'   },
      { value: 'AL', text: 'Alagoas'},
      { value: 'AP', text: 'Amapá' },
      { value: 'AM', text: 'Amazonas' },
      { value: 'BA', text: 'Bahia' },
      { value: 'CE', text: 'Ceará' },
      { value: 'DF', text: 'Distrito Federal' },
      { value: 'ES', text: 'Espírito Santo' },
      { value: 'GO', text: 'Goiás' },
      { value: 'MA', text: 'Maranhão' },
      { value: 'MT', text: 'Mato Grosso' },
      { value: 'MS', text: 'Mato Grosso do Sul' },
      { value: 'MG', text: 'Minas Gerais' },
      { value: 'PA', text: 'Pará' },
      { value: 'PB', text: 'Paraíba' },
      { value: 'PR', text: 'Paraná' },
      { value: 'PE', text: 'Pernambuco' },
      { value: 'PI', text: 'Piauí' },
      { value: 'RJ', text: 'Rio de Janeiro' },
      { value: 'RN', text: 'Rio Grande do Norte' },
      { value: 'RS', text: 'Rio Grande do Sul' },
      { value: 'RO', text: 'Rondônia' },
      { value: 'RR', text: 'Roraima' },
      { value: 'SC', text: 'Santa Catarina' },
      { value: 'SP', text: 'São Paulo' },
      { value: 'SE', text: 'Sergipe' },
      { value: 'TO', text: 'Tocantins' }      
  ];

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
    endereco: Yup.string().min(4,'4 caracteres no mínimo').required("O endereço é obrigatório!"),
    numero: Yup.number().typeError("Digite um numero válido").required("O número é obrigatório!"),
    bairro: Yup.string().min(4,'4 caracteres no mínimo').required("O bairro é obrigatório!"),
    cep: Yup.string().min(10,'8 caracteres no mínimo').required("O cep é obrigatório!"),
    uf: Yup.string().ensure().required('A uf é obrigatório'),
    cidade: Yup.string().min(4,'4 caracteres no mínimo').required("A cidade é obrigatório!"),
  });


  const [modalOpen, setModalOpen] = useState(props.isModal);
  const toggle = () => {
    setModalOpen(!modalOpen);    
  }  

  
  return (
    <Fragment>
      <ButtonModal  isUpdated={props.isUpdated} toggle={toggle}/>
      <Modal centered toggle={toggle} isOpen={modalOpen} autoFocus={false} >
        <Panel className="mb-0" >
          <PanelHeaderOption isUpdated={props.isUpdated} isId={props.isId} />          
          <PanelBody>                                                    
            <Formik               
              onSubmit={(values) => onSubmit(values)}
              enableReinitialize={true}
              initialValues={{
                id: props.row.id,                 
                endereco:  props.row.endereco,
                numero: props.row.numero ,
                bairro: props.row.bairro,
                cep:  props.row.cep,
                cidade: props.row.cidade,                  
                uf: props.row.uf,
                vistoria: props.row.vistoria,
                ocupado:  props.row.ocupado,
                }}              
              validationSchema={validationSchema}             
              >
              <Form>                                
                <FieldInput label="Endereço" name="endereco" focus={true} />
                <FieldInput label="Número" name="numero"/>
                <FieldInput label="Bairro" name="bairro"/>                           
                <MaskInput label="Cep" name="cep" mask="99.999-999" value />
                <FieldInput label="Cidade" name="cidade"/>                
                <SelectInput label="Uf" name="uf" dados={dados} />
                <SwitchInput label="Vistoria" name="vistoria" checkStatus={props.row.vistoria} />   
                <SwitchInput label="Ocupado" name="ocupado" checkStatus={props.row.ocupado}/>                      
                <ButtonActionInput toggle={toggle} isUpdated={props.isUpdated} onSubmit={(values) => onSubmit(values)}/>
              </Form>
            </Formik>
            
          </PanelBody>
        </Panel>
      </Modal>
   
    </Fragment>
  );
};

export default FormImovel;
