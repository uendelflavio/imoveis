import React, { useState, Fragment } from "react";
import { Formik, Form } from "formik";
import { Panel, PanelBody } from "../panel/panel";
import { Modal } from "reactstrap";
import * as Yup from "yup";
import SwitchInput from "../switch-input/switch-input";
import FieldInput from "../field-input/field-input";
import PanelHeaderOption from "../panel-header-option/panel-header-option";
import ButtonActionInput from "../button-action-input/button-action-input";

const initialValues = {
  endereco: "",
  numero: "",
  bairro: "",
  cep: "",
  cidade: "",
  vistoria: false,
  ocupado: false,
};

const onSubmit = (values) => {
  console.log(values);
};

const validationSchema = Yup.object({
  endereco: Yup.string().required("o endereço e obrigatorio!"),
  numero: Yup.number()
    .typeError("Digite um numero válido")
    .required("o numero e obrigatorio!"),
  bairro: Yup.string().required("o bairro e obrigatorio!"),
  cep: Yup.number()
    .typeError("Digite um numero válido")
    .required("o cep e obrigatorio!"),
  cidade: Yup.string().required("o cidade e obrigatorio!"),
});

const FormImovel = ({ isModal, isUpdated, isId }) => {
  const [modalOpen, setModalOpen] = useState(isModal);
  const toggle = () => setModalOpen(!modalOpen);

  return (
    <Fragment>
      {!isUpdated ? (
        <button
          type="button"
          onClick={toggle}
          className="btn btn-success btn-icon btn-circle btn-lg me-2"
        >
          <i className="fa fa-plus"></i>
        </button>
      ) : (
        <button
          type="button"
          onClick={toggle}
          className="btn btn-warning btn-icon btn-circle btn-lg me-2"
        >
          <i className="fa fa-check "></i>
        </button>
      )}

      <Modal centered toggle={toggle} isOpen={modalOpen}>
        <Panel className="mb-0">
          <PanelHeaderOption isUpdated={isUpdated} isId={isId} />
          <PanelBody>
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={onSubmit}
            >
              <Form>
                <FieldInput label="Endereço" name="endereco" />
                <FieldInput label="Número" name="numero" />
                <FieldInput label="Bairro" name="bairro" />
                <FieldInput label="Cep" name="cep" />
                <FieldInput label="Cidade" name="cidade" />
                <SwitchInput name="vistoria" />
                <SwitchInput name="ocupado" />
                <div className="mb-0 p-1 text-end border-0 hljs-wrapper">
                  <button
                    type="submit"
                    onClick={toggle}
                    className={`btn ${
                      !isUpdated
                        ? "btn-success btn-lg m-1"
                        : "btn-warning btn-lg m-1"
                    }`}
                  >
                    {!isUpdated ? "Incluir" : "Atualizar"}
                  </button>
                  <button
                    type="button"
                    onClick={toggle}
                    className="btn btn-gray btn-lg m-2"
                  >
                    Sair
                  </button>
                </div>
                {/* <ButtonActionInput
                  toggle={toggle}
                  isUpdated={isUpdated}
                  onSubmit={onSubmit}
                /> */}
              </Form>
            </Formik>
          </PanelBody>
        </Panel>
      </Modal>
    </Fragment>
  );
};

export default FormImovel;
