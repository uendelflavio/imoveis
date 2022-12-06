import React from "react";
import { Formik, Form, Field } from "formik";
import { Panel, PanelBody } from "components/ui/panel/panel";
import { Button, Modal } from "reactstrap";
import { toast } from "react-toastify";
import { FILE_SIZE, SUPPORTED_FORMATS } from "constants/util-constants";
import * as Yup from "yup";
import InputField from "components/ui/input-field/input-field";
import PanelHeaderOption from "components/ui/panel-header-option/panel-header-option";
import ButtonCrud from "components/ui/button-crud/button-crud";
import CarouselImageGallery from "components/ui/carousel-image-gallery/carousel-image-gallery";
import InputFieldImagem from "components/ui/input-field-imagem/input-field-imagem";
import Base64 from "utils/base64";
import { useDispatch, useSelector } from "react-redux";
import {
  createImovelImage,
  updateImovelImage,
  deleteImovelImage,
  listImovelWithImages,
  resetImovelImage
} from "slices/imovel-image-slice";

const FormImovelImagem = props => {
  const [modalOpen, setModalOpen] = React.useState(props.isModal);
  const [isAction, setAction] = React.useState("");
  const imovel_imagem = useSelector(state => state.imovelImageSlice);
  const dispatch = useDispatch();

  const data = React.useMemo(() => {
    if (imovel_imagem[0]) return imovel_imagem[0];
    else if (imovel_imagem) return imovel_imagem;
    else return [];
    // eslint-disable-next-line
  }, []);

  React.useEffect(
    () => {
      dispatch(
        listImovelWithImages({
          id: parseInt(props.imovel_id)
        })
      );
    },
    [dispatch, props.imovel_id]
  );

  const toggle = () => setModalOpen(!modalOpen);

  const onSubmit = async (values, actions) => {
    if (typeof values.imagem !== "undefined")
      values.imagem = values.imagem.base64;
    switch (isAction) {
      case "create":
        dispatch(
          createImovelImage({
            data: values
          })
        );
        toast.success("A Imagem foi armazenada com sucesso!!!");
        break;
      case "update":
        dispatch(
          updateImovelImage({
            id: values.id,
            data: values
          })
        );
        toast.warning("A Imagem foi atualizada com sucesso!!!");
        break;
      case "delete":
        dispatch(
          deleteImovelImage({
            id: values.id
          })
        );
        toast.error("A Imagem foi apagada com sucesso!!!");
        break;
      case "new":
        dispatch(resetImovelImage({ id: props.imovel_id }));
        break;
      default:
    }
    actions.resetForm();
    actions.setSubmitting(false);
  };

  const validationSchema = Yup.object({
    id: Yup.number().notRequired(),
    imovel_id: Yup.number().notRequired(),
    descricao: Yup.string()
      .min(4, "4 caracteres no mínimo")
      .required("A Descrição é obrigatória!"),
    imagem: Yup.lazy(value => {
      if (typeof value === "undefined") return Yup.mixed().notRequired();
      if (typeof value === "object")
        return Yup.mixed()
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
          );
      //valida quando valor for base64
      if (typeof value === "string")
        return Yup.string()
          .nullable()
          .required("O arquivo com imagem é obrigatório")
          .test(
            "size",
            "O arquivo de imagem é muito grande. Suporta 5 MegaBytes no máximo.",
            value =>
              Base64.isBase64Image(value) &&
              Base64.Base64Size(value) <= FILE_SIZE
          )
          .test(
            "type",
            "Formato de arquivo de imagem não é suportado.",
            value =>
              Base64.isBase64Image(value) &&
              SUPPORTED_FORMATS.includes(Base64.Base64MimeType(value))
          );
    })
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
        initialValues={{
          id: data.length === 0 ? 0 : data.id,
          imovel_id: props.imovel_id,
          imagem: data.length === 0 ? undefined : data.imagem,
          descricao: data.length === 0 ? "" : data.descricao
        }}
        onSubmit={(values, actions) => onSubmit(values, actions)}
        enableReinitialize={true}
        validationSchema={validationSchema}>
        <Modal
          centered
          toggle={toggle}
          isOpen={modalOpen}
          onClosed={() => {
            dispatch(
              resetImovelImage({
                imovel_id: props.imovel_id
              })
            );
            dispatch(listImovelWithImages({ id: props.imovel_id }));
          }}
          onOpened={() => {
            dispatch(
              resetImovelImage({
                imovel_id: props.imovel_id
              })
            );
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
                {isAction === "new"
                  ? <InputFieldImagem name="imagem" />
                  : <CarouselImageGallery name="carousel_imagem_gallery" />}
                <InputField label="Descrição" name="descricao" />
                <ButtonCrud
                  toggle={toggle}
                  name="ButtonCrudFormImovelImagem"
                  setAction={action => setAction(action)}
                />
              </Form>
            </PanelBody>
          </Panel>
        </Modal>
      </Formik>
    </React.Fragment>
  );
};

export default FormImovelImagem;
