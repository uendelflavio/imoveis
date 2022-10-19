import React from "react";
import { useFormikContext } from "formik";
import { Button } from "reactstrap";

  const ActionButtonInput = (props) => {
  const { isValid } = useFormikContext();  

  return (
    <React.Fragment>
    <div className="p-0 text-end border border-1 hljs-wrapper rounded">
      <Button
        type="submit"
        onClick={() => { props.toggle() }}
        disabled={!isValid}
        className={`${!props.isUpdated ? "btn-success btn-lg m-1" : "btn-warning btn-lg m-1"}`}                    
        >
        <i className={!props.isUpdated ? "fa fa-plus me-2" : "fa fa-edit me-2"}></i> 
        {!props.isUpdated ?"Incluir": "Atualizar"}
      </Button>
      <Button        
        onClick={props.toggle}
        className="btn-gray btn-lg m-2"
        >
        <i className="fa fa-door-open me-2"></i>
        Sair
      </Button>
      </div>
      </React.Fragment>
  );
};

export default ActionButtonInput