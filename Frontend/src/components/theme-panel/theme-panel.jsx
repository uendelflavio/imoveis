import React from 'react';
import { AppSettings } from 'config/app-settings';

const ThemePanel = () => {

	const context= React.useContext(AppSettings);
	
	
	const [state, setState] = React.useState({
		expand: false,
		theme: 'dark',
		darkMode: false
	});

	let theme = ['red','pink','orange','yellow','lime','green','teal','cyan','blue','purple','indigo','dark'];
	
	const handleDarkMode = e => {		
		if (e.target.checked) {				
			context.handleSetAppDarkMode(true);				
		} else {					
			context.handleSetAppDarkMode(false);					
		}
	}
	
	const handleHeaderFixed = e => {
		if (e.target.checked) {
			context.handleSetAppHeaderFixed(true);
		} else {
			context.handleSetAppHeaderFixed(false);
		}
	}
	
	const handleSidebarFixed = e => {
		if (e.target.checked) {
			context.handleSetAppSidebarFixed(true);
		} else {
			context.handleSetAppSidebarFixed(false);
		}
	}
	
	const handleHeaderInverse = e => {
		if (e.target.checked) {
			context.handleSetAppHeaderInverse(true);
		} else {
			context.handleSetAppHeaderInverse(false);
		}
	}
	
	const handleSidebarGrid = e => {
		if (e.target.checked) {						
			context.handleSetAppSidebarGrid(true)
		} else {
			context.handleSetAppSidebarGrid(false);			
		}
	}
	
	const handleGradientEnabled = e => {
		if (e.target.checked) {
			context.handleSetAppGradientEnabled(true);			
		} else {
			context.handleSetAppGradientEnabled(false);
		}
	}
	
	const toggleExpand = e => {
		e.preventDefault();
		setState({expand: !state.expand});
	}
	
	const toggleTheme = (e, theme) => {
		e.preventDefault();
		context.handleSetAppTheme(theme);
		setState({theme: theme});
	}
		
	return (
		<AppSettings.Consumer>
			{({appDarkMode, appHeaderFixed, appHeaderInverse, appSidebarFixed, appSidebarGrid, appGradientEnabled}) => (
				<div className={'theme-panel ' + (state.expand ? 'active' : '')}>
					<a href="#0" onClick={ e => toggleExpand(e) } className="theme-collapse-btn"><i className="fa fa-cog"></i></a>
					<div className="theme-panel-content" data-scrollbar="true" data-height="100%">
						<h5>App Settings</h5>
			
						<div className="theme-list">
							{theme.map((theme, i) => (
								<div key={i} className={'theme-list-item '+ ((state.theme === theme) ? 'active' : '')}>
									<a href="#0" onClick={ e => toggleTheme(e, theme) } className={'theme-list-link bg-'+ theme}>&nbsp;</a>
								</div>
							))}
						</div>
			
						<div className="theme-panel-divider"></div>
			
						<div className="row mt-10px">
							<div className="col-8 control-label text-dark fw-bold">
								<div>Dark Mode <span className="badge bg-primary ms-1 py-2px position-relative" style={{top: '-1px'}}>NEW</span></div>
								<div className="lh-14">
									<small className="text-dark opacity-50">
										Adjust the appearance to reduce glare and give your eyes a break.
									</small>
								</div>
							</div>
							<div className="col-4 d-flex">
								<div className="form-check form-switch ms-auto mb-0">
									<input type="checkbox" className="form-check-input" name="app-theme-dark-mode" onChange={handleDarkMode} id="appThemeDarkMode" value="1" />
									<label className="form-check-label" htmlFor="appThemeDarkMode">&nbsp;</label>
								</div>
							</div>
						</div>
			
						<div className="theme-panel-divider"></div>
			
						<div className="row mt-10px align-items-center">
							<div className="col-8 control-label text-dark fw-bold">Header Fixed</div>
							<div className="col-4 d-flex">
								<div className="form-check form-switch ms-auto mb-0">
									<input type="checkbox" className="form-check-input" name="app-header-fixed" onChange={handleHeaderFixed} id="appHeaderFixed" value="1" checked={context.appHeaderFixed} />
									<label className="form-check-label" htmlFor="appHeaderFixed">&nbsp;</label>
								</div>
							</div>
						</div>
						<div className="row mt-10px align-items-center">
							<div className="col-8 control-label text-dark fw-bold">Header Inverse</div>
							<div className="col-4 d-flex">
								<div className="form-check form-switch ms-auto mb-0">
									<input type="checkbox" className="form-check-input" name="app-header-inverse" onChange={handleHeaderInverse} id="appHeaderInverse" checked={context.appHeaderInverse} />
									<label className="form-check-label" htmlFor="appHeaderInverse">&nbsp;</label>
								</div>
							</div>
						</div>
						<div className="row mt-10px align-items-center">
							<div className="col-8 control-label text-dark fw-bold">Sidebar Fixed</div>
							<div className="col-4 d-flex">
								<div className="form-check form-switch ms-auto mb-0">
									<input type="checkbox" className="form-check-input" name="app-sidebar-fixed" onChange={handleSidebarFixed} id="appSidebarFixed" checked={context.appSidebarFixed} />
									<label className="form-check-label" htmlFor="appSidebarFixed">&nbsp;</label>
								</div>
							</div>
						</div>
						<div className="row mt-10px align-items-center">
							<div className="col-8 control-label text-dark fw-bold">Sidebar Grid</div>
							<div className="col-4 d-flex">
								<div className="form-check form-switch ms-auto mb-0">
									<input type="checkbox" className="form-check-input" onChange={handleSidebarGrid} name="app-sidebar-grid" id="appSidebarGrid" checked={context.appSidebarGrid} />
									<label className="form-check-label" htmlFor="appSidebarGrid">&nbsp;</label>
								</div>
							</div>
						</div>
						<div className="row mt-10px align-items-center">
							<div className="col-md-8 control-label text-dark fw-bold">Gradient Enabled</div>
							<div className="col-md-4 d-flex">
								<div className="form-check form-switch ms-auto mb-0">
									<input type="checkbox" className="form-check-input" name="app-gradient-enabled" onChange={handleGradientEnabled} id="appGradientEnabled" checked={context.appGradientEnabled} />
									<label className="form-check-label" htmlFor="appGradientEnabled">&nbsp;</label>
								</div>
							</div>
						</div>
					</div>
				</div>
			)}
		</AppSettings.Consumer>
	);	
};

export default ThemePanel;
