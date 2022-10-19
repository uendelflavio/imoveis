import React from 'react';
import TopMenuNav from './top-menu-nav.jsx';
import { AppSettings } from './../../config/app-settings.js';

const TopMenu = () => {	
	const  context = React.useContext(AppSettings);
	return (
		<AppSettings.Consumer>
			{({appTopMenuMobileToggled}) => (
				<div id="top-menu" className={'app-top-menu ' + (context.appTopMenuMobileToggled ? 'd-block ': '')}>
					<TopMenuNav />
				</div>
			)}
		</AppSettings.Consumer>
	)
}

export default TopMenu;