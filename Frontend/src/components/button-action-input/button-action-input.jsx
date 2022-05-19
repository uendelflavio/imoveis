import React from "react";
import { useFormikContext } from "formik";
const ButtonActionInput = ({ toggle, isUpdated }) => {
  const { submitForm } = useFormikContext();

  return (
    <div className="mb-0 p-1 text-end border-0 hljs-wrapper">
      <button
        type="submit"
        onClick={submitForm}
        className={`btn ${
          !isUpdated ? "btn-success btn-lg m-1" : "btn-warning btn-lg m-1"
        }`}
      >
        {!isUpdated ? "Incluir" : "Atualizar"}
      </button>
      <button
        type="button"
        onClick={toggle}
        className="btn btn-gray btn-lg m-2"
      >
        Sair
      </button>
    </div>
  );
};

export default ButtonActionInput;
