import React from 'react';
import { AppSettings } from './config/app-settings.js';
import Header from './components/header/header.jsx';
import Sidebar from './components/sidebar/sidebar.jsx';
import SidebarRight from './components/sidebar-right/sidebar-right.jsx';
import TopMenu from './components/top-menu/top-menu.jsx';
import Content from './components/content/content.jsx';
import FloatSubMenu from './components/float-sub-menu/float-sub-menu.jsx';
import ThemePanel from './components/theme-panel/theme-panel.jsx';
import LoginService from '../src/services/LoginService';
import { getUser, getPass, login } from '../src/utils/auth';


class App extends React.Component {


	constructor(props) {
		super(props);			
		this.toggleAppSidebarMinify = (e) => {
			e.preventDefault();
			if (this.state.appSidebarMinify) {
				this.setState(state => ({
					appSidebarFloatSubMenuActive: false
				}));
			}
			this.setState(state => ({
				appSidebarMinify: !this.state.appSidebarMinify
			}));
		}
		this.toggleAppSidebarMobile = (e) => {
			e.preventDefault();
			this.setState(state => ({
				appSidebarMobileToggled: !this.state.appSidebarMobileToggled
			}));
		}
		this.handleSetAppSidebarNone = (value) => {
			this.setState(state => ({
				appSidebarNone: value
			}));
		}
		this.handleSetAppSidebarMinified = (value) => {
			this.setState(state => ({
				appSidebarMinify: value
			}));
		}
		this.handleSetAppSidebarWide = (value) => {
			this.setState(state => ({
				appSidebarWide: value
			}));
		}
		this.handleSetAppSidebarLight = (value) => {
			this.setState(state => ({
				appSidebarLight: value
			}));
		}
		this.handleSetAppSidebarTransparent = (value) => {
			this.setState(state => ({
				appSidebarTransparent: value
			}));
		}
		this.handleSetAppSidebarSearch = (value) => {
			this.setState(state => ({
				appSidebarSearch: value
			}));
		}
		this.handleSetAppSidebarFixed = (value) => {
			if (value === true && !this.state.appHeaderFixed) {
				alert('Default Header with Fixed Sidebar option is not supported. Proceed with Fixed Header with Fixed Sidebar.');
				this.setState(state => ({
					appHeaderFixed: value
				}));
			}
			this.setState(state => ({
				appSidebarFixed: value
			}));
		}
		this.handleSetAppSidebarGrid = (value) => {
			this.setState(state => ({
				appSidebarGrid: value
			}));
		}
		
		this.toggleAppSidebarEnd = (e) => {
			e.preventDefault();
			this.setState(state => ({
				appSidebarEndToggled: !this.state.appSidebarEndToggled
			}));
		}
		this.toggleAppSidebarEndMobile = (e) => {
			e.preventDefault();
			this.setState(state => ({
				appSidebarEndMobileToggled: !this.state.appSidebarEndMobileToggled
			}));
		}
		this.handleSetAppSidebarEnd = (value) => {
			this.setState(state => ({
				appSidebarEnd: value
			}));
		}
		
		var appSidebarFloatSubMenuRemove;
		var appSidebarFloatSubMenuCalculate;
		var appSidebarFloatSubMenuRemoveTime = 250;
		this.handleAppSidebarFloatSubMenuOnMouseOver = (e) => {
			clearTimeout(appSidebarFloatSubMenuRemove);
			clearTimeout(appSidebarFloatSubMenuCalculate);
		}
		this.handleAppSidebarFloatSubMenuOnMouseOut = (e) => {
			appSidebarFloatSubMenuRemove = setTimeout(() => {
				this.setState(state => ({
					appSidebarFloatSubMenuActive: false
				}));
			}, appSidebarFloatSubMenuRemoveTime);
		}
		this.handleAppSidebarOnMouseOver = (e, menu) => {
			if (this.state.appSidebarMinify) {
				if (menu.children) {
					var left = (document.getElementById('sidebar').offsetWidth + document.getElementById('sidebar').offsetLeft) + 'px';
					
					clearTimeout(appSidebarFloatSubMenuRemove);
					clearTimeout(appSidebarFloatSubMenuCalculate);
			
					this.setState(state => ({
						appSidebarFloatSubMenu: menu,
						appSidebarFloatSubMenuActive: true,
						appSidebarFloatSubMenuLeft: left
					}));
					
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
						
						this.setState(state => ({
							appSidebarFloatSubMenuTop: top,
							appSidebarFloatSubMenuBottom: bottom,
							appSidebarFloatSubMenuLineTop: lineTop,
							appSidebarFloatSubMenuLineBottom: lineBottom,
							appSidebarFloatSubMenuArrowTop: arrowTop,
							appSidebarFloatSubMenuArrowBottom: arrowBottom,
							appSidebarFloatSubMenuOffset: offset
						}));
					}, 0);
					
				} else {
					appSidebarFloatSubMenuRemove = setTimeout(() => {
						this.setState(state => ({
							appSidebarFloatSubMenu: '',
							appSidebarFloatSubMenuActive: false
						}));
					}, appSidebarFloatSubMenuRemoveTime);
				}
			}
		}
		this.handleAppSidebarOnMouseOut = (e) => {
			if (this.state.appSidebarMinify) {
				appSidebarFloatSubMenuRemove = setTimeout(() => {
					this.setState(state => ({
						appSidebarFloatSubMenuActive: false
					}));
				}, appSidebarFloatSubMenuRemoveTime);
			}
		}
		this.handleAppSidebarFloatSubMenuClick = () => {
			if (this.state.appSidebarMinify) {
				const windowHeight = window.innerHeight;
				const targetHeight = document.getElementById('app-sidebar-float-submenu').offsetHeight;
				const targetTop = this.state.appSidebarFloatSubMenuOffset.top;
				const top = ((windowHeight - targetTop) > targetHeight) ? targetTop : 'auto';
				const left = (this.state.appSidebarFloatSubMenuOffset.left + document.getElementById('sidebar').offsetWidth) + 'px';
				const bottom = ((windowHeight - targetTop) > targetHeight) ? 'auto' : '0';
				const arrowTop = ((windowHeight - targetTop) > targetHeight) ? '20px' : 'auto';
				const arrowBottom = ((windowHeight - targetTop) > targetHeight) ? 'auto' : ((windowHeight - targetTop) - 21) + 'px';
				const lineTop = ((windowHeight - targetTop) > targetHeight) ? '20px' : 'auto';
				const lineBottom = ((windowHeight - targetTop) > targetHeight) ? 'auto' : ((windowHeight - targetTop) - 21) + 'px';
			
				this.setState(state => ({
					appSidebarFloatSubMenuTop: top,
					appSidebarFloatSubMenuLeft: left,
					appSidebarFloatSubMenuBottom: bottom,
					appSidebarFloatSubMenuLineTop: lineTop,
					appSidebarFloatSubMenuLineBottom: lineBottom,
					appSidebarFloatSubMenuArrowTop: arrowTop,
					appSidebarFloatSubMenuArrowBottom: arrowBottom
				}));
			}
		}
		
		this.handleSetAppContentNone = (value) => {
			this.setState(state => ({
				appContentNone: value
			}));
		}
		this.handleSetAppContentClass = (value) => {
			this.setState(state => ({
				appContentClass: value
			}));
		}
		this.handleSetAppContentFullHeight = (value) => {
			this.setState(state => ({
				appContentFullHeight: value
			}));
		}
		
		this.handleSetAppHeaderNone = (value) => {
			this.setState(state => ({
				appHeaderNone: value
			}));
		}
		this.handleSetAppHeaderFixed = (value) => {
			if (value === false && this.state.appSidebarFixed) {
				alert('Default Header with Fixed Sidebar option is not supported. Proceed with Default Header with Default Sidebar.');
				this.setState(state => ({
					appSidebarFixed: false
				}));
			}
			this.setState(state => ({
				appHeaderFixed: value
			}));
		}
		this.handleSetAppHeaderInverse = (value) => {
			this.setState(state => ({
				appHeaderInverse: value
			}));
		}
		this.handleSetAppHeaderMegaMenu = (value) => {
			this.setState(state => ({
				appHeaderMegaMenu: value
			}));
		}
		this.handleSetAppHeaderLanguageBar = (value) => {
			this.setState(state => ({
				appHeaderLanguageBar: value
			}));
		}
		
		this.handleSetAppTopMenu = (value) => {
			this.setState(state => ({
				appTopMenu: value
			}));
		}
		this.toggleAppTopMenuMobile = (e) => {
			e.preventDefault();
			this.setState(state => ({
				appTopMenuMobileToggled: !this.state.appTopMenuMobileToggled
			}));
		}
		this.handleSetAppSidebarTwo = (value) => {
			this.setState(state => ({
				appSidebarTwo: value
			}));
			this.setState(state => ({
				appSidebarEndToggled: value
			}));
		}
		this.handleSetAppBoxedLayout = (value) => {
			if (value === true) {
				document.body.classList.add('boxed-layout');
			} else {
				document.body.classList.remove('boxed-layout');
			}
		}
		this.handleSetAppDarkMode = (value) => {
			if (value === true) {
				document.body.classList.add('dark-mode');
			} else {
				document.body.classList.remove('dark-mode');
			}
			this.handleSetColor();
		}
		this.handleSetAppGradientEnabled = (value) => {
			this.setState(state => ({
				appGradientEnabled: value
			}));
		}
		this.handleSetFont = () => {
			this.setState(state => ({
				font: {
					family: window.getComputedStyle(document.body).getPropertyValue('--bs-body-font-family').trim(),
					size: window.getComputedStyle(document.body).getPropertyValue('--bs-body-font-size').trim(),
					weight: window.getComputedStyle(document.body).getPropertyValue('--bs-body-font-family').trim()
				}
			}));
		}
		this.handleSetColor = () => {
			this.setState(state => ({							
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
			}));
		}
		this.handleSetAppTheme = (value) => {
			var newTheme = 'theme-' + value;
			for (var x = 0; x < document.body.classList.length; x++) {
				if ((document.body.classList[x]).indexOf('theme-') > -1 && document.body.classList[x] !== newTheme) {
					document.body.classList.remove(document.body.classList[x]);
				}
			}
			document.body.classList.add(newTheme);
		}
		
		this.state = {
			appTheme: '',
			appDarkMode: false,
			appGradientEnabled: false,			
			appHeaderNone: false,
			appHeaderFixed: true,
			appHeaderInverse: false,
			appHeaderMegaMenu: false,
			appHeaderLanguageBar: false,
			hasScroll: false,
			handleSetAppHeaderNone: this.handleSetAppHeaderNone,
			handleSetAppHeaderInverse: this.handleSetAppHeaderInverse,
			handleSetAppHeaderLanguageBar: this.handleSetAppHeaderLanguageBar,
			handleSetAppHeaderMegaMenu: this.handleSetAppHeaderMegaMenu,
			handleSetAppHeaderFixed: this.handleSetAppHeaderFixed,
			
			appSidebarNone: false,
			appSidebarWide: false,
			appSidebarLight: false,
			appSidebarMinify: false,
			appSidebarMobileToggled: false,
			appSidebarTransparent: false,
			appSidebarSearch: false,
			appSidebarFixed: true,
			appSidebarGrid: false,
			handleSetAppSidebarNone: this.handleSetAppSidebarNone,
			handleSetAppSidebarWide: this.handleSetAppSidebarWide,
			handleSetAppSidebarLight: this.handleSetAppSidebarLight,
			handleSetAppSidebarMinified: this.handleSetAppSidebarMinified,
			handleSetAppSidebarTransparent: this.handleSetAppSidebarTransparent,
			handleSetAppSidebarSearch: this.handleSetAppSidebarSearch,
			handleSetAppSidebarFixed: this.handleSetAppSidebarFixed,
			handleSetAppSidebarGrid: this.handleSetAppSidebarGrid,
			handleAppSidebarOnMouseOut: this.handleAppSidebarOnMouseOut,
			handleAppSidebarOnMouseOver: this.handleAppSidebarOnMouseOver,
			toggleAppSidebarMinify: this.toggleAppSidebarMinify,
			toggleAppSidebarMobile: this.toggleAppSidebarMobile,
			
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
			handleAppSidebarFloatSubMenuOnMouseOver: this.handleAppSidebarFloatSubMenuOnMouseOver,
			handleAppSidebarFloatSubMenuOnMouseOut: this.handleAppSidebarFloatSubMenuOnMouseOut,
			handleAppSidebarFloatSubMenuClick: this.handleAppSidebarFloatSubMenuClick,
			
			appContentNone: false,
			appContentClass: '',
			appContentFullHeight: false,
			handleSetAppContentNone: this.handleSetAppContentNone,
			handleSetAppContentClass: this.handleSetAppContentClass,
			handleSetAppContentFullHeight: this.handleSetAppContentFullHeight,
			
			appTopMenu: false,
			appTopMenuMobileToggled: false,
			toggleAppTopMenuMobile: this.toggleAppTopMenuMobile,
			handleSetAppTopMenu: this.handleSetAppTopMenu,
			
			appSidebarTwo: false,
			handleSetAppSidebarTwo: this.handleSetAppSidebarTwo,
			
			appSidebarEnd: false,
			appSidebarEndToggled: false,
			appSidebarEndMobileToggled: false,
			toggleAppSidebarEnd: this.toggleAppSidebarEnd,
			toggleAppSidebarEndMobile: this.toggleAppSidebarEndMobile,
			handleSetAppSidebarEnd: this.handleSetAppSidebarEnd,
			
			handleSetAppBoxedLayout: this.handleSetAppBoxedLayout,
			handleSetAppDarkMode: this.handleSetAppDarkMode,
			handleSetAppGradientEnabled: this.handleSetAppGradientEnabled,
			handleSetAppTheme: this.handleSetAppTheme,
			
			handleSetColor: this.handleSetColor,
			
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
			}
		};
	}

	tokenRefresh  = async () => {		
		const data_json = { 'email': getUser(), 'password': getPass() }			
		const response = await LoginService.post_refresh(data_json);
		login(response);		
	}

	componentDidMount() {
		this.handleSetColor();
		this.handleSetFont();
		this.handleSetAppTheme(this.state.appTheme);
		window.addEventListener('scroll', this.handleScroll)
		setInterval(() => this.tokenRefresh(),60000);
	} 
	
	componentWillUnmount() {
		window.removeEventListener('scroll', this.handleScroll)
	}
  
	handleScroll = () => {
		if (window.scrollY > 0) {
			this.setState(state => ({
					hasScroll: true
				}));
		} else {
			this.setState(state => ({
					hasScroll: false
				}));
		}
		var elm = document.getElementsByClassName('nvtooltip');
		for (var i = 0; i < elm.length; i++) {
			elm[i].classList.add('d-none');
		}
	}
	

	render() {		
		return (
			
			<AppSettings.Provider value={this.state}>
				<div className={
					'app ' +
					(this.state.appGradientEnabled ? 'app-gradient-enabled ' : '') + 
					(this.state.appHeaderNone ? 'app-without-header ' : '') + 
					(this.state.appHeaderFixed && !this.state.appHeaderNone ? 'app-header-fixed ' : '') + 
					(this.state.appSidebarFixed ? 'app-sidebar-fixed ' : '') +
					(this.state.appSidebarNone ? 'app-without-sidebar ' : '') + 
					(this.state.appSidebarEnd ? 'app-with-end-sidebar ' : '') +
					(this.state.appSidebarWide ? 'app-with-wide-sidebar ' : '') +
					(this.state.appSidebarLight ? 'app-with-light-sidebar ' : '') +
					(this.state.appSidebarMinify ? 'app-sidebar-minified ' : '') + 
					(this.state.appSidebarMobileToggled ? 'app-sidebar-mobile-toggled ' : '') + 
					(this.state.appTopMenu ? 'app-with-top-menu ' : '') + 
					(this.state.appContentFullHeight ? 'app-content-full-height ' : '') + 
					(this.state.appSidebarTwo ? 'app-with-two-sidebar ' : '') + 
					(this.state.appSidebarEndToggled ? 'app-sidebar-end-toggled ' : '') + 
					(this.state.appSidebarEndMobileToggled ? 'app-sidebar-end-mobile-toggled ' : '') + 
					(this.state.hasScroll ? 'has-scroll ' : '')
				}>
					{!this.state.appHeaderNone && (<Header />)}					
					{!this.state.appSidebarNone && (<Sidebar />)} 
					{this.state.appSidebarTwo && (<SidebarRight />)}
					{this.state.appTopMenu && (<TopMenu />)}
					{!this.state.appContentNone && (<Content/>)}
					<FloatSubMenu />
					<ThemePanel />			
				</div>
				</AppSettings.Provider>
				
		)
	}
}

export default App;
