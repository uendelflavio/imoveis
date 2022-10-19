import React from "react";
import { Formik, Form } from "formik";
import { Panel, PanelBody } from "../panel/panel";
import { Modal } from "reactstrap";
import { toast } from 'react-toastify';
import { uf } from 'utils/util'
import * as Yup from "yup";
import SwitchInput from "components/switch-input/switch-input";
import InputField from "components/input-field/input-field";
import PanelHeaderOption from "components/panel-header-option/panel-header-option";
import ActionButtonInput from "components/action-button-input/action-button-input";
import ButtonModal from "components/button-modal/button-modal";
import SelectInput from "components/select-input/select-input";
import MaskInput from "components/mask-input/mask-input";

const FormImovel = props => {

  const [modalOpen, setModalOpen] = React.useState(props.isModal);
  const [initialValues, setInitialValues] = React.useState(props.isModal);
  const toggle = () => setModalOpen(!modalOpen);
 
  React.useEffect(() => {
    if (typeof props.row === 'undefined') {
      setInitialValues({
        id:  undefined,                 
        endereco:   '',
        numero:  '',
        bairro:  '',
        cep:   '',
        cidade:  '',                  
        uf:  '',
        vistoria: false,
        ocupado: false,
      })          
    } else {
      setInitialValues({
        id: props.row.id,                 
        endereco:  props.row.endereco,
        numero: props.row.numero,
        bairro: props.row.bairro,
        cep:  props.row.cep,
        cidade: props.row.cidade,                  
        uf: props.row.uf,
        vistoria: props.row.vistoria|| false,
        ocupado:  props.row.ocupado|| false,
      })       
    } 
   }, [props.row,setInitialValues]);

  const onSubmit = (values,actions) => {  
    if (props.isUpdated) { 
      props.updateData(values.id, values)
      toast.success(`O imovel: ${values.id.toString().padStart(3, "0")} foi atualizado com sucesso`);
    } else {                
      props.createData(values)
      toast.success('O imovel foi criado com sucesso');
    }      
     Promise.all([
      actions.resetForm(),
      actions.setSubmitting(false),
      props.refreshData()      
    ])

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
      onSubmit={(values, actions) => onSubmit(values, actions)}
      enableReinitialize={true}
      initialValues={initialValues}
      validationSchema={validationSchema}             
      >        
        <Modal centered toggle={toggle} isOpen={modalOpen} autoFocus={false} > 
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