import React from "react";
import SweetAlert from "react-bootstrap-sweetalert";
import { useFormikContext } from "formik";
import { Button } from "reactstrap";

const ButtonCrud = props => {
  const [alertDelete, setAlertDelete] = React.useState(false);
  const [alertUpdate, setAlertUpdate] = React.useState(false);
  const [isId, setId] = React.useState(0);
  const formik = useFormikContext();

  React.useEffect(
    () => {
      setId(parseInt(formik.values["id"]));
    },
    [formik.values]
  );

  const BtnNew = () => {
    return (
      <Button
        name="BtnNew"
        onClick={e => {
          props.setAction("new");
          formik.setSubmitting(true);
          formik.submitForm();
        }}
        className="btn-info btn-lg m-1">
        <i className="fas fa-plus-circle me-2" />
        Novo
      </Button>
    );
  };

  const BtnCreate = () => {
    return (
      <Button
        name="BtnCreate"
        onClick={e => {
          props.setAction("create");
          setId(0);
          formik.setSubmitting(true);
          formik.submitForm();
        }}
        disabled={!formik.isValid}
        className="btn-success btn-lg m-1">
        <i className="fa fa-plus me-2" />
        Incluir
      </Button>
    );
  };

  const BtnUpdate = () => {
    return (
      <Button
        name="BtnUpdate"
        disabled={typeof isId !== "undefined" && formik.isValid && isId === 0}
        onClick={e => {
          e.preventDefault();
          setAlertUpdate(true);
        }}
        className="btn-warning btn-lg m-1">
        <i className="fa fa-edit me-2" />
        Atualizar
      </Button>
    );
  };

  const BtnDelete = () => {
    return (
      <Button
        name="BtnDelete"
        disabled={typeof isId !== "undefined" && isId === 0}
        onClick={event => {
          event.preventDefault();
          setAlertDelete(true);
        }}
        className="btn-danger btn-lg m-1">
        <i className="fa fa-minus me-2" />
        Excluir
      </Button>
    );
  };

  const BtnExit = () => {
    return (
      <Button
        name="BtnExit"
        onClick={() => {
          props.setAction("");
          props.toggle();
        }}
        className="btn-gray btn-lg m-1">
        <i className="fa fa-door-open me-2" />
        Sair
      </Button>
    );
  };

  const SweetAlertDelete = () => {
    return (
      <SweetAlert
        danger
        showCancel
        cancelBtnText="Cancelar"
        confirmBtnBsStyle="danger"
        cancelBtnBsStyle="default"
        title={
          <span>
            Deseja excluir o registro: {isId.toString().padStart(3, "0")}
          </span>
        }
        onConfirm={() => {
          props.setAction("delete");
          formik.setSubmitting(true);
          formik.submitForm();
          setAlertDelete(!alertDelete);
        }}
        onCancel={() => setAlertDelete(!alertDelete)}>
        Esta ação vai excluir permanentemente os dados.
      </SweetAlert>
    );
  };

  const SweetAlertUpdate = () => {
    return (
      <SweetAlert
        warning
        showCancel
        cancelBtnText="Cancelar"
        confirmBtnBsStyle="warning"
        cancelBtnBsStyle="default"
        title={
          <span>
            Deseja atualizar o registro: {isId.toString().padStart(3, "0")}
          </span>
        }
        onConfirm={() => {
          props.setAction("update");
          formik.setSubmitting(true);
          formik.submitForm();
          setAlertUpdate(!alertUpdate);
        }}
        onCancel={() => setAlertUpdate(!alertUpdate)}>
        Esta ação concluira a atualizaçao completa do registro.
      </SweetAlert>
    );
  };

  return (
    <React.Fragment>
      <div
        name={props.name}
        className="d-flex justify-content-evenly hljs-wrapper rounded border border-1 p-1 mt-3">
        {isId > 0 ? <BtnNew /> : <BtnCreate />}
        <BtnUpdate />
        <BtnDelete />
        <BtnExit />
        {alertUpdate && <SweetAlertUpdate />}
        {alertDelete && <SweetAlertDelete />}
      </div>
    </React.Fragment>
  );
};

export default ButtonCrud;
