import React from "react";
import SweetAlert from "react-bootstrap-sweetalert";
import { useFormikContext } from "formik";
import { Button } from "reactstrap";

const ButtonCrud = props => {
  const [alertDelete, setAlertDelete] = React.useState(false);
  const [alertUpdate, setAlertUpdate] = React.useState(false);
  const formik = useFormikContext();
  const [isId, setID] = React.useState();

  React.useEffect(() => {
    setID(formik.values.id);
    formik.setTouched({}, false);
    formik.setErrors({}, false);
    // eslint-disable-next-line
  }, []);

  const BtnNew = () => {
    return (
      <Button
        name={`BtnNew-${props.name}`}
        onClick={() => {
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
        name={`BtnCreate-${props.name}`}
        onClick={() => {
          props.setAction("create");
          formik.setSubmitting(true);
          formik.submitForm();
          props.setAction("new");
        }}
        className="btn-success btn-lg m-1">
        <i className="fa fa-plus me-2" />
        Incluir
      </Button>
    );
  };

  const BtnUpdate = () => {
    return (
      <Button
        name={`BtnUpdate-${props.name}`}
        disabled={isId === 0 ? true : false}
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
        name={`BtnDelete-${props.name}`}
        disabled={isId === 0 ? true : false}
        onClick={e => {
          e.preventDefault();
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
        name={`BtnExit-${props.name}`}
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
            Deseja excluir o registro:{" "}
            {formik.values.id.toString().padStart(3, "0")}
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
            Deseja atualizar o registro:{" "}
            {formik.values.id.toString().padStart(3, "0")}
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
        {formik.values.id > 0 ? <BtnNew /> : <BtnCreate />}
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
