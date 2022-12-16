import React from "react";
import { Form, Formik } from "formik";
import { Button, Modal } from "reactstrap";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { Panel, PanelBody } from "components/ui/panel/panel";
import SwitchInput from "components/ui/switch-input/switch-input";
import InputField from "components/ui/input-field/input-field";
import PanelHeaderOption from "components/ui/panel-header-option/panel-header-option";
import ButtonCrud from "components/ui/button-crud/button-crud";
import SelectInput from "components/ui/select-input/select-input";
import InputMask from "components/ui/input-mask/input-mask";
import InputNumberField from "components/ui/input-number-field/input-number-field";
import { classificacao } from "utils/util";
import { useImovelDetalheStore } from "store/imovel-detalhe-store";

const FormImovelDetalhe = props => {
  const data = useImovelDetalheStore(state => state.imovelDetalheData);
  const [state, setState] = React.useState({
    modal: props.isModal,
    action: ""
  });

  const listImovelWithDetalhes = useImovelDetalheStore(
    state => state.listImovelWithDetalhes
  );
  const createImovelDetalhe = useImovelDetalheStore(
    state => state.createImovelDetalhe
  );
  const updateImovelDetalhe = useImovelDetalheStore(
    state => state.updateImovelDetalhe
  );
  const deleteImovelDetalhe = useImovelDetalheStore(
    state => state.deleteImovelDetalhe
  );
  const resetImovelDetalhe = useImovelDetalheStore(
    state => state.resetImovelDetalhe
  );
  React.useEffect(
    () => {
      if (data.length === 0) listImovelWithDetalhes(props.imovel_id);
    },
    [listImovelWithDetalhes, props.imovel_id, data.length]
  );

  const toggle = () => setState({ ...state, modal: !state.modal });

  const onSubmit = async (values, actions) => {
    switch (state.action) {
      case "create":
        createImovelDetalhe(values);
        toast.success("Os Detalhes do Imovel foi criado com sucesso");
        break;
      case "update":
        updateImovelDetalhe(values);
        resetImovelDetalhe(props.imovel_id);
        listImovelWithDetalhes(props.imovel_id);
        toast.warning("Os Detalhes do Imovel foi atualizada com sucesso");
        break;
      case "delete":
        deleteImovelDetalhe(values.id);
        toast.error("Os Detalhes do Imovel foi apagada com sucesso");
        break;
      case "new":
        resetImovelDetalhe(props.imovel_id);
        break;
      default:
    }
    Promise.all([actions.resetForm(), actions.setSubmitting(false)]);
  };

  const validationSchema = Yup.object({
    id: Yup.number().default(0).notRequired(),
    imovel_id: Yup.number().default(0).notRequired(),
    area_total_m2: Yup.number()
      .typeError("Digite um numero válido")
      .required("O número da area total é obrigatório!"),
    area_total_construida_m2: Yup.number()
      .typeError("Digite um numero válido")
      .required("O número da area total construida é obrigatório!"),
    numero_inscricao: Yup.string()
      .required("O número de inscricao da agua é obrigatório!")
      .min(10, "A matricula contem 8 caracteres"),
    matricula_agua: Yup.string()
      .required("O número da matricula da agua é obrigatório!")
      .min(10, "A matricula contem 8 caracteres"),
    matricula_energia: Yup.string()
      .required("O número da matricula da energia é obrigatório!")
      .min(10, "A matricula contem 8 caracteres"),
    classificacao: Yup.string().required("A classificação é obrigatório!"),
    salas: Yup.number().typeError("Digite um numero válido"),
    quartos: Yup.number().typeError("Digite um numero válido"),
    banheiros: Yup.number().typeError("Digite um numero válido"),
    suites: Yup.number().typeError("Digite um numero válido"),
    vagas_garagem: Yup.number().typeError("Digite um numero válido")
  });

  return (
    <React.Fragment>
      <Button
        onClick={toggle}
        className="btn btn-lime btn-icon btn-circle btn-lg me-2"
        data-bs-toggle="tooltip"
        data-bs-placement="bottom"
        title="Cadastro dos Detalhes do Imóvel">
        <i className="fa fa-house-user" />
      </Button>
      <Formik
        onSubmit={(values, actions) => onSubmit(values, actions)}
        enableReinitialize={true}
        validationSchema={validationSchema}
        initialValues={{
          id: data.length === 0 ? 0 : data.id || "",
          imovel_id: data.length === 0 ? props.imovel_id : data.imovel_id || "",
          area_total_m2: data.length === 0 ? 0 : data.area_total_m2 || "",
          area_total_construida_m2:
            data.length === 0 ? "" : data.area_total_construida_m2 || "",
          numero_inscricao:
            data.length === 0 ? "" : data.numero_inscricao || "",
          matricula_agua: data.length === 0 ? "" : data.matricula_agua || "",
          matricula_energia:
            data.length === 0 ? "" : data.matricula_energia || "",
          classificacao: data.length === 0 ? "" : data.classificacao || "",
          salas: data.length === 0 ? 0 : data.salas || "",
          quartos: data.length === 0 ? 0 : data.quartos || "",
          banheiros: data.length === 0 ? 0 : data.banheiros || "",
          suites: data.length === 0 ? 0 : data.suites || "",
          vagas_garagem: data.length === 0 ? 0 : data.vagas_garagem || "",
          area_lazer: data.length === 0 ? false : data.area_lazer,
          piscina: data.length === 0 ? false : data.piscina,
          agua_incluso: data.length === 0 ? false : data.agua_incluso,
          gas_incluso: data.length === 0 ? false : data.gas_incluso,
          seguranca_incluso: data.length === 0 ? false : data.seguranca_incluso
        }}>
        <Modal
          centered
          toggle={toggle}
          isOpen={state.modal}
          autoFocus={false}
          onClosed={() => {
            resetImovelDetalhe(props.imovel_id);
            listImovelWithDetalhes(props.imovel_id);
          }}
          onOpened={() => {
            resetImovelDetalhe(props.imovel_id);
            listImovelWithDetalhes(props.imovel_id);
          }}>
          <Panel className="mb-0">
            <PanelHeaderOption
              titleInsert="Novo Detalhe do Imóvel"
              titleUpdated="Atualizar Detalhes do Imóvel"
            />
            <PanelBody>
              <Form className="mb-0 border border-1 rounded p-2">
                <input type="hidden" name="imovel_id" value="0" />
                <input type="hidden" name="id" value="0" />
                <InputField
                  label="Area Total M&sup2;"
                  name="area_total_m2"
                  focus={true}
                />
                <InputField
                  label="Area Total Construida M&sup2;"
                  name="area_total_construida_m2"
                />
                <InputMask
                  label="Numero Inscrição Imóvel"
                  name="numero_inscricao"
                  mask="99.999-999"
                  value
                />
                <InputMask
                  label="Matrícula Agua"
                  name="matricula_agua"
                  mask="99.999-999"
                  value
                />
                <InputMask
                  label="Matrícula Energia"
                  name="matricula_energia"
                  mask="99.999-999"
                  value
                />
                <SelectInput
                  label="Classificação"
                  name="classificacao"
                  options={classificacao}
                />
                <InputNumberField label="Salas" name="salas" />
                <InputNumberField label="Quartos" name="quartos" />
                <InputNumberField label="Banheiros" name="banheiros" />
                <InputNumberField label="Suites" name="suites" />
                <InputNumberField label="Vagas Garagem" name="vagas_garagem" />
                <SwitchInput label="Lazer" name="area_lazer" />
                <SwitchInput label="Piscina" name="piscina" />
                <SwitchInput label="Agua Incluso" name="agua_incluso" />
                <SwitchInput label="Gás Incluso" name="gas_incluso" />
                <SwitchInput label="Segurança" name="seguranca_incluso" />
                <ButtonCrud
                  toggle={toggle}
                  name="button-crud-from-imovel-detalhe"
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

export default FormImovelDetalhe;
