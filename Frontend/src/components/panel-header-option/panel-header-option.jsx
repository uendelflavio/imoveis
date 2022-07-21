import React from "react";
import { PanelHeader } from "../panel/panel";
const PanelHeaderOption = (props) => {
  return (
    <PanelHeader
      className="panel-heading bg-teal-700 text-white"
      noButton={true}
    >
      {!props.isUpdated
        ? props.titleInsert
        : "[" + props.isId.toString().padStart(3, "0") + "] - " + props.titleUpdated}
    </PanelHeader>
  );
};
export default PanelHeaderOption;
