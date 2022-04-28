import React from "react";
import {  withRouter } from "react-router-dom";
import { AppSettings } from './../config/app-settings'
import API from '../utils/api';

import { login } from "../utils/auth";
import ReactNotifications from 'react-notifications-component';
import { store } from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';


class Login extends React.Component {
	static contextType = AppSettings;

	state = {
		email: "",
		password: ""
	};

	constructor(props) {
		super(props);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.addNotification = this.addNotification.bind(this);
	}
	
	addNotification = (notificationType, notificationTitle, notificationMessage, notificationPosition, notificationContent) => {
		store.addNotification({
				title: notificationTitle,
				message: notificationMessage,
				type: notificationType,
				insert: "top",
				container: notificationPosition,
				animationIn: ["animated", "fadeIn"],
				animationOut: ["animated", "fadeOut"],
				dismiss: { duration: 5000 },
				dismissable: { click: true },
				content: notificationContent
		});
	  }
	
	componentDidMount() {
		this.emailInput.focus();
	}

	handleSubmit =  async event => {
		event.preventDefault();
		const { email, password } = this.state;
	    if (!email || !password) {
			this.addNotification('warning', 'Atenção', 'Preencha e-mail e senha para continuar!', 'top-center');
			this.emailInput.focus();
		} else {
			try {
				const response = await API.post("/session/new", { email, password }, { headers: { 'Content-Type': 'application/json' } });
	
				login(response.data.access_token);
				this.props.history.push("/app");
			} catch (error) {	
				if (error.response.status === 401) {
					this.addNotification('warning', 'Atenção', 'Houve um problema com autenticação, verifique suas credenciais e tente novamente.', 'top-center');
					this.setState({ email: '' });
					this.setState({ password: '' });
				}
				if (error.response.status >= 500) {
					this.addNotification('danger', 'Falha', 'Houve falha de comunicação com o servidor, tente autenticar novamente.', 'top-center');
					this.setState({ email: '' });
					this.setState({ password: '' });
				}
	
				this.emailInput.focus();
			}
		}
  }
  
	render() {
		return (
			<div className="login login-v1">
				<ReactNotifications />
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
							<form onSubmit={this.handleSubmit}>
								<div className="form-floating mb-20px">
									<input value={this.state.email} ref={inputEl => (this.emailInput = inputEl)} type="email" onChange={e => this.setState({ email: e.target.value })} className="form-control fs-13px h-45px" id="emailAddress" placeholder="Email Address" />
									<label htmlFor="emailAddress" className="d-flex align-items-center py-0">Email Address</label>
								</div>
								<div className="form-floating mb-20px">
									<input value={this.state.password} type="password" onChange={e => this.setState({ password: e.target.value })} className="form-control fs-13px h-45px" id="password" placeholder="Password" />
									<label htmlFor="password" className="d-flex align-items-center py-0">Password</label>
								</div>
								<div className="form-check mb-20px">
									<input className="form-check-input" type="checkbox" value="" id="rememberMe" />
									<label className="form-check-label" htmlFor="rememberMe">
										Memorizar Usuario e Senha
									</label>
								</div>
								<div className="login-buttons">
									<button type="submit" className="btn h-45px btn-success d-block w-100 btn-lg">Sign me in</button>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
		)
	}
}

//export default Login;
export default withRouter(Login);