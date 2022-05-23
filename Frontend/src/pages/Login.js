import React from "react";
import { withRouter } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import FormLogin from "../components/forms/form-login"

const Login = () => {
	return (
		<div className="login login-v1">
			<ToastContainer position="top-center" newestOnTop />
			<div className="login-container">
				<div className="login-header">
					<div className="brand">
						<div className="d-flex align-items-center">
							<span className="logo"></span> <b>Sys</b> Imovel
						</div>
						<small>Sistema de Gestão de Imóveis</small>
					</div>
					<div className="icon">
						<i className="fa fa-lock"></i>
					</div>
				</div>
				<div className="login-body">
					<div className="login-content fs-13px">
						<FormLogin />
					</div>
				</div>
			</div>
		</div>
	)
}

export default withRouter(Login);