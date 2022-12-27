import React from "react";
import { Button } from "reactstrap";
const ButtonModal = props => {
  const [visible, setVisible] = React.useState(
    props.isAction === "create" ? true : false
  );

  React.useEffect(
    () => {
      if (props.isAction === "create") {
        setVisible(true);
      } else {
        setVisible(false);
      }
    },
    [props.isAction]
  );

  const ButtonModalCreateUpdate = status => {
    if (status.visible) {
      return (
        <Button
          onClick={props.toggle}
          name={`ButtonModalCreate-${props.name}`}
          className="btn btn-success btn-icon btn-circle btn-lg me-2"
          data-bs-toggle="tooltip"
          data-bs-placement="bottom"
          title="Cadastra os Dados">
          <i className="fa fa-plus" />
        </Button>
      );
    }
    return (
      <Button
        onClick={props.toggle}
        name={`ButtonModalUpdate-${props.name}`}
        className="btn btn-warning btn-icon btn-circle btn-lg me-2"
        data-bs-toggle="tooltip"
        data-bs-placement="bottom"
        title="Atualiza os Dados">
        <i className="fa fa-check " />
      </Button>
    );
  };

  return (
    <React.Fragment>
      <ButtonModalCreateUpdate visible={visible} />
    </React.Fragment>
  );
};

export default ButtonModal;
