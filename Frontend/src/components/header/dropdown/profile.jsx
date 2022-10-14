import React from 'react';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { useHistory } from "react-router-dom";
import TokenService from '../../../services/token-service';

const DropdownProfile = props => {
	let history = useHistory();
	const [dropdownOpen, setdropdownOpen] = React.useState(false);
	const toggle = () => setdropdownOpen(!dropdownOpen);
	const onClickLogout = async () => {	
		TokenService.removeToken();				
		history.push("/login");
	}

	return (
	<Dropdown isOpen={dropdownOpen} toggle={toggle} className="navbar-item navbar-user dropdown" tag="div">
		<DropdownToggle tag="a" className="navbar-link dropdown-toggle d-flex align-items-center">
			<div className="image image-icon bg-gray-800 text-gray-600">
				<i className="fa fa-user"></i>
			</div>
			<span>
				<span className="d-none d-md-inline">Uendel Flavio</span>
				<b className="caret"></b>
			</span>
		</DropdownToggle>
		<DropdownMenu className="dropdown-menu dropdown-menu-end" end tag="div">
			<DropdownItem>Editar Perfil</DropdownItem>
			<DropdownItem className="d-flex align-items-center">
				Caixa de Entrada
				<span className="badge bg-danger rounded-pill ms-auto pb-4px">2</span> 
			</DropdownItem>
			<DropdownItem>Calendario</DropdownItem>
			<DropdownItem>Configuracões</DropdownItem>
			<div className="dropdown-divider"></div>
			<DropdownItem onClick={onClickLogout} >Sair</DropdownItem>
		</DropdownMenu>
	</Dropdown>
);
}

export default DropdownProfile;
