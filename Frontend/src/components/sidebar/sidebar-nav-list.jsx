import React from 'react';
import { Route, Link } from 'react-router-dom';
import { AppSettings } from './../../config/app-settings.js';

const SidebarNavList = props => {
	const [state, setState] = React.useState({
		active: -1,
		clicked: -1
	});

	const handleExpand = (e, i, match) => {
		e.preventDefault();
		setState({
			active: (state.active === i ? -1 : i),
			clicked: 1
		});
	}
  	
	var icon = props.data.icon && <div className="menu-icon"><i className={props.data.icon}></i></div>;
	var img = props.data.img && <div className="menu-icon-img"><img src={props.data.img} alt="" /></div>;
	var caret = (props.data.children && !props.data.badge) && <div className="menu-caret"></div>;
	var label = props.data.label && <span className="menu-label ms-5px">{props.data.label}</span>;
	var badge = props.data.badge && <div className="menu-badge">{props.data.badge}</div>;
	var highlight = props.data.highlight && <i className="fa fa-paper-plane text-theme"></i>;
	var title = props.data.title && <div className="menu-text">{props.data.title} {label} {highlight}</div>;
		
	return (
		<AppSettings.Consumer>
			{({handleAppSidebarOnMouseOver, handleAppSidebarOnMouseOut, appSidebarMinified}) => (
				<Route path={props.data.path} exact={props.data.exact} children={({ match }) => (
					<div className={"menu-item " + (match ? "active " : "") + ((props.active || (props.clicked === -1 && match) || props.data.search) ? 'expand ' : 'closed ') + (props.data.children ? "has-sub " : "")}>
						{props.data.children ? (
							<Link to={props.data.path}
								className="menu-link"
								onMouseOver={(e) => handleAppSidebarOnMouseOver(e, props.data)} 
								onMouseOut={(e) => handleAppSidebarOnMouseOut(e, props.data)}
								onClick={props.expand}>{ img } { icon } { title }{ caret } { badge }</Link>
						):(
							<Link to={props.data.path} className="menu-link">{ img } { icon } { badge } { title }{ caret }</Link>
						)}
						{props.data.children && (
							<div className={"menu-submenu " + (((props.active || (props.clicked === -1 && match) || props.data.search) && !appSidebarMinified) ? 'd-block ' : 'd-none')}>
								{props.data.children && props.data.children.map((submenu, i) => (
									<SidebarNavList
										data={submenu} 
										key={i} 
										expand={(e) => handleExpand(e, i, match)}
										active={i === state.active} 
										clicked={state.clicked}
									/>
								))}
							</div>
						)}
					</div>
				)} />
			)}
		</AppSettings.Consumer>
	);
	
}

export default SidebarNavList;