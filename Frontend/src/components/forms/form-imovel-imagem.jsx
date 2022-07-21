import React from "react"; import { Formik, Form, Field } from "formik";
import { Panel, PanelBody } from "../panel/panel";
import { Modal } from 'reactstrap';
import * as Yup from "yup";
import FieldInput from "../field-input/field-input";
import FieldInputFileImagem from "../field-input-file-imagem/field-input-file-imagem";
import PanelHeaderOption from "../panel-header-option/panel-header-option";
import ButtonActionInputCrud from '../button-action-input-crud/button-action-input-crud';

// import ImovelImagemService from '../../services/ImovelImagemService';
import CarouselImageGallery from '../carousel-image-gallery/carousel-image-gallery';
// import { toast } from 'react-toastify';

const FormImovelImagem = (props) => {

  const [modalOpen, setModalOpen] = React.useState(props.isModal);
  const [isFile, setLoadFile] = React.useState(0);
  const [isIdImage, setIdImage] = React.useState(0);
  const [isDescricao, setDescricao] = React.useState('');
  const [isAction, setAction] = React.useState('');      
  const inputRef = React.useRef(null);
  
 

  const onSubmit = (values) => {
    values.imagem = values.imagem.base64;
    // ImovelImagemService.create(values)
    // toast.success('O imovel foi criado com sucesso');
    // setInterval(function () {window.location.reload();}, 500);
    console.log(' acao: ',isAction,'   ',' valores: ',values);
    // actions.setSubmitting(false);
    // actions.resetForm({
    //   values: {            
    //     id: 0,
    //     imagem: '',
    //     descricao: '',
    //     imovel_id : 0
    //   },             
    // });
   
  }

  const FILE_SIZE =  5 * 1024 * 1024;   // 5MB
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

  const toggle = () => {
    setModalOpen(!modalOpen);    
  }

  const onFile = data => {   
    setLoadFile(data) 
    setIdImage(0)
    setDescricao('')
    inputRef.current.focus();    
  }

  const onDataImage = (id, descricao) => {    
   if (isFile === 0) {   
      setIdImage(id);
      setDescricao(descricao);
   }
  }
  
  const sendAction = (action) => setAction(action)
  

  return (
    <React.Fragment>
      <button type="button" onClick={toggle} className="btn btn-pink btn-icon btn-circle btn-lg me-2" data-bs-toggle="tooltip" data-bs-placement="bottom" title="Cadastro de Imagens do Imovel">
        <i className="fa fa-camera-retro"></i>
      </button>
      
      <Modal  centered  toggle={toggle} isOpen={modalOpen} autoFocus={false} style={{maxWidth: '600px', width: '100%'}} >
        <Panel className="mb-0" >
          <PanelHeaderOption isUpdated={props.isUpdated} isId={props.isId} titleInsert="Nova Imagem de Vistoria do Imóvel" titleUpdated="Atualizar Imagem do Imóvel"/>          
          <PanelBody>              
            <Formik               
              onSubmit={(values) => onSubmit(values)}
              enableReinitialize={true}
              validationSchema={validationSchema}
              initialValues={{                    
                  id: isIdImage.toString().padStart(3, "0"),
                  imovel_id: props.isId,
                  imagem:  undefined,
                  descricao: isDescricao                    
                }}                               
              >
              <Form className="mb-0 rounded p-1" >                                            
                <Field type="hidden" className="form-control" name="imovel_id" />                
                <CarouselImageGallery isId={props.isId} onDataImage={onDataImage} /> 
                <div className="d-flex bd-highlight">
                  <div className="p-1 bd-highlight col-sm-1" style={{ width: '60px' }}>
                    <Field type="text" className="form-control border-2 border-primary text-center" name="id" disable />
                  </div>                  
                  <div className="p-1 bd-highlight col-sm-2">
                    <FieldInputFileImagem name="imagem" isId={props.isId} onFile={onFile}  />
                  </div>                  
                </div>
                <FieldInput inputRef={inputRef} label="Descrição" name="descricao"  focus={true} />                                                                                         
                <ButtonActionInputCrud toggle={toggle} isFile={isFile} isId={isIdImage}  sendAction={sendAction} onSubmit={(values) => onSubmit(values)} />                  
              </Form>
              </Formik> 
          </PanelBody>
        </Panel>
      </Modal>   
    </React.Fragment>
  );
};

export default FormImovelImagem;
