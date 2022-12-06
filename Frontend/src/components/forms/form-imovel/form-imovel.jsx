import React from "react";
import { Formik, Form, Field } from "formik";
import { Panel, PanelBody } from "components/ui/panel/panel";
import { Modal } from "reactstrap";
import { toast } from "react-toastify";
import { uf } from "utils/util";
import * as Yup from "yup";
import SwitchInput from "components/ui/switch-input/switch-input";
import InputField from "components/ui/input-field/input-field";
import PanelHeaderOption from "components/ui/panel-header-option/panel-header-option";
import ButtonAction from "components/ui/button-action/button-action";
import ButtonModal from "components/ui/button-modal/button-modal";
import SelectInput from "components/ui/select-input/select-input";
import InputMask from "components/ui/input-mask/input-mask";

import { useDispatch } from "react-redux";
import {
  listImoveis,
  createImovel,
  updateImovel,
  resetImovel
} from "slices/imovel-slice";

const FormImovel = props => {
  const [modalOpen, setModalOpen] = React.useState(props.isModal);
  const [isAction, setAction] = React.useState(props.action);
  const dispatch = useDispatch();

  const toggle = () => setModalOpen(!modalOpen);

  const onSubmit = (values, actions) => {
    switch (isAction) {
      case "create":
        dispatch(createImovel({ data: values }));
        toast.success("O Imovel foi criado com sucesso");
        break;
      case "update":
        dispatch(updateImovel({ id: values.id, data: values }));
        toast.warning("O Imovel foi atualizado com sucesso");
        break;
      default:
        actions.resetForm();
        actions.setSubmitting(false);
        toggle();
        break;
    }
    Promise.all([
      dispatch(resetImovel()),
      actions.resetForm(),
      actions.setSubmitting(false),
      toggle()
    ]);
  };

  const validationSchema = Yup.object({
    endereco: Yup.string()
      .min(4, "4 caracteres no mínimo")
      .required("O endereço é obrigatório!"),
    numero: Yup.number()
      .typeError("Digite um numero válido")
      .required("O número é obrigatório!"),
    bairro: Yup.string()
      .min(4, "4 caracteres no mínimo")
      .required("O bairro é obrigatório!"),
    cep: Yup.string()
      .min(10, "8 caracteres no mínimo")
      .required("O cep é obrigatório!"),
    uf: Yup.string().ensure().required("A uf é obrigatório"),
    cidade: Yup.string()
      .min(4, "4 caracteres no mínimo")
      .required("A cidade é obrigatório!")
  });

  return (
    <React.Fragment>
      <ButtonModal isAction={isAction} toggle={toggle} />
      <Formik
        onSubmit={(values, actions) => onSubmit(values, actions)}
        enableReinitialize={true}
        initialValues={{
          id: isAction === "update" ? props.data.id : "",
          endereco: isAction === "update" ? props.data.endereco : "",
          numero: isAction === "update" ? props.data.numero : "",
          bairro: isAction === "update" ? props.data.bairro : "",
          cep: isAction === "update" ? props.data.cep : "",
          cidade: isAction === "update" ? props.data.cidade : "",
          complemento: isAction === "update" ? props.data.complemento : "",
          uf: isAction === "update" ? props.data.uf : "",
          vistoria: isAction === "update" ? props.data.vistoria : false,
          ocupado: isAction === "update" ? props.data.ocupado : false
        }}
        validationSchema={validationSchema}>
        <Modal
          centered
          toggle={toggle}
          isOpen={modalOpen}
          autoFocus={false}
          onClosed={() => {
            dispatch(listImoveis());
          }}>
          <Panel className="mb-0">
            <PanelHeaderOption
              titleInsert="Novo Imovel"
              titleUpdated="Atualizar Imóvel"
            />
            <PanelBody>
              <Form className="mb-0 border border-1 rounded p-2">
                <Field type="text" name="id" hidden />
                <InputField label="Endereço" name="endereco" focus={true} />
                <InputField label="Número" name="numero" />
                <InputField label="Bairro" name="bairro" />
                <InputField label="Complemento" name="complemento" />
                <InputMask label="Cep" name="cep" mask="99.999-999" value />
                <InputField label="Cidade" name="cidade" />
                <SelectInput label="Uf" name="uf" options={uf} />
                <SwitchInput label="Vistoria" name="vistoria" />
                <SwitchInput label="Ocupado" name="ocupado" />
                <ButtonAction
                  name="ButtonActionFormImovel"
                  toggle={toggle}
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

export default FormImovel;
