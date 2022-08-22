import React from "react";
import { Formik, Form, Field } from "formik";
import { Panel, PanelBody } from "../panel/panel";
import { Modal, Button } from 'reactstrap';
import { toast } from 'react-toastify';
import { FILE_SIZE, SUPPORTED_FORMATS } from '../../constants/util-constants';
import * as Yup from "yup";
import InputField from "../input-field/input-field";
import FieldInputFileImagem from "../field-input-file-imagem/field-input-file-imagem";
import PanelHeaderOption from "../panel-header-option/panel-header-option";
import CrudInputActionButton from '../crud-input-action-button/crud-input-action-button';
import CarouselImageGallery from '../carousel-image-gallery/carousel-image-gallery';
import ImovelService from '../../services/imovel-service';
import ImovelImagemService from '../../services/imovel-imagem-service';
import { useList } from 'react-use';



const FormImovelImagem = (props) => {
  
  const [modalOpen, setModalOpen] = React.useState(props.isModal);
  // const [data, setData] = React.useState([]);
  // const [count_images, setCountImages] = React.useState(0);
  const [isAction, setAction] = React.useState('');
  const [data, { set }] = useList([]); 
  const ref = React.useRef();
  
  const fetchData = React.useCallback(async () => {
    const imovel_with_images = await ImovelService.getWithImages(props.id);
    // const images = await ImovelImagemService.getCount(props.id);
    set(imovel_with_images);
    // setCountImages(images);
  }, [props.id]);

  React.useEffect(() => {
    fetchData()
  }, [fetchData]);

  const onSubmit =  async (values, actions) => {    
    if (typeof values.imagem !== 'undefined' ) values.imagem = values.imagem.base64;    
    switch(isAction) {
      case 'create':        
        await ImovelImagemService.create(values);         
        toast.success('A Imagem foi armazenada com sucesso!!!');
        actions.resetForm();
        break;
      case 'update':  
        await ImovelImagemService.update(values.id, values);
        actions.resetForm();
        toast.warning('A Imagem foi atualizada com sucesso!!!'); 
        break;
      case 'delete':     
        await ImovelImagemService.remove(values.id);
        actions.resetForm();
        toast.error('A Imagem foi apagada com sucesso!!!');
        break;
      case 'new':
          actions.resetForm();
          ref.current.focus();
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
      .nullable()
      .required('O arquivo com imagem é obrigatório')
      .test('size', 'O arquivo de imagem é muito grande. Suporta 5 MegaBytes no máximo.', value => value && value.size <= FILE_SIZE)
      .test('type', 'Formato de arquivo de imagem não é suportado.', value => value && SUPPORTED_FORMATS.includes(value.type))          
  });
  
  const toggle = () => setModalOpen(!modalOpen)  
  
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
      <Modal  centered  toggle={toggle} isOpen={modalOpen} autoFocus={false} style={{maxWidth: '600px', width: '100%'}} onClosed={fetchData}  >
        <Panel className="mb-0" >
          <PanelHeaderOption  titleInsert="Nova Imagem de Vistoria do Imóvel" titleUpdated="Atualizar Imagem do Imóvel"/>          
          <PanelBody>                       
              <Form className="mb-0 rounded p-1" >
                <Field type="text" className="form-control border-2 border-primary text-center" name="id" hidden /> 
                <Field type="text" className="form-control" name="imovel_id" hidden />              
                <CarouselImageGallery data={data} fetchData={fetchData} />                 
                <InputField ref={ref} label="Descrição" name="descricao" focus={true} />
                <FieldInputFileImagem name="imagem" />                                                                                                                                     
                <CrudInputActionButton toggle={toggle} setAction={setAction}  />                  
              </Form>             
          </PanelBody>
        </Panel>
        </Modal>   
        </Formik>
    </React.Fragment>
  );
};

export default FormImovelImagem;