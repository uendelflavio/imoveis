import React from "react";
import { useParams } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import FormLogin from "components/forms/form-login/form-login";

const withRouter = (WrappedComponent) => (props) => {
  const params = useParams();
  return <WrappedComponent {...props} params={params} />;
};

const Login = () => {
  return (
    <React.Fragment>
      <div className="login login-v1">
        <ToastContainer position="top-center" newestOnTop />
        <div className="login-container">
          <div className="login-header">
            <div className="brand">
              <div className="d-flex align-items-center">
                <span className="logo" /> <b>Sys</b> Imovel
              </div>
              <small>Sistema de Gestão de Imóveis</small>
            </div>
            <div className="icon">
              <i className="fa fa-lock" />
            </div>
          </div>
          <div className="login-body">
            <div className="login-content fs-13px">
              <FormLogin />
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default withRouter(Login);
