import React from "react";
import { Formik, Form } from "formik";
import { Panel, PanelBody } from "../panel/panel";
import { Modal, Button } from "reactstrap";
import { toast } from 'react-toastify';
import * as Yup from "yup";
import SwitchInput from "../switch-input/switch-input";
import FieldInput from "../field-input/field-input";
import PanelHeaderOption from "../panel-header-option/panel-header-option";
import ButtonActionInputCrud from '../button-action-input-crud/button-action-input-crud';
import SelectInput from "../select-input/select-input";
import MaskInput from "../mask-input/mask-input";
import ImovelService from '../../services/ImovelService';
import ImovelDetalheService from '../../services/ImovelDetalheService';


const FormImovelDetalhe = (props) => {
  const [isAction, setAction] = React.useState('');
  const [data, setData] = React.useState([]);
  
  const fetchData = React.useCallback(async () => {
    const imovel_with_detalhes = await ImovelService.getWithDetalhes(props.id)   
      setData(imovel_with_detalhes)      
  }, [props]);

  React.useEffect(() => {
    fetchData(); 
  }, [fetchData]);
  console.log(data)
  const dados_classificacao = [          
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


  const onSubmit =  async (values, actions) => {
    console.log(isAction, '  ', values)       
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
    classificacao: Yup.string().min(10,'8 caracteres no mínimo').required("A classificação é obrigatório!"),                  
    salas: Yup.number().typeError("Digite um numero válido").required("O número de sala(s) é obrigatório!"),
    quartos: Yup.number().typeError("Digite um numero válido").required("O número de quarto(s) é obrigatório!"),
    banheiros:  Yup.number().typeError("Digite um numero válido").required("O número de banheiro(s) é obrigatório!"),
    suites:  Yup.number().typeError("Digite um numero válido").required("O número de suíte(s) é obrigatório!"),
    vagas_garagem:  Yup.number().typeError("Digite um numero válido").required("O número vaga(s) de garagem é obrigatório!"),
  });

  const [modalOpen, setModalOpen] = React.useState(props.isModal);
  const toggle = () => {
    setModalOpen(!modalOpen);    
  }  
  const sendAction = action => setAction(action)
  return (
    <React.Fragment>
      <Button onClick={toggle} className="btn btn-lime btn-icon btn-circle btn-lg me-2" data-bs-toggle="tooltip" data-bs-placement="bottom" title="Cadastro dos Detalhes do Imóvel">
        <i className="fa fa-house-user"/>
      </Button>
      <Modal centered toggle={toggle} isOpen={modalOpen} autoFocus={false} >
        <Panel className="mb-0" >
          <PanelHeaderOption  id={props.id} titleInsert="Novo Detalhe do Imóvel" titleUpdated="Atualizar Detalhes do Imóvel"/>           
          <PanelBody>                                                    
            <Formik               
              onSubmit={(values, actions) => onSubmit(values, actions)}
              enableReinitialize={true}
              initialValues={{
                id:data === null ? '' : data.id,
                area_total_m2: data === null ? '' : data.area_total_m2,                 
                area_total_construida_m2: data === null ? '' : data.area_total_construida_m2,
                numero_inscricao: data === null ? '' : data.numero_inscricao,
                matricula_agua: data === null ? '' : data.matricula_agua,
                matricula_energia: data === null ? '' : data.matricula_energia,
                classificacao: data === null ? '' : data.classificacao,                  
                salas: data === null ? '' : data.salas,
                quartos: data === null ? '' : data.quartos,
                banheiros: data === null ? '' : data.banheiros,
                suites: data === null ?'' : data.suites,
                vagas_garagem: data === null ? '' :  data.vagas_garagem,
                area_lazer: data === null ? false : data.area_lazer,
                piscina: data === null ? false : data.piscina,
                agua_incluso: data === null ? false :  data.agua_incluso,
                gas_incluso: data === null ? false :  data.gas_incluso,
                seguranca_incluso: data === null ? false : data.seguranca_incluso,
                imovel_id: data === null ? false : data.imovel_id,
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
                <FieldInput label="Vagas Garagem" name="vagas_garagem" />                
                <SwitchInput label="Lazer" name="area_lazer" checkStatus={data === null ? false : data.area_lazer} />   
                <SwitchInput label="Piscina" name="piscina" checkStatus={data === null ? false : data.piscina} />                      
                <SwitchInput label="Agua Incluso" name="agua_incluso" checkStatus={data === null ? false : data.agua_incluso} />           
                <SwitchInput label="Gás Incluso" name="gas_incluso" checkStatus={data === null ? false : data.gas_incluso} />           
                <SwitchInput label="Segurança" name="seguranca_incluso" checkStatus={data === null ? false : data.seguranca_incluso} />                   
                <ButtonActionInputCrud toggle={toggle} id={props.id}  sendAction={sendAction} onSubmit={(values) => onSubmit(values)} />                  
              </Form>
            </Formik>            
          </PanelBody>
        </Panel>
      </Modal>   
    </React.Fragment>
  );
};

export default FormImovelDetalhe;
