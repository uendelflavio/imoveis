import React from 'react';
import { Route, Link } from 'react-router-dom';

const TopMenuNavList = props => {
	const [state, setState] = React.useState({
		active: -1
	})

	
	 const handleExpand = (e, i, match) =>{
		e.preventDefault();
		setState({active: (state.active === i ? -1 : i)});
	}
  
	var icon = props.data.icon && <div className="menu-icon"><i className={props.data.icon}></i></div>;
	var img = props.data.img && <div className="menu-icon-img"><img src={props.data.img} alt="" /></div>;
	var caret = (props.data.children && !props.data.badge) && <div className="menu-caret"></div>;
	var label = props.data.label && <span className="menu-label ms-5px">{props.data.label}</span>;
	var badge = props.data.badge && <div className="menu-badge">{props.data.badge}</div>;
	var highlight = props.data.highlight && <i className="fa fa-paper-plane text-theme"></i>;
	var title = props.data.title && <div className="menu-text">{props.data.title} {label} {highlight}</div>;
		
	return (
		<Route path={props.data.path} exact={props.data.exact} children={({ match }) => (
			<div className={"menu-item " + (match ? "active " : "") + (props.data.children ? "has-sub " : "")}>
				{props.data.children ? (
					<Link className="menu-link" to={props.data.path} onClick={props.expand}>{ img } { icon } { title } { caret } { badge }</Link>
				):(
					<Link className="menu-link" to={props.data.path}>{ img } { icon } { title } { caret } { badge }</Link>
				)}
				{props.data.children && (
					<div className={"menu-submenu " + (props.active ? 'd-block' : '')}>
						{props.data.children && props.data.children.map((submenu, i) => (
							<TopMenuNavList
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
	);	
}

export default TopMenuNavList;