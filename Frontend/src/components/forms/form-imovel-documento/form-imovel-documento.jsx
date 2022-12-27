import React from "react";
import { Form, Formik } from "formik";
import { Panel, PanelBody } from "../panel/panel";
import { Button, Modal } from "reactstrap";
import * as Yup from "yup";
import InputField from "components/input-field/input-field";
import PanelHeaderOption from "components/panel-header-option/panel-header-option";
import ButtonActionInput from "components/button-action-input/button-action-input";
import ImovelService from "services/ImovelService";
import { toast } from "react-toastify";

const FormImovelDocumento = props => {
  const [state, setState] = React.useState({
    id: 0,
    action: "",
    modal: props.isModal,
    imovel_id: props.imovel_id
  });

  const toggle = () => setState({ ...state, modal: !state.modal });

  const onSubmit = values => {
    if (props.isUpdated) {
      ImovelService.update(values);
      toast.success("O imovel: " + values.id + " foi atualizado com sucesso");
    } else {
      ImovelService.create(values);
      toast.success("O imovel foi criado com sucesso");
    }
    setInterval(function() {
      window.location.reload();
    }, 500);
  };

  const validationSchema = Yup.object({
    link: Yup.string()
      .min(4, "4 caracteres no mínimo")
      .required("O endereço é obrigatório!"),
    descricao: Yup.string()
      .min(4, "4 caracteres no mínimo")
      .required("O endereço é obrigatório!")
  });

  return (
    <React.Fragment>
      <Button
        type="button"
        onClick={toggle}
        className="btn btn-purple btn-icon btn-circle btn-lg me-2"
        data-bs-toggle="tooltip"
        data-bs-placement="bottom"
        title="Cadastro de Documentos do Imovel">
        <i className="fa fa-file" />
      </Button>
      <Formik
        onSubmit={values => onSubmit(values)}
        enableReinitialize={true}
        initialValues={{
          id: props.row.id,
          imovel_id: state.imovel_id,
          link: props.row.link,
          descricao: props.row.descricao
        }}
        validationSchema={validationSchema}>
        <Modal centered toggle={toggle} isOpen={state.modal} autoFocus={false}>
          <Panel className="mb-0">
            <PanelHeaderOption
              id={props.id}
              titleInsert="Novo Documento do Imóvel"
              titleUpdated="Atualizar Documento do Imóvel"
            />
            <PanelBody>
              <Form className="mb-0 border border-1 rounded p-2">
                <InputField label="Link" name="link" focus={true} />
                <InputField label="Descrição" name="descricao" />
                <ButtonActionInput
                  toggle={toggle}
                  name="ButtonActionInputFormImovelDocumento"
                  isUpdated={props.isUpdated}
                />
              </Form>
            </PanelBody>
          </Panel>
        </Modal>
      </Formik>
    </React.Fragment>
  );
};

export default FormImovelDocumento;
