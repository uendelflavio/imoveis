import React from "react";
import SweetAlert from "react-bootstrap-sweetalert";
import { useFormikContext } from "formik";
import { Button } from "reactstrap";

const ButtonCrud = props => {
  const [state, setState] = React.useState({
    alertdelete: false,
    alertupdate: false,
    id: 0
  });

  const {
    values,
    submitForm,
    setSubmitting,
    setTouched,
    setErrors
  } = useFormikContext();

  React.useEffect(() => {
    setState({ ...state, id: values.id });
    setTouched({}, false);
    setErrors({}, false);
    // eslint-disable-next-line
  }, []);

  const BtnNew = () => {
    return (
      <Button
        name={`BtnNew-${props.name}`}
        onClick={() => {
          props.setAction("new");
          setSubmitting(true);
          submitForm();
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
          setSubmitting(true);
          submitForm();
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
        disabled={state.id === 0 ? true : false}
        onClick={e => {
          e.preventDefault();
          setState({ ...state, alertupdate: true });
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
        disabled={state.id === 0 ? true : false}
        onClick={e => {
          e.preventDefault();
          setState({ ...state, alertdelete: true });
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
        onClick={() => props.toggle()}
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
            Deseja excluir o registro: {values.id.toString().padStart(3, "0")}
          </span>
        }
        onConfirm={() => {
          props.setAction("delete");
          setSubmitting(true);
          submitForm();
          setState({ ...state, alertdelete: !state.alertdelete });
        }}
        onCancel={() =>
          setState({
            ...state,
            alertdelete: !state.alertdelete
          })}>
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
            Deseja atualizar o registro: {values.id.toString().padStart(3, "0")}
          </span>
        }
        onConfirm={() => {
          props.setAction("update");
          setSubmitting(true);
          submitForm();
          setState({ ...state, alertupdate: !state.alertupdate });
        }}
        onCancel={() =>
          setState({
            ...state,
            alertupdate: !state.alertupdate
          })}>
        Esta ação concluira a atualizaçao completa do registro.
      </SweetAlert>
    );
  };

  return (
    <React.Fragment>
      <div
        name={props.name}
        className="d-flex justify-content-evenly hljs-wrapper rounded border border-1 p-1 mt-3">
        {values.id > 0 ? <BtnNew /> : <BtnCreate />}
        <BtnUpdate />
        <BtnDelete />
        <BtnExit />
        {state.alertupdate && <SweetAlertUpdate />}
        {state.alertdelete && <SweetAlertDelete />}
      </div>
    </React.Fragment>
  );
};

export default ButtonCrud;
