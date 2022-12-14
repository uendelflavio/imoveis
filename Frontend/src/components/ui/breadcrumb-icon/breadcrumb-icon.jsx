import React from "react";
import { Link } from "react-router-dom";
const BreadcrumbIcon = (props) => {
  return (
    <React.Fragment>
      <div>
        <ul className="breadcrumb">
          <li className="breadcrumb-item active">
            <Link to="/app">Principal</Link>
          </li>
          <li className="breadcrumb-item">
            {props.title}
          </li>
        </ul>
        <h2 className="page-header mb-0">
          <strong>
            <span className="fa-stack fa-lg">
              <i className="fas fa-circle fa-stack-2x" />
              <i className={props.classIcon} />
            </span>
            {props.description}
          </strong>
        </h2>
      </div>
    </React.Fragment>
  );
};

export default BreadcrumbIcon;
