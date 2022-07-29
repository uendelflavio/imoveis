import React from "react";
import { PanelHeader } from "../panel/panel";
const PanelHeaderOption = (props) => {  
  return (
    <PanelHeader
      className="panel-heading bg-teal-700 text-white"
      noButton={true}
    >
    {typeof props.id === 'undefined'  ? props.titleInsert : "[" + props.id.toString().padStart(3, "0") + "] - " + props.titleUpdated}
    </PanelHeader>
  );
};
export default PanelHeaderOption;
