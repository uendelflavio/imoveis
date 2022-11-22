import React from "react";
import { Formik, Form, Field } from "formik";
import { Panel, PanelBody } from "components/ui/panel/panel";
import { Modal, Button, Input } from "reactstrap";
import { toast } from "react-toastify";
import { FILE_SIZE, SUPPORTED_FORMATS } from "constants/util-constants";
import * as Yup from "yup";
import InputField from "components/ui/input-field/input-field";
import PanelHeaderOption from "components/ui/panel-header-option/panel-header-option";
import ButtonCrud from "components/ui/button-crud/button-crud";
import CarouselImageGallery from "components/ui/carousel-image-gallery/carousel-image-gallery";

import { useDispatch, useSelector } from "react-redux";
import {
  listImovelWithImages,
  createImovelImage,
  updateImovelImage,
  deleteImovelImage,
  resetImovelImage
} from "slices/imovel-image-slice";
import { useLogger } from "react-use";

const FormImovelImagem = props => {
  const [modalOpen, setModalOpen] = React.useState(props.isModal);
  const [isAction, setAction] = React.useState("");
  const imovel_imagem = useSelector(state => state.imovelImageSlice);
  const dispatch = useDispatch();

  let data = React.useMemo(
    () => {
      if (imovel_imagem[0][0]) return imovel_imagem[0][0];
      if (imovel_imagem[0]) return imovel_imagem[0];
      if (imovel_imagem) return imovel_imagem;
      return [];
    },
    [imovel_imagem]
  );
  useLogger("data", data);
  const toggle = () => setModalOpen(!modalOpen);

  const onSubmit = async (values, actions) => {
    if (typeof values.imagem !== "undefined") {
      values.imagem = values.imagem.base64;
      switch (isAction) {
        case "create":
          dispatch(createImovelImage({ data: values }));
          toast.success("A Imagem foi armazenada com sucesso!!!");
          break;
        case "update":
          dispatch(updateImovelImage({ id: values.id, data: values }));
          actions.resetForm();
          toast.warning("A Imagem foi atualizada com sucesso!!!");
          break;
        case "delete":
          dispatch(deleteImovelImage({ id: values.id }));
          actions.resetForm();
          toast.error("A Imagem foi apagada com sucesso!!!");
          break;
        case "new":
          dispatch(resetImovelImage());
          dispatch(listImovelWithImages({ id: props.imovel_id }));
          break;
        default:
          dispatch(resetImovelImage());
          dispatch(listImovelWithImages({ id: props.imovel_id }));
      }
      Promise.all([
        dispatch(resetImovelImage()),
        dispatch(listImovelWithImages({ id: props.imovel_id })),
        actions.resetForm(),
        actions.setSubmitting(false),
        setModalOpen(false)
      ]);
    }
  };

  const validationSchema = Yup.object({
    id: Yup.number().required(),
    imovel_id: Yup.number().required(),
    descricao: Yup.string()
      .min(4, "4 caracteres no mínimo")
      .required("A Descrição é obrigatória!"),
    imagem: Yup.mixed()
      .nullable()
      .required("O arquivo com imagem é obrigatório")
      .test(
        "size",
        "O arquivo de imagem é muito grande. Suporta 5 MegaBytes no máximo.",
        value => value && value.size <= FILE_SIZE
      )
      .test(
        "type",
        "Formato de arquivo de imagem não é suportado.",
        value => value && SUPPORTED_FORMATS.includes(value.type)
      )
  });

  return (
    <React.Fragment>
      <Button
        onClick={toggle}
        className="btn btn-pink btn-icon btn-circle btn-lg me-2"
        data-bs-toggle="tooltip"
        data-bs-placement="bottom"
        title="Cadastro de Imagens do Imovel">
        <i className="fa fa-camera-retro" />
      </Button>
      <Formik
        onSubmit={(values, actions) => onSubmit(values, actions)}
        enableReinitialize={true}
        validationSchema={validationSchema}
        initialValues={{
          id: data.length === 0 ? 0 : data.id,
          imovel_id: data.length === 0 ? props.imovel_id : data.imovel_id,
          imagem: data.length === 0 ? undefined : data.imagem,
          descricao: data.length === 0 ? "" : data.descricao
        }}>
        <Modal
          centered
          toggle={toggle}
          isOpen={modalOpen}
          autoFocus={false}
          onClosed={() => {
            dispatch(listImovelWithImages({ id: props.imovel_id }));
            dispatch(resetImovelImage());
          }}
          onOpened={() => {
            dispatch(resetImovelImage());
            dispatch(listImovelWithImages({ id: props.imovel_id }));
          }}
          style={{ maxWidth: "600px", width: "100%" }}>
          <Panel className="mb-0">
            <PanelHeaderOption
              titleInsert="Nova Imagem de Vistoria do Imóvel"
              titleUpdated="Atualizar Imagem do Imóvel"
            />
            <PanelBody>
              <Form className="mb-0 rounded p-1">
                <Field type="text" name="id" hidden />
                <Field type="text" name="imovel_id" hidden />
                <Input type="file" name="imagem" hidden />
                <CarouselImageGallery />
                <InputField
                  label="Descrição"
                  name="descricao"
                  focus={true}
                  autoFocus
                />
                <ButtonCrud toggle={toggle} setAction={setAction} />
              </Form>
            </PanelBody>
          </Panel>
        </Modal>
      </Formik>
    </React.Fragment>
  );
};

export default FormImovelImagem;
