import React from "react";
import SweetAlert from "react-bootstrap-sweetalert";
import { useFormikContext } from "formik";
import { Button } from "reactstrap";

const ButtonAction = props => {
  const [state, setState] = React.useState({
    id: 0,
    alertupdate: false
  });
  const toggleAlertActionUpdate = () =>
    setState({ ...state, alertupdate: !state.alertupdate });
  const { values, submitForm, setSubmitting, isValid } = useFormikContext();

  React.useEffect(
    () => {
      setState({ ...state, id: Number(values["id"]) });
    },
    // eslint-disable-next-line
    []
  );

  const BtnCreateActionButton = () => {
    return (
      <Button
        name={`BtnCreateActionButton-${props.name}`}
        onClick={e => {
          props.setAction("create");
          setSubmitting(true);
          submitForm();
        }}
        disabled={!isValid}
        className={"btn-success btn-lg m-1"}>
        <i className={"fa fa-plus me-2"} />
        Incluir
      </Button>
    );
  };

  const BtnUpdateActionButton = () => {
    return (
      <Button
        name={`BtnUpdateActionButton-${props.name}`}
        onClick={e => {
          e.preventDefault();
          setState({ ...state, alertupdate: true });
        }}
        disabled={!isValid}
        className={"btn-warning btn-lg m-1"}>
        <i className={"fa fa-edit me-2"} />
        Atualizar
      </Button>
    );
  };

  const SweetAlertActionUpdate = () => {
    return (
      <SweetAlert
        warning
        showCancel
        cancelBtnText="Cancelar"
        confirmBtnBsStyle="warning"
        cancelBtnBsStyle="default"
        title={
          <span>
            Deseja atualizar o registro: {state.id.toString().padStart(3, "0")}
          </span>
        }
        onConfirm={() => {
          props.setAction("update");
          setSubmitting(true);
          submitForm();
          toggleAlertActionUpdate(false);
        }}
        onCancel={() => toggleAlertActionUpdate(false)}>
        Esta ação concluira a atualizaçao completa do registro.
      </SweetAlert>
    );
  };

  const BtnExitActionButton = () => {
    return (
      <Button
        name={`BtnExitActionButton-${props.name}`}
        onClick={props.toggle}
        className="btn-gray btn-lg m-2">
        <i className="fa fa-door-open me-2" />
        Sair
      </Button>
    );
  };

  return (
    <React.Fragment>
      <div
        name={props.name}
        className="p-0 text-end border border-1 hljs-wrapper rounded">
        {state.id === 0 ? <BtnCreateActionButton /> : <BtnUpdateActionButton />}
        <BtnExitActionButton />
        {state.alertupdate && <SweetAlertActionUpdate />}
      </div>
    </React.Fragment>
  );
};

export default ButtonAction;
