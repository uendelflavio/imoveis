import React from "react";

function TextError(props) {
  return (
    <React.Fragment>
      <div className="invalid-feedback bold">{props.children}</div>
    </React.Fragment>
  );
}

export default TextError;
