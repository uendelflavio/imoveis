import React,{ Fragment } from "react";
import { useFormikContext } from "formik";

export default function ButtonActionInput (props) {
  const { isValid } = useFormikContext();  

  return (
    <Fragment>
    <div className="mb-0 p-1 text-end border-0 hljs-wrapper">
      <button
        type="submit"
        onClick={() => { props.toggle() }}
        disabled={!isValid}
        className={`btn ${!props.isUpdated ? "btn-success btn-lg m-1" : "btn-warning btn-lg m-1"}`}                    
      >
      {!props.isUpdated ? "Incluir" : "Atualizar"}
      </button>
      <button
        type="button"
        onClick={props.toggle}
        className="btn btn-gray btn-lg m-2"
      >
        Sair
      </button>
      </div>
      </Fragment>
  );
};
