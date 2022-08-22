import React from "react";

import { Formik, Form } from "formik";
import { Panel, PanelBody } from "../panel/panel";
import { Modal, Button } from "reactstrap";
import { toast } from 'react-toastify';
import * as Yup from "yup";

import SwitchInput from "../switch-input/switch-input";
import InputField from "../input-field/input-field";
import PanelHeaderOption from "../panel-header-option/panel-header-option";
import CrudInputActionButton from '../crud-input-action-button/crud-input-action-button';
import SelectInput from "../select-input/select-input";
import MaskInput from "../mask-input/mask-input";
import ImovelService from '../../services/imovel-service';
import ImovelDetalheService from '../../services/imovel-detalhe-service';
import InputNumberField from '../input-number-field/input-number-field';
import { classificacao } from '../../utils/util'

const FormImovelDetalhe = (props) => {
  const [isAction, setAction] = React.useState('');
  const [modalOpen, setModalOpen] = React.useState(props.isModal);
  const [data, setData] = React.useState([]); 
  const toggle = () => setModalOpen(!modalOpen);    
  const sendAction = action => setAction(action);
 
  const fetchData = React.useCallback(async () => {
    const imovel_with_detalhes = await ImovelService.getWithDetalhes(props.id)   
    if (imovel_with_detalhes !== null) setData(imovel_with_detalhes);
  }, [props]);

  React.useEffect(() => {
    fetchData(); 
  }, [fetchData]);
 
 
  const onSubmit =  async (values, actions) => {           
    switch(isAction) {
      case 'create':        
        await ImovelDetalheService.create(values); 
        toast.success('A Imagem foi criado com sucesso');        
        break;
    case 'update':        
        await ImovelDetalheService.update(values.id, values);
        toast.warning('A Imagem foi atualizada com sucesso'); 
      break;
    case 'delete':       
        await ImovelDetalheService.remove(values.id); 
        toast.error('A Imagem foi apagada com sucesso');        
        break;
      default:        
    }       
    actions.resetForm();       
  }

  const validationSchema = Yup.object({  
    area_total_m2: Yup.number().typeError("Digite um numero válido").required("O número da area total é obrigatório!"),                 
    area_total_construida_m2:  Yup.number().typeError("Digite um numero válido").required("O número da area total construida é obrigatório!"),
    numero_inscricao: Yup.string().required("O número de inscricao da agua é obrigatório!"),
    matricula_agua: Yup.string().required("O número da matricula da agua é obrigatório!"),
    matricula_energia:  Yup.string().required("O número da matricula da energia é obrigatório!"),
    classificacao: Yup.string().min(4,'4 caracteres no mínimo').required("A classificação é obrigatório!"),                  
    // salas: Yup.number().typeError("Digite um numero válido").required("O número de sala(s) é obrigatório!"),
    // quartos: Yup.number().typeError("Digite um numero válido").required("O número de quarto(s) é obrigatório!"),
    // banheiros:  Yup.number().typeError("Digite um numero válido").required("O número de banheiro(s) é obrigatório!"),
    // suites:  Yup.number().typeError("Digite um numero válido").required("O número de suíte(s) é obrigatório!"),
    // vagas_garagem:  Yup.number().typeError("Digite um numero válido").required("O número vaga(s) de garagem é obrigatório!"),
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
          id:  data.id,
          imovel_id:  data.imovel_id,
          area_total_m2:  data.area_total_m2,                 
          area_total_construida_m2:  data.area_total_construida_m2,
          numero_inscricao:  data.numero_inscricao,
          matricula_agua:  data.matricula_agua,
          matricula_energia:  data.matricula_energia,
          classificacao:  data.classificacao,                  
          salas:  data.salas,
          quartos:  data.quartos,
          banheiros:  data.banheiros,
          suites:  data.suites,
          vagas_garagem:   data.vagas_garagem,
          area_lazer:  data.area_lazer,
          piscina:  data.piscina,
          agua_incluso:  data.agua_incluso,
          gas_incluso:  data.gas_incluso,
          seguranca_incluso: data.seguranca_incluso,                
        }}              
        validationSchema={validationSchema}             
      >
      <Modal centered toggle={toggle} isOpen={modalOpen} autoFocus={false} >
        <Panel className="mb-0" >
          <PanelHeaderOption  titleInsert="Novo Detalhe do Imóvel" titleUpdated="Atualizar Detalhes do Imóvel"/>           
          <PanelBody>                                                    
              <Form className="mb-0 border border-1 rounded p-2" >                   
                <InputField label="Area Total M&sup2;" name="area_total_m2" focus={true} />                
                <InputField label="Area Total Construida M&sup2;" name="area_total_construida_m2"/>
                <InputField label="Numero Inscrição Imovél" name="numero_inscricao"/>                           
                <MaskInput label="Matrícula Agua" name="matricula_agua" mask="99.999-999" value />
                <MaskInput label="Matrícula Energia" name="matricula_energia" mask="99.999-999" value />                
                <SelectInput label="Classificação" name="classificacao" options={classificacao} />
                <InputNumberField label="Salas" name="salas"/>
                <InputNumberField label="Quartos" name="quartos"/>
                <InputNumberField label="Banheiros" name="banheiros"/>
                <InputNumberField label="Suites" name="suites"/>                                        
                <InputNumberField label="Vagas Garagem" name="vagas_garagem"/>          
                <SwitchInput label="Lazer" name="area_lazer" />   
                <SwitchInput label="Piscina" name="piscina" />                      
                <SwitchInput label="Agua Incluso" name="agua_incluso" />           
                <SwitchInput label="Gás Incluso" name="gas_incluso" />           
                <SwitchInput label="Segurança" name="seguranca_incluso"/>                   
                <CrudInputActionButton  toggle={toggle}  sendAction={sendAction} onSubmit={(values) => onSubmit(values)} />                  
              </Form>                        
          </PanelBody>
          </Panel>
        </Modal>   
      </Formik>
    </React.Fragment>
  );
};

export default FormImovelDetalhe;
