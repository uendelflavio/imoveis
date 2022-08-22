import React from "react";
import { Formik, Form } from "formik";
import { Panel, PanelBody } from "../panel/panel";
import { Modal } from "reactstrap";
import { toast } from 'react-toastify';
import { uf } from '../../utils/util'
import * as Yup from "yup";
import SwitchInput from "../switch-input/switch-input";
import InputField from "../input-field/input-field";
import PanelHeaderOption from "../panel-header-option/panel-header-option";
import ActionButtonInput from "../action-button-input/action-button-input";
import ButtonModal from "../button-modal/button-modal";
import SelectInput from "../select-input/select-input";
import MaskInput from "../mask-input/mask-input";
import ImovelService from '../../services/imovel-service'
import { useDispatch } from 'react-redux'
import { listImovel } from '../../slices/imovel-slice'

const FormImovel = props => {

  const [modalOpen, setModalOpen] = React.useState(props.isModal);
  const toggle = () => setModalOpen(!modalOpen);
  const dispatch = useDispatch();
  const refreshData = () => dispatch(listImovel());
 
  const onSubmit = (values) => {  
    if (props.isUpdated) { 
      ImovelService.update(values.id, values); 
      toast.success(`O imovel: ${values.id.toString().padStart(3, "0")} foi atualizado com sucesso`);
    } else {                
      ImovelService.create(values);
      toast.success('O imovel foi criado com sucesso');
    }    
  }
  
  const validationSchema = Yup.object({  
    endereco: Yup.string().min(4,'4 caracteres no mínimo').required("O endereço é obrigatório!"),
    numero: Yup.number().typeError("Digite um numero válido").required("O número é obrigatório!"),
    bairro: Yup.string().min(4,'4 caracteres no mínimo').required("O bairro é obrigatório!"),
    cep: Yup.string().min(10,'8 caracteres no mínimo').required("O cep é obrigatório!"),
    uf: Yup.string().ensure().required('A uf é obrigatório'),
    cidade: Yup.string().min(4,'4 caracteres no mínimo').required("A cidade é obrigatório!"),
  });
  
  return (
    <React.Fragment >
      <ButtonModal isUpdated={props.isUpdated} toggle={toggle} />
      <Formik               
      onSubmit={(values) => onSubmit(values)}
      enableReinitialize={true}
      initialValues={{
        id: props.row.id || undefined,                 
        endereco:  props.row.endereco || '',
        numero: props.row.numero || '',
        bairro: props.row.bairro || '',
        cep:  props.row.cep || '',
        cidade: props.row.cidade || '',                  
        uf: props.row.uf|| '',
        vistoria: props.row.vistoria|| false,
        ocupado:  props.row.ocupado|| false,
      }}              
      validationSchema={validationSchema}             
      >
        <Modal centered toggle={toggle} isOpen={modalOpen} autoFocus={false} onClosed={refreshData} >        
        <Panel className="mb-0" >
          <PanelHeaderOption titleInsert="Novo Imovel" titleUpdated="Atualizar Imóvel"/>          
          <PanelBody>                                                         
              <Form className="mb-0 border border-1 rounded p-2">                                
                <InputField label="Endereço" name="endereco" focus={true} />
                <InputField label="Número" name="numero"/>
                <InputField label="Bairro" name="bairro"/>                           
                <MaskInput label="Cep" name="cep" mask="99.999-999" value />
                <InputField label="Cidade" name="cidade"/>                
                <SelectInput label="Uf" name="uf" options={uf} />                                 
                <SwitchInput label="Vistoria" name="vistoria" />
                <SwitchInput label="Ocupado" name="ocupado" />                
                <ActionButtonInput toggle={toggle} isUpdated={props.isUpdated} onSubmit={(values) => onSubmit(values)}/>
              </Form>                        
          </PanelBody>
        </Panel>
      </Modal>   
    </Formik>
  </React.Fragment>
  );
};

export default FormImovel;