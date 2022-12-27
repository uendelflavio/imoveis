import React from "react";
import { PanelHeader } from "components/ui/panel/panel";
import { useFormikContext } from "formik";
const PanelHeaderOption = ({ titleInsert, titleUpdated }) => {
  const { values } = useFormikContext();
  const [id, setID] = React.useState(0);
  const [mens, setMens] = React.useState("");

  React.useEffect(
    () => {
      setID(values.id);
    },
    [values.id]
  );

  React.useEffect(
    () => {
      if (id === 0 && typeof id === "number") setMens(titleInsert);
      if (id === "" && typeof id === "string") setMens(titleInsert);
      if (typeof id === "undefined") setMens(titleInsert);
      if (id > 0 && typeof id === "number")
        setMens(`[${id.toString().padStart(3, "0")}] - ${titleUpdated}`);
    },
    [titleInsert, titleUpdated, id]
  );

  return (
    <React.Fragment>
      <PanelHeader
        className="panel-heading bg-teal-700 text-white"
        noButton={true}>
        {mens}
      </PanelHeader>
    </React.Fragment>
  );
};
export default PanelHeaderOption;
