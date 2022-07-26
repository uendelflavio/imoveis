import React from "react"; import { Formik, Form, Field } from "formik";
import { Panel, PanelBody } from "../panel/panel";
import { Modal, Button } from 'reactstrap';
import * as Yup from "yup";
import FieldInput from "../field-input/field-input";
import FieldInputFileImagem from "../field-input-file-imagem/field-input-file-imagem";
import PanelHeaderOption from "../panel-header-option/panel-header-option";
import ButtonActionInputCrud from '../button-action-input-crud/button-action-input-crud';
import CarouselImageGallery from '../carousel-image-gallery/carousel-image-gallery';
import { toast } from 'react-toastify';

import ImovelImagemService from '../../services/ImovelImagemService';
import ImovelService from '../../services/ImovelService';

const FormImovelImagem = (props) => {

  const [modalOpen, setModalOpen] = React.useState(props.isModal);
  const [data, setData] = React.useState([]);
  const [isAction, setAction] = React.useState('');     
  const [isWithImage, setWithImage] = React.useState(0);
  const [idImage, setIdImagem] = React.useState(0);
  const [isDescricao, setIsDescricao] = React.useState('');
  const [isImagem, setIsImagem] = React.useState('');
  const ref = React.useRef();  

  const fetchData = React.useCallback( async () => {
      const imovel_with_images = await ImovelService.getWithImages(props.id) 
      setWithImage(imovel_with_images.imovel_imagens.length)
      setData(imovel_with_images)
  }, [])
  
  React.useEffect(() => {
    fetchData();    
  }, []);
  
  const onSubmit = async (values, actions) => {
    values.imagem = values.imagem.base64;
    switch(isAction) {
    case 'create':
        await ImovelImagemService.create(values)
        toast.success('A Imagem foi criado com sucesso');
        break;
    case 'update':
        await ImovelImagemService.update(values.id,values)
        toast.success('A Imagem foi atualizada com sucesso');
      break;
    case 'delete':
        await ImovelImagemService.remove(values.id)
        toast.success('A Imagem foi apagada com sucesso');        
        break;
      case 'new': 
        setIdImagem(0) 
        setIsDescricao('')    
        setIsImagem('')
        ref.current.focus()
        
        break;
    default:
      
    }    
    fetchData();
  }

  const FILE_SIZE =  5 * 1024 * 1024; 
  const SUPPORTED_FORMATS = [
    "image/jpg",
    "image/jpeg",    
    "image/png"
  ];
  
  const validationSchema = Yup.object({  
    id: Yup.string().required(),
    imovel_id: Yup.string().required(),
    descricao: Yup.string().min(4, '4 caracteres no mínimo').required("A Descrição é obrigatória!"),
    imagem: Yup
      .mixed()
      .nullable()
      .required('O arquivo é obrigatório')
      .test(
        'type',
        'Formato de Arquivo não é suportado.',
        value => value && SUPPORTED_FORMATS.includes(value.type))
      .test(
        'size',
        'O Arquivo é muito grande.',
        value => value && value.size <= FILE_SIZE),    
  });

  const toggle = () => setModalOpen(!modalOpen)  
  const sendAction = (action) => setAction(action)
  
  return (
    <React.Fragment>
      <Button  onClick={toggle} className="btn btn-pink btn-icon btn-circle btn-lg me-2" data-bs-toggle="tooltip" data-bs-placement="bottom" title="Cadastro de Imagens do Imovel">
        <i className="fa fa-camera-retro"/>
      </Button>      
      <Modal  centered  toggle={toggle} isOpen={modalOpen} autoFocus={false} style={{maxWidth: '600px', width: '100%'}} >
        <Panel className="mb-0" >
          <PanelHeaderOption isUpdated={props.isUpdated} id={idImage} titleInsert="Nova Imagem de Vistoria do Imóvel" titleUpdated="Atualizar Imagem do Imóvel"/>          
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
                {isWithImage > 0 ? <CarouselImageGallery setIsImagem={setIsImagem} setIdImagem={setIdImagem} setIsDescricao={setIsDescricao}  data={data}/> : ''}
                <div className="d-flex bd-highlight">
                  <div className="p-1 bd-highlight col-sm-1" style={{ width: '60px' }}>
                    <Field type="text" className="form-control border-2 border-primary text-center" name="id"  />
                  </div>                  
                  <div className="p-1 bd-highlight col-sm-2">
                    <FieldInputFileImagem name="imagem" isImagem={isImagem} />
                  </div>           
                </div>
                <FieldInput ref={ref} label="Descrição" name="descricao"  />                                                                                         
                <ButtonActionInputCrud toggle={toggle} id={idImage} sendAction={sendAction} onSubmit={(values) => onSubmit(values)} />                  
              </Form>
            </Formik> 
          </PanelBody>
        </Panel>
      </Modal>   
    </React.Fragment>
  );
};

export default FormImovelImagem;