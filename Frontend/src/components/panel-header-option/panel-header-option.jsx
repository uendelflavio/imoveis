import React from "react";
import { PanelHeader } from "../panel/panel";
import { useFormikContext } from "formik";
const PanelHeaderOption = (props) => {  
  const formik = useFormikContext();
  return (
    <PanelHeader
      className="panel-heading bg-teal-700 text-white"
      noButton={true}
    >
    {typeof formik.values.id === 'undefined'  ? props.titleInsert : "[" + formik.values.id.toString().padStart(3, "0") + "] - " + props.titleUpdated} 
    </PanelHeader>
  );
};
export default PanelHeaderOption;
