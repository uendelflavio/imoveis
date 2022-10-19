import React from 'react';
import { AppSettings } from 'config/app-settings.js';
import Header from 'components/header/header.jsx';
import Sidebar from 'components/sidebar/sidebar.jsx';
import SidebarRight from 'components/sidebar-right/sidebar-right.jsx';
import TopMenu from 'components/top-menu/top-menu.jsx';
import Content from 'components/content/content.jsx';
import FloatSubMenu from 'components/float-sub-menu/float-sub-menu.jsx';
import ThemePanel from 'components/theme-panel/theme-panel.jsx';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AppHooks = props => {	

	const toggleAppSidebarMinify = e => {
		e.preventDefault();
		if (state.appSidebarMinify) setState({ appSidebarFloatSubMenuActive: false });
		setState({ ...state,appSidebarMinify: !state.appSidebarMinify });
	}

	const toggleAppSidebarMobile = e => {
		e.preventDefault();
		setState({ ...state,appSidebarMobileToggled: !state.appSidebarMobileToggled });
	}

	const handleSetAppSidebarNone = value => setState({ ...state,appSidebarNone: value });
	
	const handleSetAppSidebarMinified = value => setState({ ...state,appSidebarMinify: value });
	
	const handleSetAppSidebarWide = value => setState({ ...state,appSidebarWide: value });
	
	const handleSetAppSidebarLight = value => setState({ ...state,appSidebarLight: value });
	
	const handleSetAppSidebarTransparent = value => setState({ ...state,appSidebarTransparent: value });
	
	const handleSetAppSidebarSearch = value => setState({ ...state,appSidebarSearch: value });
	
	const handleSetAppSidebarFixed = value => {
		if (value === true && !state.appHeaderFixed) {
			alert('Default Header with Fixed Sidebar option is not supported. Proceed with Fixed Header with Fixed Sidebar.');
			setState({ ...state,appHeaderFixed: value });
		}
		setState({ ...state,appSidebarFixed: value });
	}

	const handleSetAppSidebarGrid = value => setState({ ...state,appSidebarGrid: value });
	
	const toggleAppSidebarEnd = e => {
		e.preventDefault();
		setState({ ...state,appSidebarEndToggled: !state.appSidebarEndToggled });
	}

	const toggleAppSidebarEndMobile = e => {
		e.preventDefault();
		setState({ ...state,appSidebarEndMobileToggled: !state.appSidebarEndMobileToggled });
	}

	const handleSetAppSidebarEnd = value => setState({ ...state,appSidebarEnd: value });
			
	var appSidebarFloatSubMenuRemove;
	var appSidebarFloatSubMenuCalculate;
	var appSidebarFloatSubMenuRemoveTime = 250;

	const handleAppSidebarFloatSubMenuOnMouseOver = e => {
		e.preventDefault();
		clearTimeout(appSidebarFloatSubMenuRemove);
		clearTimeout(appSidebarFloatSubMenuCalculate);
	}

	const handleAppSidebarFloatSubMenuOnMouseOut = e => {
		e.preventDefault();
		appSidebarFloatSubMenuRemove = setTimeout(() => {
			setState({ ...state,appSidebarFloatSubMenuActive: false });
		}, appSidebarFloatSubMenuRemoveTime);
	}

	const handleAppSidebarOnMouseOver = (e, menu) => {
		if (state.appSidebarMinify) {
			if (menu.children) {
				var left = (document.getElementById('sidebar').offsetWidth + document.getElementById('sidebar').offsetLeft) + 'px';
				
				clearTimeout(appSidebarFloatSubMenuRemove);
				clearTimeout(appSidebarFloatSubMenuCalculate);
		
				setState({
					...state,
					appSidebarFloatSubMenu: menu,
					appSidebarFloatSubMenuActive: true,
					appSidebarFloatSubMenuLeft: left
				});
				
				var offset = e.currentTarget.offsetParent.getBoundingClientRect();
				
				appSidebarFloatSubMenuCalculate = setTimeout(() => {
					var targetTop = offset.top;
					var windowHeight = window.innerHeight;
					var targetHeight = document.querySelector('.app-sidebar-float-submenu-container').offsetHeight;
					var top, bottom, arrowTop, arrowBottom, lineTop, lineBottom;
					
					if ((windowHeight - targetTop) > targetHeight) {
						top = offset.top + 'px';
						bottom = 'auto';
						arrowTop = '20px';
						arrowBottom = 'auto';
						lineTop = '20px';
						lineBottom = 'auto';
					} else {
						var aBottom = (windowHeight - targetTop) - 21;
						top = 'auto';
						bottom = '0';
						arrowTop = 'auto';
						arrowBottom = aBottom + 'px';
						lineTop = '20px';
						lineBottom = aBottom + 'px';
					}
					
					setState({
						...state,
						appSidebarFloatSubMenuTop: top,
						appSidebarFloatSubMenuBottom: bottom,
						appSidebarFloatSubMenuLineTop: lineTop,
						appSidebarFloatSubMenuLineBottom: lineBottom,
						appSidebarFloatSubMenuArrowTop: arrowTop,
						appSidebarFloatSubMenuArrowBottom: arrowBottom,
						appSidebarFloatSubMenuOffset: offset
					});
				}, 0);
				
			} else {
				appSidebarFloatSubMenuRemove = setTimeout(() => {
					setState({
						...state,
						appSidebarFloatSubMenu: '',
						appSidebarFloatSubMenuActive: false
					});
				}, appSidebarFloatSubMenuRemoveTime);
			}
		}
	}

	const handleAppSidebarOnMouseOut = e => {
		if (state.appSidebarMinify) {
			appSidebarFloatSubMenuRemove = setTimeout(() => {
				setState({ ...state,appSidebarFloatSubMenuActive: false });
			}, appSidebarFloatSubMenuRemoveTime);
		}
	}

	const handleAppSidebarFloatSubMenuClick = () => {
		if (state.appSidebarMinify) {
			const windowHeight = window.innerHeight;
			const targetHeight = document.getElementById('app-sidebar-float-submenu').offsetHeight;
			const targetTop = state.appSidebarFloatSubMenuOffset.top;
			const top = ((windowHeight - targetTop) > targetHeight) ? targetTop : 'auto';
			const left = (state.appSidebarFloatSubMenuOffset.left + document.getElementById('sidebar').offsetWidth) + 'px';
			const bottom = ((windowHeight - targetTop) > targetHeight) ? 'auto' : '0';
			const arrowTop = ((windowHeight - targetTop) > targetHeight) ? '20px' : 'auto';
			const arrowBottom = ((windowHeight - targetTop) > targetHeight) ? 'auto' : ((windowHeight - targetTop) - 21) + 'px';
			const lineTop = ((windowHeight - targetTop) > targetHeight) ? '20px' : 'auto';
			const lineBottom = ((windowHeight - targetTop) > targetHeight) ? 'auto' : ((windowHeight - targetTop) - 21) + 'px';
		
			setState({
				...state,
				appSidebarFloatSubMenuTop: top,
				appSidebarFloatSubMenuLeft: left,
				appSidebarFloatSubMenuBottom: bottom,
				appSidebarFloatSubMenuLineTop: lineTop,
				appSidebarFloatSubMenuLineBottom: lineBottom,
				appSidebarFloatSubMenuArrowTop: arrowTop,
				appSidebarFloatSubMenuArrowBottom: arrowBottom
			});
		}
	}
	
	const handleSetAppContentNone = value => setState({ ...state,appContentNone: value });
	
	const handleSetAppContentClass = value => setState({ ...state,appContentClass: value });
	
	const handleSetAppContentFullHeight = value => setState({ ...state,appContentFullHeight: value });
			
	const handleSetAppHeaderNone = value => setState({ ...state,appHeaderNone: value });
	
	const handleSetAppHeaderFixed = value => {
		if (value === false && state.appSidebarFixed) {
			alert('Default Header with Fixed Sidebar option is not supported. Proceed with Default Header with Default Sidebar.');
			setState({ ...state,appSidebarFixed: false });
		}
		setState({ ...state,appHeaderFixed: value });
	}

	const handleSetAppHeaderInverse = value => setState({ ...state,appHeaderInverse: value });
	
	const handleSetAppHeaderMegaMenu = value => setState({ ...state,appHeaderMegaMenu: value });
	
	const handleSetAppHeaderLanguageBar = value => setState({ ...state,appHeaderLanguageBar: value });
		
	const handleSetAppTopMenu = value => setState({ ...state,appTopMenu: value });
	
	const toggleAppTopMenuMobile = e => {
		e.preventDefault();
		setState({ ...state,appTopMenuMobileToggled: !state.appTopMenuMobileToggled });
	}

	const handleSetAppSidebarTwo = value => {
		setState({ ...state,appSidebarTwo: value });
		setState({ ...state,appSidebarEndToggled: value });
	}

	const handleSetAppBoxedLayout = value => {
		if (value === true) {
			document.body.classList.add('boxed-layout');
		} else {
			document.body.classList.remove('boxed-layout');
		}
	}

	const handleSetAppDarkMode = value => {
		if (value === true) {
			document.body.classList.add('dark-mode');
		} else {
			document.body.classList.remove('dark-mode');
		}
		handleSetColor();
	}

	const handleSetAppGradientEnabled = value => setState({ ...state,appGradientEnabled: value });
	
	const handleSetFont = () => {
		setState({
			...state,
			font: {
				family: window.getComputedStyle(document.body).getPropertyValue('--bs-body-font-family').trim(),
				size: window.getComputedStyle(document.body).getPropertyValue('--bs-body-font-size').trim(),
				weight: window.getComputedStyle(document.body).getPropertyValue('--bs-body-font-family').trim()
			}
		});
	}

	const handleSetColor = () => {
		setState({
			...state,
			color: {
				componentColor: window.getComputedStyle(document.body).getPropertyValue('--app-component-color').trim(),
				componentBg: window.getComputedStyle(document.body).getPropertyValue('--app-component-bg').trim(),
				dark: window.getComputedStyle(document.body).getPropertyValue('--bs-dark').trim(),
				light: window.getComputedStyle(document.body).getPropertyValue('--bs-light').trim(),
				blue: window.getComputedStyle(document.body).getPropertyValue('--bs-blue').trim(),
				indigo: window.getComputedStyle(document.body).getPropertyValue('--bs-indigo').trim(),
				purple: window.getComputedStyle(document.body).getPropertyValue('--bs-purple').trim(),
				pink: window.getComputedStyle(document.body).getPropertyValue('--bs-pink').trim(),
				red: window.getComputedStyle(document.body).getPropertyValue('--bs-red').trim(),
				orange: window.getComputedStyle(document.body).getPropertyValue('--bs-orange').trim(),
				yellow: window.getComputedStyle(document.body).getPropertyValue('--bs-yellow').trim(),
				green: window.getComputedStyle(document.body).getPropertyValue('--bs-green').trim(),
				success: window.getComputedStyle(document.body).getPropertyValue('--bs-success').trim(),
				teal: window.getComputedStyle(document.body).getPropertyValue('--bs-teal').trim(),
				cyan: window.getComputedStyle(document.body).getPropertyValue('--bs-cyan').trim(),
				white: window.getComputedStyle(document.body).getPropertyValue('--bs-white').trim(),
				gray: window.getComputedStyle(document.body).getPropertyValue('--bs-gray').trim(),
				lime: window.getComputedStyle(document.body).getPropertyValue('--bs-lime').trim(),
				gray100: window.getComputedStyle(document.body).getPropertyValue('--bs-gray-100').trim(),
				gray200: window.getComputedStyle(document.body).getPropertyValue('--bs-gray-200').trim(),
				gray300: window.getComputedStyle(document.body).getPropertyValue('--bs-gray-300').trim(),
				gray400: window.getComputedStyle(document.body).getPropertyValue('--bs-gray-400').trim(),
				gray500: window.getComputedStyle(document.body).getPropertyValue('--bs-gray-500').trim(),
				gray600: window.getComputedStyle(document.body).getPropertyValue('--bs-gray-600').trim(),
				gray700: window.getComputedStyle(document.body).getPropertyValue('--bs-gray-700').trim(),
				gray800: window.getComputedStyle(document.body).getPropertyValue('--bs-gray-800').trim(),
				gray900: window.getComputedStyle(document.body).getPropertyValue('--bs-gray-900').trim(),
				black: window.getComputedStyle(document.body).getPropertyValue('--bs-black').trim(),
				componentColorRgb: window.getComputedStyle(document.body).getPropertyValue('--app-component-color-rgb').trim(),
				componentBgRgb: window.getComputedStyle(document.body).getPropertyValue('--app-component-bg-rgb').trim(),
				darkRgb: window.getComputedStyle(document.body).getPropertyValue('--bs-dark-rgb').trim(),
				lightRgb: window.getComputedStyle(document.body).getPropertyValue('--bs-light-rgb').trim(),
				blueRgb: window.getComputedStyle(document.body).getPropertyValue('--bs-blue-rgb').trim(),
				indigoRgb: window.getComputedStyle(document.body).getPropertyValue('--bs-indigo-rgb').trim(),
				purpleRgb: window.getComputedStyle(document.body).getPropertyValue('--bs-purple-rgb').trim(),
				pinkRgb: window.getComputedStyle(document.body).getPropertyValue('--bs-pink-rgb').trim(),
				redRgb: window.getComputedStyle(document.body).getPropertyValue('--bs-red-rgb').trim(),
				orangeRgb: window.getComputedStyle(document.body).getPropertyValue('--bs-orange-rgb').trim(),
				yellowRgb: window.getComputedStyle(document.body).getPropertyValue('--bs-yellow-rgb').trim(),
				greenRgb: window.getComputedStyle(document.body).getPropertyValue('--bs-green-rgb').trim(),
				successRgb: window.getComputedStyle(document.body).getPropertyValue('--bs-success-rgb').trim(),
				tealRgb: window.getComputedStyle(document.body).getPropertyValue('--bs-teal-rgb').trim(),
				cyanRgb: window.getComputedStyle(document.body).getPropertyValue('--bs-cyan-rgb').trim(),
				whiteRgb: window.getComputedStyle(document.body).getPropertyValue('--bs-white-rgb').trim(),
				grayRgb: window.getComputedStyle(document.body).getPropertyValue('--bs-gray-rgb').trim(),
				limeRgb: window.getComputedStyle(document.body).getPropertyValue('--bs-lime-rgb').trim(),
				gray100Rgb: window.getComputedStyle(document.body).getPropertyValue('--bs-gray-100-rgb').trim(),
				gray200Rgb: window.getComputedStyle(document.body).getPropertyValue('--bs-gray-200-rgb').trim(),
				gray300Rgb: window.getComputedStyle(document.body).getPropertyValue('--bs-gray-300-rgb').trim(),
				gray400Rgb: window.getComputedStyle(document.body).getPropertyValue('--bs-gray-400-rgb').trim(),
				gray500Rgb: window.getComputedStyle(document.body).getPropertyValue('--bs-gray-500-rgb').trim(),
				gray600Rgb: window.getComputedStyle(document.body).getPropertyValue('--bs-gray-600-rgb').trim(),
				gray700Rgb: window.getComputedStyle(document.body).getPropertyValue('--bs-gray-700-rgb').trim(),
				gray800Rgb: window.getComputedStyle(document.body).getPropertyValue('--bs-gray-800-rgb').trim(),
				gray900Rgb: window.getComputedStyle(document.body).getPropertyValue('--bs-gray-900-rgb').trim(),
				blackRgb: window.getComputedStyle(document.body).getPropertyValue('--bs-black-rgb').trim()
			}
		});
	}

	const handleSetAppTheme = value => {
		var newTheme = 'theme-' + value;
		for (var x = 0; x < document.body.classList.length; x++) {
			if ((document.body.classList[x]).indexOf('theme-') > -1 && document.body.classList[x] !== newTheme) {
				document.body.classList.remove(document.body.classList[x]);
			}
		}
		document.body.classList.add(newTheme);
	}

	const handleScroll = () => {
		if (window.scrollY > 0) {
			setState({ ...state,hasScroll: true });
		} else {
			setState({ ...state,hasScroll: false });
		}
		var elm = document.getElementsByClassName('nvtooltip');
		for (var i = 0; i < elm.length; i++) {
			elm[i].classList.add('d-none');
		}
	}
    
	const [state, setState] = React.useState({
		appTheme: '',
		appDarkMode: false,
		appGradientEnabled: false,
		appHeaderNone: false,
		appHeaderFixed: true,
		appHeaderInverse: false,
		appHeaderMegaMenu: false,
		appHeaderLanguageBar: false,
		hasScroll: false,
		appSidebarNone: false,
		appSidebarWide: false,
		appSidebarLight: false,
		appSidebarMinify: false,
		appSidebarMobileToggled: false,
		appSidebarTransparent: false,
		appSidebarSearch: false,
		appSidebarFixed: true,
		appSidebarGrid: false,
		appSidebarFloatSubMenuActive: false,
		appSidebarFloatSubMenu: '',
		appSidebarFloatSubMenuTop: 'auto',
		appSidebarFloatSubMenuLeft: 'auto',
		appSidebarFloatSubMenuBottom: 'auto',
		appSidebarFloatSubMenuLineTop: 'auto',
		appSidebarFloatSubMenuLineBottom: 'auto',
		appSidebarFloatSubMenuArrowTop: 'auto',
		appSidebarFloatSubMenuArrowBottom: 'auto',
		appSidebarFloatSubMenuOffset: '',
		appContentNone: false,
		appContentClass: '',
		appContentFullHeight: false,
		appTopMenu: false,
		appTopMenuMobileToggled: false,
		appSidebarTwo: false,
		appSidebarEnd: false,
		appSidebarEndToggled: false,
		appSidebarEndMobileToggled: false,
		font: {
			family: window.getComputedStyle(document.body).getPropertyValue('--bs-body-font-family').trim(),
			size: window.getComputedStyle(document.body).getPropertyValue('--bs-body-font-size').trim(),
			weight: window.getComputedStyle(document.body).getPropertyValue('--bs-body-font-family').trim()
		},
		color: {
			componentColor: window.getComputedStyle(document.body).getPropertyValue('--app-component-color').trim(),
			componentBg: window.getComputedStyle(document.body).getPropertyValue('--app-component-bg').trim(),
			dark: window.getComputedStyle(document.body).getPropertyValue('--bs-dark').trim(),
			light: window.getComputedStyle(document.body).getPropertyValue('--bs-light').trim(),
			blue: window.getComputedStyle(document.body).getPropertyValue('--bs-blue').trim(),
			indigo: window.getComputedStyle(document.body).getPropertyValue('--bs-indigo').trim(),
			purple: window.getComputedStyle(document.body).getPropertyValue('--bs-purple').trim(),
			pink: window.getComputedStyle(document.body).getPropertyValue('--bs-pink').trim(),
			red: window.getComputedStyle(document.body).getPropertyValue('--bs-red').trim(),
			orange: window.getComputedStyle(document.body).getPropertyValue('--bs-orange').trim(),
			yellow: window.getComputedStyle(document.body).getPropertyValue('--bs-yellow').trim(),
			green: window.getComputedStyle(document.body).getPropertyValue('--bs-green').trim(),
			success: window.getComputedStyle(document.body).getPropertyValue('--bs-success').trim(),
			teal: window.getComputedStyle(document.body).getPropertyValue('--bs-teal').trim(),
			cyan: window.getComputedStyle(document.body).getPropertyValue('--bs-cyan').trim(),
			white: window.getComputedStyle(document.body).getPropertyValue('--bs-white').trim(),
			gray: window.getComputedStyle(document.body).getPropertyValue('--bs-gray').trim(),
			lime: window.getComputedStyle(document.body).getPropertyValue('--bs-lime').trim(),
			gray100: window.getComputedStyle(document.body).getPropertyValue('--bs-gray-100').trim(),
			gray200: window.getComputedStyle(document.body).getPropertyValue('--bs-gray-200').trim(),
			gray300: window.getComputedStyle(document.body).getPropertyValue('--bs-gray-300').trim(),
			gray400: window.getComputedStyle(document.body).getPropertyValue('--bs-gray-400').trim(),
			gray500: window.getComputedStyle(document.body).getPropertyValue('--bs-gray-500').trim(),
			gray600: window.getComputedStyle(document.body).getPropertyValue('--bs-gray-600').trim(),
			gray700: window.getComputedStyle(document.body).getPropertyValue('--bs-gray-700').trim(),
			gray800: window.getComputedStyle(document.body).getPropertyValue('--bs-gray-800').trim(),
			gray900: window.getComputedStyle(document.body).getPropertyValue('--bs-gray-900').trim(),
			black: window.getComputedStyle(document.body).getPropertyValue('--bs-black').trim(),
			componentColorRgb: window.getComputedStyle(document.body).getPropertyValue('--app-component-color-rgb').trim(),
			componentBgRgb: window.getComputedStyle(document.body).getPropertyValue('--app-component-bg-rgb').trim(),
			darkRgb: window.getComputedStyle(document.body).getPropertyValue('--bs-dark-rgb').trim(),
			lightRgb: window.getComputedStyle(document.body).getPropertyValue('--bs-light-rgb').trim(),
			blueRgb: window.getComputedStyle(document.body).getPropertyValue('--bs-blue-rgb').trim(),
			indigoRgb: window.getComputedStyle(document.body).getPropertyValue('--bs-indigo-rgb').trim(),
			purpleRgb: window.getComputedStyle(document.body).getPropertyValue('--bs-purple-rgb').trim(),
			pinkRgb: window.getComputedStyle(document.body).getPropertyValue('--bs-pink-rgb').trim(),
			redRgb: window.getComputedStyle(document.body).getPropertyValue('--bs-red-rgb').trim(),
			orangeRgb: window.getComputedStyle(document.body).getPropertyValue('--bs-orange-rgb').trim(),
			yellowRgb: window.getComputedStyle(document.body).getPropertyValue('--bs-yellow-rgb').trim(),
			greenRgb: window.getComputedStyle(document.body).getPropertyValue('--bs-green-rgb').trim(),
			successRgb: window.getComputedStyle(document.body).getPropertyValue('--bs-success-rgb').trim(),
			tealRgb: window.getComputedStyle(document.body).getPropertyValue('--bs-teal-rgb').trim(),
			cyanRgb: window.getComputedStyle(document.body).getPropertyValue('--bs-cyan-rgb').trim(),
			whiteRgb: window.getComputedStyle(document.body).getPropertyValue('--bs-white-rgb').trim(),
			grayRgb: window.getComputedStyle(document.body).getPropertyValue('--bs-gray-rgb').trim(),
			limeRgb: window.getComputedStyle(document.body).getPropertyValue('--bs-lime-rgb').trim(),
			gray100Rgb: window.getComputedStyle(document.body).getPropertyValue('--bs-gray-100-rgb').trim(),
			gray200Rgb: window.getComputedStyle(document.body).getPropertyValue('--bs-gray-200-rgb').trim(),
			gray300Rgb: window.getComputedStyle(document.body).getPropertyValue('--bs-gray-300-rgb').trim(),
			gray400Rgb: window.getComputedStyle(document.body).getPropertyValue('--bs-gray-400-rgb').trim(),
			gray500Rgb: window.getComputedStyle(document.body).getPropertyValue('--bs-gray-500-rgb').trim(),
			gray600Rgb: window.getComputedStyle(document.body).getPropertyValue('--bs-gray-600-rgb').trim(),
			gray700Rgb: window.getComputedStyle(document.body).getPropertyValue('--bs-gray-700-rgb').trim(),
			gray800Rgb: window.getComputedStyle(document.body).getPropertyValue('--bs-gray-800-rgb').trim(),
			gray900Rgb: window.getComputedStyle(document.body).getPropertyValue('--bs-gray-900-rgb').trim(),
			blackRgb: window.getComputedStyle(document.body).getPropertyValue('--bs-black-rgb').trim()
		},
		handleSetAppSidebarNone,
		handleSetAppSidebarWide,
		handleSetAppSidebarLight,
		handleSetAppSidebarMinified,
		handleSetAppSidebarTransparent,
		handleSetAppSidebarSearch,
		handleSetAppSidebarFixed,
		handleSetAppSidebarGrid,
		handleAppSidebarOnMouseOut,
		handleAppSidebarOnMouseOver,
		toggleAppSidebarMinify,
		toggleAppSidebarMobile,
		handleAppSidebarFloatSubMenuOnMouseOver,
		handleAppSidebarFloatSubMenuOnMouseOut,
		handleAppSidebarFloatSubMenuClick,
		handleSetAppHeaderNone,
		handleSetAppHeaderInverse,
		handleSetAppHeaderLanguageBar,
		handleSetAppHeaderMegaMenu,
		handleSetAppHeaderFixed,
		handleSetAppContentNone,
		handleSetAppContentClass,
		handleSetAppContentFullHeight,
		toggleAppTopMenuMobile,
		handleSetAppTopMenu,
		handleSetAppSidebarTwo,
		toggleAppSidebarEnd,
		toggleAppSidebarEndMobile,
		handleSetAppSidebarEnd,
		handleSetAppBoxedLayout,
		handleSetAppDarkMode,
		handleSetAppGradientEnabled,
		handleSetAppTheme,
		handleSetColor,
	});

	React.useEffect(() => {
		handleSetColor();
		handleSetFont();
		handleSetAppTheme('');
		window.addEventListener('scroll', handleScroll(), { passive: false });
		return () => window.removeEventListener('scroll', handleScroll(), { passive: false })
		
		// eslint-disable-next-line react-hooks/exhaustive-deps
	},[])

	return (	
		<AppSettings.Provider value = {state}>
			<ToastContainer closeButton={false} closeOnClick={false} autoClose={2000} position="top-center" theme="colored" newestOnTop />
			<div className={
				'app ' +
				(state.appGradientEnabled ? 'app-gradient-enabled ' : '') + 
				(state.appHeaderNone ? 'app-without-header ' : '') + 
				(state.appHeaderFixed && !state.appHeaderNone ? 'app-header-fixed ' : '') + 
				(state.appSidebarFixed ? 'app-sidebar-fixed ' : '') +
				(state.appSidebarNone ? 'app-without-sidebar ' : '') + 
				(state.appSidebarEnd ? 'app-with-end-sidebar ' : '') +
				(state.appSidebarWide ? 'app-with-wide-sidebar ' : '') +
				(state.appSidebarLight ? 'app-with-light-sidebar ' : '') +
				(state.appSidebarMinify ? 'app-sidebar-minified ' : '') + 
				(state.appSidebarMobileToggled ? 'app-sidebar-mobile-toggled ' : '') + 
				(state.appTopMenu ? 'app-with-top-menu ' : '') + 
				(state.appContentFullHeight ? 'app-content-full-height ' : '') + 
				(state.appSidebarTwo ? 'app-with-two-sidebar ' : '') + 
				(state.appSidebarEndToggled ? 'app-sidebar-end-toggled ' : '') + 
				(state.appSidebarEndMobileToggled ? 'app-sidebar-end-mobile-toggled ' : '') + 
				(state.hasScroll ? 'has-scroll ' : '')
			}>
				{!state.appHeaderNone && (<Header />)}					
				{!state.appSidebarNone && (<Sidebar />)} 
				{state.appSidebarTwo && (<SidebarRight />)}
				{state.appTopMenu && (<TopMenu />)}
				{!state.appContentNone && (<Content/>)}
				<FloatSubMenu />
				<ThemePanel />			
			</div>
		</AppSettings.Provider>		
	)	
}

export default AppHooks;
