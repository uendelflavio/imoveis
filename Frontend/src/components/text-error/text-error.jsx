import React from "react";

const  TextError = (props) => {
  return (
    <React.Fragment>
      <div className="text-danger bold" >{props.children}</div>
    </React.Fragment>
  );
}

export default TextError;
