import React from 'react';
import { Route, Link } from 'react-router-dom';
import TopMenuNavList from 'components/top-menu/top-menu-nav-list';
import menus from 'components/top-menu/menu.jsx';

const TopMenuNav = props => {
	const [state, setState] = React.useState({
		active: -1,
		controlLeft: false,
		controlRight: false,
		marginLeft: 0,
		marginRight: 0,
		navWidth: 0
	});
	const topMenu = React.createRef();
	React.useEffect(() => {
		
		var windowWidth = topMenu.current.offsetWidth - 128;
		var listFullWidth = 0;
		var listPrevWidth = 0;
		var listActive = false;
		
		document.querySelectorAll('.app-top-menu .menu > .menu-item')
			.forEach(function (elm) {
			listFullWidth += elm.offsetWidth;
			listPrevWidth += (!listActive) ? elm.offsetWidth : 0;
			listActive = (elm.classList.contains('active')) ? true : listActive;
		});

		listPrevWidth = (!listActive) ? 0 : listPrevWidth;
		
		if (listPrevWidth >= windowWidth) {
			var finalScrollWidth = listPrevWidth - windowWidth + 128;
			var finalLeft, finalRight;
			if (!document.body.classList.contains('rtl-mode')) { 
				finalLeft = finalScrollWidth;
				finalRight = 0;
			} else {
				finalRight = finalScrollWidth;
				finalLeft = 0;
			}
			topMenu.current.setState({
				marginLeft: finalLeft,
				marginRight: finalRight
			});
		}
		
		topMenu.current.setState({
			navWidth: listFullWidth,
			controlLeft: (listPrevWidth >= windowWidth && listFullWidth >= windowWidth) ? true : false,
			controlRight: (listPrevWidth !== listFullWidth && listFullWidth >= windowWidth) ? true : false
		});
	})


	
	const handleExpand = (e, i, match) => {
		e.preventDefault();
		setState({active: (state.active === i ? -1 : i)});
	}
	
	const controlRight = (e) => {
		e.preventDefault();
		var containerWidth = document.querySelector('.app-top-menu').offsetWidth - 88;
		var widthLeft = state.navWidth + (-state.marginLeft) - containerWidth;
		var finalScrollWidth = 0;

		if (widthLeft <= containerWidth) {
			finalScrollWidth = widthLeft - (-state.marginLeft) + 128;
			setState({controlRight: false});
		} else {
			finalScrollWidth = containerWidth - (-state.marginLeft) - 128;
		}

		if (finalScrollWidth !== 0) {
			if (!document.body.classList.contains('rtl-mode')) { 
				setState({
					marginRight: 0,
					marginLeft: finalScrollWidth
				});
			} else {
				setState({
					marginLeft: 0,
					marginRight: finalScrollWidth
				});
			}
			setState({controlLeft: true});
		}
	}

	const controlLeft = (e) => {
		e.preventDefault();
		var widthLeft = state.marginLeft;
		var containerWidth = document.querySelector('.app-top-menu').offsetWidth;
		var finalScrollWidth = 0;

		if (widthLeft <= containerWidth) {
			finalScrollWidth = 0;
			setState({controlLeft: false});
		} else {
			finalScrollWidth = widthLeft - containerWidth - 88;
			setState({controlLeft: true});
		}
		if (!document.body.classList.contains('rtl-mode')) { 
			setState({
				marginLeft: finalScrollWidth,
				marginRight: 0,
				controlRight: true
			});
		} else {
			setState({
				marginLeft: 0,
				marginRight: finalScrollWidth,
				controlRight: true
			});
		}
	}
	return (
		<div ref={topMenu} className="menu" style={{ marginLeft: '-' + state.marginLeft + 'px', marginRight: '-'+ state.marginRight + 'px' }}>
			{menus.map((menu, i) => (
				<Route path={menu.path} exact={menu.exact} key={i} children={({ match }) => (
					<TopMenuNavList
						data={menu} 
						key={i} 
						expand={(e) => handleExpand(e, i, match)}
						active={i === state.active} 
						clicked={state.clicked}
					/>
				)} />
			))}
			<div className={'menu-item menu-control menu-control-start ' + (state.controlLeft ? 'show' : '')}>
				<Link className="menu-link" to="/" onClick={controlLeft}><i className="fa fa-angle-left"></i></Link>
			</div>
			<div className={'menu-item menu-control menu-control-end ' + (state.controlRight ? 'show' : '')}>
				<Link className="menu-link" to="/" onClick={controlRight}><i className="fa fa-angle-right"></i></Link>
			</div>
		</div>
	);
	
}

export default TopMenuNav;