import React from "react";
import { Button } from "reactstrap";
const ButtonModal = (props) => {
  const ButtonModalCreate = () => {
    return (
      <Button
        onClick={props.toggle}
        name={`ButtonModalCreate-${props.name}`}
        className="btn btn-success btn-icon btn-circle btn-lg me-2"
        data-bs-toggle="tooltip"
        data-bs-placement="bottom"
        title="Cadastra os Dados"
      >
        <i className="fa fa-plus" />
      </Button>
    );
  };

  const ButtonModalUpdate = () => {
    return (
      <Button
        onClick={props.toggle}
        name={`ButtonModalUpdate-${props.name}`}
        className="btn btn-warning btn-icon btn-circle btn-lg me-2"
        data-bs-toggle="tooltip"
        data-bs-placement="bottom"
        title="Atualiza os Dados"
      >
        <i className="fa fa-check " />
      </Button>
    );
  };

  return (
    <React.Fragment>
      {props.isAction === "create"
        ? <ButtonModalCreate />
        : <ButtonModalUpdate />}
    </React.Fragment>
  );
};

export default ButtonModal;
