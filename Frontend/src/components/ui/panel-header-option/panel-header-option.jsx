import React from "react";
import { PanelHeader } from "components/ui/panel/panel";
import { useFormikContext } from "formik";
const PanelHeaderOption = props => {
  const [isId, setId] = React.useState("000");
  const formik = useFormikContext();

  React.useEffect(
    () => {
      if (typeof formik.values["id"] === "number") {
        setId(formik.values["id"].toString().padStart(3, "0"));
      }
    },
    [formik.values, isId]
  );

  return (
    <React.Fragment>
      <PanelHeader
        className="panel-heading bg-teal-700 text-white"
        noButton={true}>
        {isId === 0
          ? props.titleInsert
          : "[" + isId + "] - " + props.titleUpdated}
      </PanelHeader>
    </React.Fragment>
  );
};
export default PanelHeaderOption;
