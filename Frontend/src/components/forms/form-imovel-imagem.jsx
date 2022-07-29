import React from "react";
import { Formik, Form, Field } from "formik";
import { Panel, PanelBody } from "../panel/panel";
import { Modal, Button } from 'reactstrap';
import * as Yup from "yup";
import FieldInput from "../field-input/field-input";
import FieldInputFileImagem from "../field-input-file-imagem/field-input-file-imagem";
import PanelHeaderOption from "../panel-header-option/panel-header-option";
import ButtonActionInputCrud from '../button-action-input-crud/button-action-input-crud';
import CarouselImageGallery from '../carousel-image-gallery/carousel-image-gallery';
import { toast } from 'react-toastify';

import ImovelService from '../../services/ImovelService';
import ImovelImagemService from '../../services/ImovelImagemService';
import { FILE_SIZE,SUPPORTED_FORMATS } from '../../constants/util';


const FormImovelImagem = (props) => {

  const [modalOpen, setModalOpen] = React.useState(props.isModal);
  const [data, setData] = React.useState([]);
  const [isAction, setAction] = React.useState('');     
  const [isWithImage, setWithImage] = React.useState(0);
  const [idImage, setIdImagem] = React.useState(0);
  const [isDescricao, setIsDescricao] = React.useState('');
  const [isImagem, setIsImagem] = React.useState(undefined);
  const [isDisableValidationImagem, setDisableValidationImagem] = React.useState(false);
  
  const ref = React.useRef();
  
  const fetchData = React.useCallback(async () => {
    const imovel_with_images = await ImovelService.getWithImages(props.id)
    setWithImage(imovel_with_images.length)
    setData(imovel_with_images)
    console.log(imovel_with_images)
  }, [props]);

  React.useEffect(() => {
    fetchData(); 
  }, [fetchData]);

  const onSubmit =  async (values, actions) => {
    
    if (typeof values.imagem !== 'undefined' ) values.imagem = values.imagem.base64;    
    switch(isAction) {
      case 'create':
        setDisableValidationImagem(false);
        await ImovelImagemService.create(values);   
        toast.success('A Imagem foi armazenada com sucesso!!!');        
        break;
    case 'update':
        setDisableValidationImagem(false);
        await ImovelImagemService.update(values.id, values);
        toast.warning('A Imagem foi atualizada com sucesso!!!'); 
      break;
    case 'delete':
        setDisableValidationImagem(true);
        await ImovelImagemService.remove(values.id); 
        toast.error('A Imagem foi apagada com sucesso!!!');
        ref.current.focus();
        break;
      default:
        
    }       
    clearForm(actions);    
    fetchData();
  }

  const validationSchema = Yup.object({  
    id: Yup.number().required(),
    imovel_id: Yup.number().required(),
    descricao: Yup.string().min(4, '4 caracteres no mínimo').required("A Descrição é obrigatória!"), 
    imagem: Yup.lazy((value) => {
      console.log(value,'  ',isDisableValidationImagem)
      if (typeof value === 'undefined' && isDisableValidationImagem) return Yup.mixed().notRequired();      
      return Yup
        .mixed()
        .nullable()
        .required('O arquivo com imagem é obrigatório')
        .test('size', 'O arquivo de imagem é muito grande. Suporta 5 MegaBytes no máximo.', value => value && value.size <= FILE_SIZE)
        .test('type', 'Formato de arquivo de imagem não é suportado.', value => value && SUPPORTED_FORMATS.includes(value.type));
        
    })    
  });

  const clearForm = actions => {    
    setIdImagem(0);
    setIsDescricao('');   
    setIsImagem(undefined);
    actions.resetForm();
    ref.current.focus();
  }

  const toggle = () => setModalOpen(!modalOpen)  
  const sendAction = action => setAction(action)
  
  return (
    <React.Fragment>
      <Button  onClick={toggle} className="btn btn-pink btn-icon btn-circle btn-lg me-2" data-bs-toggle="tooltip" data-bs-placement="bottom" title="Cadastro de Imagens do Imovel">
        <i className="fa fa-camera-retro"/>
      </Button>      
      <Modal  centered  toggle={toggle} isOpen={modalOpen} autoFocus={false} style={{maxWidth: '600px', width: '100%'}} >
        <Panel className="mb-0" >
          <PanelHeaderOption  id={idImage} titleInsert="Nova Imagem de Vistoria do Imóvel" titleUpdated="Atualizar Imagem do Imóvel"/>          
          <PanelBody>              
            <Formik               
              onSubmit={(values, actions) => onSubmit(values, actions)}
              enableReinitialize={true}
              validationSchema={validationSchema}
              initialValues={{                
                  id: idImage.toString().padStart(3, "0"),
                  imovel_id: props.id,
                  imagem:  isImagem,
                  descricao: isDescricao                   
              }}                         
              >
              <Form className="mb-0 rounded p-1" >                                            
                <Field type="hidden" className="form-control" name="imovel_id" />              
                {isWithImage > 0 ? <CarouselImageGallery setIsImagem={setIsImagem} setIdImagem={setIdImagem} setIsDescricao={setIsDescricao} data={data} /> : ''}
                <FieldInputFileImagem name="imagem" />
                <Field type="text" className="form-control border-2 border-primary text-center" name="id" hidden />                                               
                <FieldInput ref={ref} label="Descrição" name="descricao" focus={true} />                                                                                         
                <ButtonActionInputCrud toggle={toggle} id={idImage} setIsImagem={setIsImagem} sendAction={sendAction} onSubmit={(values) => onSubmit(values)} />                  
              </Form>
            </Formik> 
          </PanelBody>
        </Panel>
      </Modal>   
    </React.Fragment>
  );
};

export default FormImovelImagem;