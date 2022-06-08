import React, { useState, Fragment } from "react";
import FormImovel from "../forms/form-imovel";
import AlertDelete from "../sweet-alert/alert-delete";
import ImovelService from '../../services/ImovelService';

export default function ColumnAction(props) {
  const [data, setData] = useState([]);
  const onLoading = async ( mod) => {    
    if (mod) {
      const result = await ImovelService.getAll('');
      setData(result.data.imoveis);
      console.log(data)
    }
  }
  return (
    <Fragment>
      <ul className="nav px-1 py-1 ">
        <li className="nav-item">
          <FormImovel isModal={false} onModalChange={onLoading} isUpdated={true} isId={props.rowID} row={props.row} />
          <AlertDelete rowID={props.rowID} />
        </li>
      </ul>
    </Fragment>
  );
}
