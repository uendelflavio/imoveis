import React from "react"

import { Formik, Form } from "formik"
import { Panel, PanelBody } from "../panel/panel"
import { Modal, Button } from "reactstrap"
import { toast } from 'react-toastify'
import * as Yup from "yup"

import SwitchInput from "components/switch-input/switch-input"
import InputField from "components/input-field/input-field"
import PanelHeaderOption from "components/panel-header-option/panel-header-option"
import CrudInputActionButton from 'components/crud-input-action-button/crud-input-action-button'
import SelectInput from "components/select-input/select-input"
import MaskInput from "components/mask-input/mask-input"

import InputNumberField from 'components/input-number-field/input-number-field'
import { classificacao } from 'utils/util'
import { useDispatch, useSelector } from 'react-redux'
import { createImovelDetalhe, updateImovelDetalhe, deleteImovelDetalhe, listImovelWithDetalhes, resetImovelDetalhe } from '../../slices/imovel-detalhe-slice'


const FormImovelDetalhe = props => {
  
  const [modalOpen, setModalOpen] = React.useState(props.isModal);  
  const [isAction, setAction] = React.useState('');
  const imovel_detalhe = useSelector(state => state.imovelDetalheSlice);

  const data = React.useMemo(() => {
    if (imovel_detalhe[0]){
      return imovel_detalhe[0]
    }
    if (imovel_detalhe) {
      return imovel_detalhe
    }
  }, [imovel_detalhe]);
 
  const dispatch = useDispatch();
  const toggle = () => setModalOpen(!modalOpen)

  const onSubmit = async (values, actions) => { 
    switch(isAction) {
      case 'create':   
        dispatch(createImovelDetalhe({ data: values }))
        toast.success('Os Detalhes do Imovel foi criado com sucesso');        
        break;
      case 'update':                        
        dispatch(updateImovelDetalhe({ id: values.id, data: values }));
        toast.warning('Os Detalhes do Imovel foi atualizada com sucesso'); 
      break;
      case 'delete':                       
        dispatch(deleteImovelDetalhe({ id: values.id }))
        toast.error('Os Detalhes do Imovel foi apagada com sucesso');        
        break;
      default:   
        dispatch(listImovelWithDetalhes({ id: props.id })) 
        break;
    } 
    Promise.all([
      actions.resetForm(),
      actions.setSubmitting(false),
      dispatch(resetImovelDetalhe()),
      dispatch(listImovelWithDetalhes({ id: props.id }))
    ])
      .then((values) => console.log )
      .catch(console.log) 
  }
  
  const validationSchema = Yup.object({  
    area_total_m2: Yup.number().typeError("Digite um numero válido").required("O número da area total é obrigatório!"),                 
    area_total_construida_m2:  Yup.number().typeError("Digite um numero válido").required("O número da area total construida é obrigatório!"),
    numero_inscricao: Yup.string().required("O número de inscricao da agua é obrigatório!"),
    matricula_agua: Yup.string().required("O número da matricula da agua é obrigatório!").min(10, "A matricula contem 8 caracteres"),
    matricula_energia: Yup.string().required("O número da matricula da energia é obrigatório!").min(10, "A matricula contem 8 caracteres"),
    classificacao: Yup.string().required("A classificação é obrigatório!"),                  
    salas: Yup.number().typeError('Digite um numero válido'),
    quartos: Yup.number().typeError('Digite um numero válido'),
    banheiros: Yup.number().typeError('Digite um numero válido'),
    suites : Yup.number().typeError('Digite um numero válido'),                                 
    vagas_garagem: Yup.number().typeError('Digite um numero válido'),
  });
  
  return (
    <React.Fragment>
      <Button onClick={toggle} className="btn btn-lime btn-icon btn-circle btn-lg me-2" data-bs-toggle="tooltip" data-bs-placement="bottom" title="Cadastro dos Detalhes do Imóvel">
        <i className="fa fa-house-user"/>
      </Button>
      <Formik               
        onSubmit={(values, actions) => onSubmit(values, actions)}
        enableReinitialize={true}
        initialValues={{
          id: data.id || undefined,
          imovel_id: data.imovel_id,
          area_total_m2: data.area_total_m2,                 
          area_total_construida_m2:  data.area_total_construida_m2,
          numero_inscricao: data.numero_inscricao,
          matricula_agua: data.matricula_agua,
          matricula_energia: data.matricula_energia,
          classificacao: data.classificacao,                  
          salas: data.salas,
          quartos: data.quartos,
          banheiros: data.banheiros,
          suites: data.suites,
          vagas_garagem: data.vagas_garagem,
          area_lazer: data.area_lazer, 
          piscina: data.piscina, 
          agua_incluso: data.agua_incluso, 
          gas_incluso: data.gas_incluso, 
          seguranca_incluso: data.seguranca_incluso,                
        }}
        validationSchema={validationSchema}             
      >
        
        <Modal
          centered
          toggle={toggle}
          isOpen={modalOpen}
          autoFocus={false}
          onClosed={() => dispatch(resetImovelDetalhe())}
          onOpened={() => dispatch(listImovelWithDetalhes({ id: props.id }))}
        >
        <Panel className="mb-0" >
          <PanelHeaderOption  titleInsert="Novo Detalhe do Imóvel" titleUpdated="Atualizar Detalhes do Imóvel"/>           
          <PanelBody>                                                    
              <Form className="mb-0 border border-1 rounded p-2" >                   
                <InputField label="Area Total M&sup2;" name="area_total_m2" focus={true} />                
                <InputField label="Area Total Construida M&sup2;" name="area_total_construida_m2"/>
                <InputField label="Numero Inscrição Imóvel" name="numero_inscricao"/>                           
                <MaskInput label="Matrícula Agua" name="matricula_agua" mask="99.999-999" value />
                <MaskInput label="Matrícula Energia" name="matricula_energia" mask="99.999-999" value />                
                <SelectInput label="Classificação" name="classificacao" options={classificacao} />
                <InputNumberField label="Salas" name="salas"/>
                <InputNumberField label="Quartos" name="quartos"/>
                <InputNumberField label="Banheiros" name="banheiros" />  
                <InputNumberField label="Suites" name="suites"/>                                        
                <InputNumberField label="Vagas Garagem" name="vagas_garagem"/> 
                <SwitchInput label="Lazer" name="area_lazer" />   
                <SwitchInput label="Piscina" name="piscina" />                      
                <SwitchInput label="Agua Incluso" name="agua_incluso" />           
                <SwitchInput label="Gás Incluso" name="gas_incluso" />           
                <SwitchInput label="Segurança" name="seguranca_incluso" />                
                <CrudInputActionButton  toggle={toggle}  setAction={(action) => setAction(action)} onSubmit={(values, actions) => onSubmit(values, actions)} />                  
              </Form>                        
          </PanelBody>
          </Panel>
        </Modal>   
      </Formik>
    </React.Fragment>
  );
};

export default FormImovelDetalhe;
