import React from "react";
import { Formik, Form } from "formik";
import { Panel, PanelBody } from "../panel/panel";
import { Modal } from "reactstrap";
import * as Yup from "yup";
import SwitchInput from "../switch-input/switch-input";
import FieldInput from "../field-input/field-input";
import PanelHeaderOption from "../panel-header-option/panel-header-option";
import ButtonActionInput from "../button-action-input/button-action-input";
import SelectInput from "../select-input/select-input";
import MaskInput from "../mask-input/mask-input";
import ImovelDetalheService from '../../services/ImovelDetalheService';
import { toast } from 'react-toastify';



const FormImovelDetalhe = (props) => {

  const dados_classificacao = [
      { value: '',text: ''   },
      { value: 'APARTAMENTO', text: 'APARTAMENTO'   },
      { value: 'APARTAMENTO COM CONDOMINIO', text: 'APARTAMENTO COM CONDOMINIO'},
      { value: 'CASA', text: 'CASA' },
      { value: 'CASA COM CONDOMINIO', text: 'CASA COM CONDOMINIO' },
      { value: 'BARRACÃO', text: 'BARRACÃO' },
      { value: 'FAZENDA/SITIO/CHACARA', text: 'FAZENDA/SITIO/CHACARA' },
      { value: 'GALPÃO', text: 'GALPÃO' },
      { value: 'LOJA', text: 'LOJA' },
      { value: 'LOTE', text: 'LOTE' },
      { value: 'TERRENO', text: 'TERRENO' },
      { value: 'SALA COMERCIAL', text: 'SALA COMERCIAL' },     
  ];

  const onSubmit =  (values) => {  
    if (props.isUpdated) {
      ImovelDetalheService.update(values.id, values);      
      toast.success('O imovel: '+values.id+' foi atualizado com sucesso');
    } else {
      ImovelDetalheService.create(values);
      toast.success('O imovel foi criado com sucesso');
    }    
    setInterval(function () {window.location.reload();}, 500);
  }
  
  const validationSchema = Yup.object({  
    area_total_m2: Yup.number().typeError("Digite um numero válido").required("O número é obrigatório!"),                 
    area_total_construida_m2:  Yup.number().typeError("Digite um numero válido").required("O número é obrigatório!"),
    numero_inscricao: props.row.numero_inscricao ,
    matricula_agua: Yup.number().typeError("Digite um numero válido").required("O número é obrigatório!"),
    matricula_energia:  Yup.number().typeError("Digite um numero válido").required("O número é obrigatório!"),
    classificacao: Yup.string().min(10,'8 caracteres no mínimo').required("O cep é obrigatório!"),                  
    salas: Yup.string().min(10,'8 caracteres no mínimo').required("O cep é obrigatório!"),
    quartos: Yup.string().min(10,'8 caracteres no mínimo').required("O cep é obrigatório!"),
    banheiros:  Yup.string().min(10,'8 caracteres no mínimo').required("O cep é obrigatório!"),
    suites:  Yup.string().min(10,'8 caracteres no mínimo').required("O cep é obrigatório!"),
    vagas_garagem:  Yup.string().min(10,'8 caracteres no mínimo').required("O cep é obrigatório!"),
  });

  const [modalOpen, setModalOpen] = React.useState(props.isModal);
  const toggle = () => {
    setModalOpen(!modalOpen);    
  }  

  return (
    <React.Fragment>
      <button type="button" onClick={toggle} className="btn btn-lime btn-icon btn-circle btn-lg me-2" data-bs-toggle="tooltip" data-bs-placement="bottom" title="Cadastro dos Detalhes do Imóvel">
        <i className="fa fa-house-user"></i>
      </button>
      <Modal centered toggle={toggle} isOpen={modalOpen} autoFocus={false} >
        <Panel className="mb-0" >
          <PanelHeaderOption isUpdated={props.isUpdated} isId={props.isId} titleInsert="Novo Detalhe do Imóvel" titleUpdated="Atualizar Detalhes do Imóvel"/>           
          <PanelBody>                                                    
            <Formik               
              onSubmit={(values) => onSubmit(values)}
              enableReinitialize={true}
              initialValues={{
                area_total_m2: props.row.area_total_m2,                 
                area_total_construida_m2:  props.row.area_total_construida_m2,
                numero_inscricao: props.row.numero_inscricao ,
                matricula_agua: props.row.matricula_agua,
                matricula_energia:  props.row.matricula_energia,
                classificacao: props.row.classificacao,                  
                salas: props.row.salas,
                quartos: props.row.quartos,
                banheiros:  props.row.banheiros,
                suites:  props.row.suites,
                vagas_garagem:  props.row.vagas_garagem,
                area_lazer:  props.row.area_lazer,
                piscina:  props.row.piscina,
                agua_incluso:  props.row.agua_incluso,
                gas_incluso:  props.row.gas_incluso,
                seguranca_incluso: props.row.seguranca_incluso,
                imovel_id: props.isId,
                }}              
              validationSchema={validationSchema}             
              >
              <Form className="mb-0 border border-1 rounded p-2" >                                
                <FieldInput label="Area Total M&sup2;" name="area_total_m2" focus={true} />
                <FieldInput label="Area Total Construida M&sup2;" name="area_total_construida_m2"/>
                <FieldInput label="Numero Inscrição Imovél" name="numero_inscricao"/>                           
                <MaskInput label="Matrícula Agua" name="matricula_agua" mask="99.999-999" value />
                <MaskInput label="Matrícula Energia" name="matricula_energia" mask="99.999-999" value />                
                <SelectInput label="Classificação" name="classificacao" dados={dados_classificacao} />
                <FieldInput label="Salas" name="salas" />
                <FieldInput label="Quartos" name="quartos" />
                <FieldInput label="Banheiros" name="banheiros" />
                <FieldInput label="Suites" name="suites" />
                <FieldInput label="Vagas Garagem" name="vagas_garagem"/>      
                <SwitchInput label="Área de Lazer" name="area_lazer" checkStatus={props.row.area_lazer} />   
                <SwitchInput label="Piscina" name="piscina" checkStatus={props.row.piscina} />                      
                <SwitchInput label="Agua Incluso" name="agua_incluso" checkStatus={props.row.agua_incluso} />           
                <SwitchInput label="Gás Incluso" name="gas_incluso" checkStatus={props.row.gas_incluso} />           
                <SwitchInput label="Seguranca Incluso" name="seguranca_incluso" checkStatus={props.row.seguranca_incluso}/>   
                <ButtonActionInput toggle={toggle} isUpdated={props.isUpdated} onSubmit={(values) => onSubmit(values)}/>
              </Form>
            </Formik>            
          </PanelBody>
        </Panel>
      </Modal>   
    </React.Fragment>
  );
};

export default FormImovelDetalhe;
