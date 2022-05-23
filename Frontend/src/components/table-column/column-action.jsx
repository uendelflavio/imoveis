import React, { Fragment } from "react";
import FormImovel from "../forms/form-imovel";
import AlertDelete from "../sweet-alert/alert-delete";

export default function ColumnAction({ rowID, row }) {
 
  return (
    <Fragment>
      <ul className="nav px-1 py-1 ">
        <li className="nav-item">
          <FormImovel isModal={false} isUpdated={true} isId={rowID} row={row} />
          <AlertDelete rowID={rowID} />
        </li>
      </ul>
    </Fragment>
  );
}
