import React from "react";
import SweetAlert from "react-bootstrap-sweetalert";
import { useFormikContext } from "formik";
import { Button } from "reactstrap";

const ActionButtonInput = props => {
  const [alertUpdate, setAlertUpdate] = React.useState(false);
  const [isId, setId] = React.useState();
  const formik = useFormikContext();

  const toggleAlertActionUpdate = () => setAlertUpdate(!alertUpdate);

  React.useEffect(
    () => {
      setId(Number(formik.values["id"]));
    },
    [formik.values]
  );

  return (
    <React.Fragment>
      <div className="p-0 text-end border border-1 hljs-wrapper rounded">
        {isId === 0
          ? <Button
              onClick={e => {
                props.setAction("create");
                formik.setSubmitting(true);
                formik.submitForm();
              }}
              disabled={!formik.isValid}
              className={"btn-success btn-lg m-1"}>
              <i className={"fa fa-plus me-2"} />
              Incluir
            </Button>
          : <Button
              onClick={e => {
                e.preventDefault();
                setAlertUpdate(true);
              }}
              disabled={!formik.isValid}
              className={"btn-warning btn-lg m-1"}>
              <i className={"fa fa-edit me-2"} />
              Atualizar
            </Button>}
        <Button onClick={props.toggle} className="btn-gray btn-lg m-2">
          <i className="fa fa-door-open me-2" />
          Sair
        </Button>
        {alertUpdate &&
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
              formik.submitForm();
              toggleAlertActionUpdate(false);
            }}
            onCancel={() => toggleAlertActionUpdate(false)}>
            Esta ação concluira a atualizaçao completa do registro.
          </SweetAlert>}
      </div>
    </React.Fragment>
  );
};

export default ActionButtonInput;
