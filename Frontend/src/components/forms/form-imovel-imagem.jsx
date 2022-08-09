import React from "react";
import { Formik, Form, Field } from "formik";
import { Panel, PanelBody } from "../panel/panel";
import { Modal, Button } from 'reactstrap';
import * as Yup from "yup";
import InputField from "../input-field/input-field";
import FieldInputFileImagem from "../field-input-file-imagem/field-input-file-imagem";
import PanelHeaderOption from "../panel-header-option/panel-header-option";
import CrudInputActionButton from '../crud-input-action-button/crud-input-action-button';
import CarouselImageGallery from '../carousel-image-gallery/carousel-image-gallery';
import { toast } from 'react-toastify';

import ImovelService from '../../services/ImovelService';
import ImovelImagemService from '../../services/ImovelImagemService';
import { FILE_SIZE, SUPPORTED_FORMATS } from '../../constants/util';

const FormImovelImagem = (props) => {

  const [modalOpen, setModalOpen] = React.useState(props.isModal);
  const [data, setData] = React.useState([]);
  const [count, setCountImages] = React.useState(0);
  const [isAction, setAction] = React.useState('');     
  const [isIndex, setCurrentIndex] = React.useState(0);
  const ref = React.useRef();

  const fetchData = React.useCallback(async () => {
    const imovel_with_images = await ImovelService.getWithImages(props.id);
    const count_images = await ImovelImagemService.getCount(props.id);
    console.log(count_images);
    setData(imovel_with_images);
    setCountImages(count_images - 1)
  }, [props]);

  React.useEffect(() => {
    fetchData(); 
  }, [fetchData]);
  
  const onSubmit =  async (values, actions) => {    
    if (typeof values.imagem !== 'undefined' ) values.imagem = values.imagem.base64;    
    switch(isAction) {
      case 'create':        
        await ImovelImagemService.create(values);         
        toast.success('A Imagem foi armazenada com sucesso!!!');  
        setCurrentIndex(count);
        break;
    case 'update':        
        await ImovelImagemService.update(values.id, values);       
        toast.warning('A Imagem foi atualizada com sucesso!!!'); 
      break;
    case 'delete':                
        await ImovelImagemService.remove(values.id); 
        toast.error('A Imagem foi apagada com sucesso!!!');
        break;
    case 'new':
        clearForm(actions);
        break;
    default:
        fetchData();
        
    }               
    fetchData();
  }
  
  const validationSchema = Yup.object({  
    id: Yup
      .number()
      .required(),
    imovel_id: Yup
      .number()
      .required(),
    descricao: Yup
      .string()
      .min(4, '4 caracteres no mínimo')
      .required("A Descrição é obrigatória!"), 
    imagem: Yup
        .mixed()
        .required('O arquivo com imagem é obrigatório')
        .test('size', 'O arquivo de imagem é muito grande. Suporta 5 MegaBytes no máximo.', value => value && value.size <= FILE_SIZE)
        .test('type', 'Formato de arquivo de imagem não é suportado.', value => value && SUPPORTED_FORMATS.includes(value.type))          
  });
  
  const clearForm = actions => {    
    actions.resetForm();
    ref.current.focus();
  }

  const toggle = () => setModalOpen(!modalOpen)  
  const sendAction = action => setAction(action);
  
  return (
    <React.Fragment>
      <Button  onClick={toggle} className="btn btn-pink btn-icon btn-circle btn-lg me-2" data-bs-toggle="tooltip" data-bs-placement="bottom" title="Cadastro de Imagens do Imovel">
        <i className="fa fa-camera-retro"/>
      </Button>  
      <Formik               
          onSubmit={(values, actions) => onSubmit(values, actions)}
          enableReinitialize={true}
          validationSchema={validationSchema}
          initialValues={{                
              id: 0,
              imovel_id: props.id,
              imagem:  undefined,
              descricao: ''                   
          }}                         
      >
      <Modal  centered  toggle={toggle} isOpen={modalOpen} autoFocus={false} style={{maxWidth: '600px', width: '100%'}} >
        <Panel className="mb-0" >
          <PanelHeaderOption  titleInsert="Nova Imagem de Vistoria do Imóvel" titleUpdated="Atualizar Imagem do Imóvel"/>          
          <PanelBody>                       
              <Form className="mb-0 rounded p-1" >                                            
                <Field type="hidden" className="form-control" name="imovel_id" />              
                {data.length > 0 ? <CarouselImageGallery isIndex={isIndex} data={data} /> : ''}
                <FieldInputFileImagem name="imagem" />
                <Field type="text" className="form-control border-2 border-primary text-center" name="id" hidden />                                               
                <InputField ref={ref} label="Descrição" name="descricao" focus={true} />                                                                                         
                <CrudInputActionButton toggle={toggle} sendAction={sendAction} onSubmit={(values) => onSubmit(values)} />                  
              </Form>             
          </PanelBody>
        </Panel>
        </Modal>   
        </Formik>
    </React.Fragment>
  );
};

export default FormImovelImagem;