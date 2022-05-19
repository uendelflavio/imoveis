import React from "react";
import { PanelHeader } from "../panel/panel";
const PanelHeaderOption = ({ isUpdated, isId }) => {
  return (
    <PanelHeader
      className="panel-heading bg-teal-700 text-white"
      noButton={true}
    >
      {!isUpdated
        ? "Novo Imóvel"
        : "[" + isId.toString().padStart(3, "0") + "] - Atualizar Imóvel "}
    </PanelHeader>
  );
};
export default PanelHeaderOption;
