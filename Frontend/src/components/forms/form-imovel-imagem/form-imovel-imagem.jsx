import React from "react";
import { Field, Form, Formik } from "formik";
import { Panel, PanelBody } from "components/ui/panel/panel";
import { Button, Modal } from "reactstrap";
import { toast } from "react-toastify";
import { FILE_SIZE, SUPPORTED_FORMATS } from "constants/util-constants";
import * as Yup from "yup";
import PanelHeaderOption from "components/ui/panel-header-option/panel-header-option";
import ButtonCrud from "components/ui/button-crud/button-crud";
import CarouselImageGallery from "components/ui/carousel-image-gallery/carousel-image-gallery";
import InputFieldImagem from "components/ui/input-field-imagem/input-field-imagem";
import InputField from "components/ui/input-field/input-field";
import Base64 from "utils/base64";
import { useImovelImageStore } from "store/imovel-imagem-store";
// import { Debug } from "utils/debug-formik";

const FormImovelImagem = ({ name, isModal, imovel_id }) => {
  const [state, setState] = React.useState({
    action: "",
    name: name,
    imagem: "",
    modal: isModal,
    visible: false
  });

  const data = useImovelImageStore(state => state.imovelImagemData);

  const createImovelImage = useImovelImageStore(
    state => state.createImovelImage
  );
  const listImovelWithImages = useImovelImageStore(
    state => state.listImovelWithImages
  );
  const updateImovelImage = useImovelImageStore(
    state => state.updateImovelImage
  );
  const deleteImovelImage = useImovelImageStore(
    state => state.deleteImovelImage
  );
  const resetImovelImage = useImovelImageStore(state => state.resetImovelImage);

  React.useEffect(
    () => {
      if (state.modal) {
        setState({ ...state, visible: false });
        listImovelWithImages(imovel_id);
      }
    },
    [state.modal]
  );

  const CarouselInputImage = img => {
    if (img.visible) {
      return (
        <InputFieldImagem name="imagem" imagem={img.visible && state.imagem} />
      );
    } else {
      return (
        <div>
          <CarouselImageGallery
            modal={state.modal}
            setImagem={imagem =>
              !img.visible && setState({ ...state, imagem: imagem })}
            data={data}
          />
        </div>
      );
    }
  };

  const BtnModeEditUpdate = () => {
    return (
      <Button
        outline
        color={state.visible ? "dark" : "secondary"}
        onClick={() => {
          resetImovelImage(imovel_id);
          listImovelWithImages(imovel_id);
          setState({ ...state, visible: !state.visible });
        }}
        className="position-relative border-2 m-0">
        <i className="fa fa-upload me-1" />
        {state.visible ? "Modo Inclusão" : "Modo Edição"}
        {state.visible
          ? <span className="position-absolute top-0 start-100 translate-middle p-2 bg-dark border border-dark rounded-circle" />
          : <span className="position-absolute top-0 start-100 translate-middle p-2 bg-secondary border border-light rounded-circle" />}
      </Button>
    );
  };

  const toggle = () => setState({ ...state, modal: !state.modal });

  const onSubmit = async (values, actions) => {
    if (typeof values.imagem !== "undefined") {
      values.imagem = values.imagem.base64;
    }
    switch (state.action) {
      case "create":
        createImovelImage(values);
        toast.success("A Imagem foi armazenada com sucesso!!!");
        break;
      case "update":
        updateImovelImage(values);
        toast.warning("A Imagem foi atualizada com sucesso!!!");
        break;
      case "delete":
        deleteImovelImage(values.id);
        toast.error("A Imagem foi apagada com sucesso!!!");
        break;
      case "new":
        setState({ ...state, imagem: "" });
        resetImovelImage(imovel_id);
        break;
      default:
        setState({
          ...state,
          action: ""
        });
        listImovelWithImages(imovel_id);
        break;
    }
    actions.resetForm();
    actions.setSubmitting(false);
    if (state.action !== "new" || state.action !== "create") {
      setState({
        ...state,
        action: "",
        visible: true
      });
    } else {
      setState({ ...state, visible: false });
    }
  };

  const validationSchema = Yup.object({
    id: Yup.number().default(0).notRequired(),
    imovel_id: Yup.number().default(0).notRequired(),
    descricao: Yup.lazy(value => {
      if (typeof value === "undefined") {
        return Yup.string().required("A Descrição é obrigatória!");
      }
      if (typeof value === "string") {
        return Yup.string()
          .min(4, "4 caracteres no mínimo")
          .required("A Descrição é obrigatória!");
      }
    }),
    imagem: Yup.lazy(value => {
      if (typeof value === "undefined") {
        return Yup.mixed()
          .nullable()
          .required("O Arquivo com Imagem é obrigatório");
      }
      if (typeof value === "object") {
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
      }
      //valida quando valor for base64
      if (typeof value === "string") {
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
      }
    })
  });

  return (
    <React.Fragment>
      <Button
        name={`BtnFormImovelImagemOpen-${state.name}-${imovel_id}`}
        onClick={toggle}
        className="btn btn-pink btn-icon btn-circle btn-lg me-2"
        data-bs-toggle="tooltip"
        data-bs-placement="bottom"
        title="Cadastro de Imagens do Imovel">
        <i className="fa fa-camera-retro" />
      </Button>
      <Formik
        initialValues={{
          id: data.length === 0 ? "" : data.id,
          imovel_id: imovel_id,
          imagem: data.length === 0 ? "" : data.imagem,
          descricao: data.length === 0 ? "" : data.descricao
        }}
        onSubmit={(values, actions) => onSubmit(values, actions)}
        enableReinitialize={true}
        validationSchema={validationSchema}>
        <Modal
          centered
          toggle={toggle}
          isOpen={state.modal}
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

                <CarouselInputImage visible={state.visible} />
                <InputField label="Descrição" name="descricao" />
                <BtnModeEditUpdate />
                <ButtonCrud
                  toggle={toggle}
                  name="button-crud-form-imovel-imagem"
                  setAction={action =>
                    setState({
                      ...state,
                      action: action
                    })}
                />
                {/* <Debug /> */}
              </Form>
            </PanelBody>
          </Panel>
        </Modal>
      </Formik>
    </React.Fragment>
  );
};

export default FormImovelImagem;
