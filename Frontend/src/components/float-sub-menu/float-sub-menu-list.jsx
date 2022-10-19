import React from 'react';
import { Route, Link } from 'react-router-dom';
import { AppSettings } from 'config/app-settings.js';

const  FloatSubMenuList = props => {
	const context = AppSettings;

	const [state, setState] = React.useState({
		active: -1,
		clicked: -1
	});
	
	
	const handleExpand = (e, i, match) =>  {
		e.preventDefault();
	
		setState(state => ({
			active: (state.active === i ? -1 : i),
			clicked: 1
		}));
		setTimeout(() => {
			context.handleAppSidebarFloatSubMenuClick();
		}, 0);
	}
  
	
		var icon = props.data.icon && <div className="menu-icon"><i className={props.data.icon}></i></div>;
		var img = props.data.img && <div className="menu-icon-img"><img src={props.data.img} alt="" /></div>;
		var caret = (props.data.children && !props.data.badge) && <div className="menu-caret"></div>;
		var label = props.data.label && <span className="menu-label">{props.data.label}</span>;
		var badge = props.data.badge && <div className="menu-badge">{props.data.badge}</div>;
		var highlight = props.data.highlight && <i className="fa fa-paper-plane text-theme"></i>;
		var title = props.data.title && <div className="menu-text">{props.data.title} {label} {highlight}</div>;
		
		return (
			<AppSettings.Consumer>
				{({appSidebarMinified}) => (
					<Route path={props.data.path} exact={props.data.exact} children={({ match }) => (
						<div className={ "menu-item " + (match ? "active " : "") + ((props.active || (props.clicked === -1 && match)) ? 'expand ' : 'closed ') + (props.data.children ? "has-sub " : "")}>
							{props.data.children ? (
								<Link className="menu-link" to={props.data.path} onClick={props.expand}>{ img } { icon } { title } { badge } { caret }</Link>
							):(
								<Link className="menu-link" to={props.data.path}>{ img } { icon } { title } { badge } { caret }</Link>
							)}
							{props.data.children && (
								<div className={"menu-submenu " + (((props.active || (props.clicked === -1 && match)) && !appSidebarMinified) ? 'd-block ' : 'd-none')}>
									{props.data.children && props.data.children.map((submenu, i) => (
										<FloatSubMenuList
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

export default FloatSubMenuList;