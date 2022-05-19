import React, { Fragment } from "react";

function TextError(props) {
  console.log(props.children);
  return (
    <Fragment>
      <div className="invalid-feedback bold">{props.children}</div>
    </Fragment>
  );
}

export default TextError;
