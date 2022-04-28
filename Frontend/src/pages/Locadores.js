import React from 'react';
import { Link } from 'react-router-dom';
import { Panel, PanelHeader, PanelBody } from '../components/panel/panel.jsx';
//import api from "../services/api";
class Locadores extends React.Component {
	render() {
		return (
			<div>
				<ol className="breadcrumb float-xl-end">
					<li className="breadcrumb-item"><Link to="/">Locadores</Link></li>
					<li className="breadcrumb-item active">Cadastros</li>
				</ol>
				<h1 className="page-header">Gerência de Locadores <small>Modulo de Cadastros...</small></h1>
				<Panel>
					<PanelHeader  noButton={true}>Cadastro Locadores</PanelHeader>
					<PanelBody>
						Panel Content Here
					</PanelBody>
				</Panel>
			</div>
		)
	}


}

export default Locadores;