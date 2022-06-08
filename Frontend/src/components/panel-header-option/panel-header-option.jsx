import React from "react";
import { PanelHeader } from "../panel/panel";
const PanelHeaderOption = (props) => {
  return (
    <PanelHeader
      className="panel-heading bg-teal-700 text-white"
      noButton={true}
    >
      {!props.isUpdated
        ? "Novo Imóvel"
        : "[" + props.isId.toString().padStart(3, "0") + "] - Atualizar Imóvel "}
    </PanelHeader>
  );
};
export default PanelHeaderOption;
