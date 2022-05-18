import React, { useState, Fragment } from "react";
import { useFormik } from "formik";
import { Panel, PanelHeader, PanelBody } from "../panel/panel";
import { Modal } from "reactstrap";
import * as Yup from "yup";

import Switch from "react-switch";

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
  const [checkA, setVistoria] = useState(false);
  const [checkO, setOcupado] = useState(false);
  const toggle = () => setModalOpen(!modalOpen);
  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema,
    // validate,
  });

  const handleVistoria = (checked) => {
    setVistoria(checked);
    formik.values.vistoria = checked;
  };
  const handleOcupado = (checked) => {
    setOcupado(checked);
    formik.values.ocupado = checked;
  };
  console.log(formik.touched);
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
          <PanelHeader
            className="panel-heading bg-teal-700 text-white"
            noButton={true}
          >
            {!isUpdated
              ? "Novo Imóvel"
              : "[" +
                isId.toString().padStart(3, "0") +
                "] - Atualizar Imóvel "}
          </PanelHeader>
          <PanelBody>
            <form onSubmit={formik.handleSubmit}>
              <div className="row mb-1">
                <label className="form-label col-form-label col-md-2">
                  Endereço:
                </label>
                <div className="col-md-10">
                  <input
                    type="text"
                    name="endereco"
                    id="endereco"
                    {...formik.getFieldProps("endereco")}
                    className={
                      formik.touched.endereco && formik.errors.endereco
                        ? "form-control is-invalid"
                        : "form-control is-valid"
                    }
                  />
                  {formik.touched.endereco && formik.errors.endereco ? (
                    <div className="invalid-feedback">
                      {formik.errors.endereco}
                    </div>
                  ) : null}
                </div>
              </div>
              <div className="row mb-1">
                <label className="form-label col-form-label col-md-2">
                  Número:
                </label>
                <div className="col-md-10">
                  <input
                    type="text"
                    name="numero"
                    id="numero"
                    {...formik.getFieldProps("numero")}
                    className={
                      formik.touched.numero && formik.errors.numero
                        ? "form-control is-invalid"
                        : "form-control is-valid"
                    }
                  />
                  {formik.touched.numero && formik.errors.numero ? (
                    <div className="invalid-feedback">
                      {formik.errors.numero}
                    </div>
                  ) : null}
                </div>
              </div>
              <div className="row mb-1">
                <label className="form-label col-form-label col-md-2">
                  Bairro:
                </label>
                <div className="col-md-10">
                  <input
                    type="text"
                    name="bairro"
                    id="bairro"
                    {...formik.getFieldProps("bairro")}
                    className={
                      formik.touched.bairro && formik.errors.bairro
                        ? "form-control is-invalid"
                        : "form-control is-valid"
                    }
                  />
                  {formik.touched.bairro && formik.errors.bairro ? (
                    <div className="invalid-feedback">
                      {formik.errors.bairro}
                    </div>
                  ) : null}
                </div>
              </div>
              <div className="row mb-1">
                <label className="form-label col-form-label col-md-2">
                  Cep:
                </label>
                <div className="col-md-10">
                  <input
                    type="text"
                    name="cep"
                    id="cep"
                    {...formik.getFieldProps("cep")}
                    className={
                      formik.touched.cep && formik.errors.cep
                        ? "form-control is-invalid"
                        : "form-control is-valid"
                    }
                  />
                  {formik.touched.cep && formik.errors.cep ? (
                    <div className="invalid-feedback">{formik.errors.cep}</div>
                  ) : null}
                </div>
              </div>
              <div className="row mb-1">
                <label className="form-label col-form-label col-md-2">
                  Cidade:
                </label>
                <div className="col-md-10">
                  <input
                    type="text"
                    name="cidade"
                    id="cidade"
                    {...formik.getFieldProps("cidade")}
                    className={
                      formik.touched.cidade && formik.errors.cidade
                        ? "form-control is-invalid"
                        : "form-control is-valid"
                    }
                  />
                  {formik.touched.cidade && formik.errors.cidade ? (
                    <div className="invalid-feedback">
                      {formik.errors.cidade}
                    </div>
                  ) : null}
                </div>
              </div>
              <div className="form-check form-check-inline">
                <label className="form-check-label col-form-label col-md-2">
                  <span>Vistoria</span>
                  <Switch
                    onChange={handleVistoria}
                    checked={checkA}
                    className="react-switch"
                  />
                </label>
              </div>
              <div className="form-check form-check-inline">
                <label className="form-check-label col-form-label col-md-2">
                  <span>Ocupado</span>
                  <Switch
                    onChange={handleOcupado}
                    checked={checkO}
                    className="react-switch"
                  />
                </label>
              </div>
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
            </form>
          </PanelBody>
        </Panel>
      </Modal>
    </Fragment>
  );
};

export default FormImovel;
