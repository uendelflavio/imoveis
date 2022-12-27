import React from "react";
import { Field, Form, Formik } from "formik";
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
import { useImovelStore } from "store/imovel-store";

const FormImovel = props => {
  const data = useImovelStore(state => state.imoveisData);
  const [state, setState] = React.useState({
    id: props.data.length === 0 ? "0" : props.data.id,
    modal: props.data.length === 0 ? false : props.isModal,
    action: props.data.length === 0 ? "" : props.action
  });
  const createImovel = useImovelStore(state => state.createImovel);
  const updateImovel = useImovelStore(state => state.updateImovel);
  const listImoveis = useImovelStore(state => state.listImoveis);

  const toggle = () => setState({ ...state, modal: !state.modal });

  const onSubmit = (values, actions) => {
    switch (state.action) {
      case "create":
        createImovel(values);
        toast.success("O Imovel foi criado com sucesso");
        break;
      case "update":
        updateImovel(values);
        toast.warning("O Imovel foi atualizado com sucesso");
        break;
      default:
        actions.resetForm();
        actions.setSubmitting(false);
        toggle();
        break;
    }
    Promise.all([
      actions.resetForm(),
      actions.setSubmitting(false),
      listImoveis()
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
      <ButtonModal
        name="ButtonModalImovel"
        isAction={state.action}
        toggle={toggle}
      />
      <Formik
        onSubmit={(values, actions) => onSubmit(values, actions)}
        enableReinitialize={true}
        initialValues={{
          id: state.id,
          endereco: data.length === 0 ? "" : props.data.endereco,
          numero: data.length === 0 ? 0 : props.data.numero,
          bairro: data.length === 0 ? "" : props.data.bairro,
          cep: data.length === 0 ? "" : props.data.cep,
          cidade: data.length === 0 ? "" : props.data.cidade,
          complemento: data.length === 0 ? "" : props.data.complemento,
          uf: data.length === 0 ? "" : props.data.uf,
          vistoria: data.length === 0 ? false : props.data.vistoria,
          ocupado: data.length === 0 ? false : props.data.ocupado
        }}
        validationSchema={validationSchema}>
        <Modal centered toggle={toggle} isOpen={state.modal} autoFocus={false}>
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
                  setAction={action => setState({ ...state, action: action })}
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
