import React from 'react';
import { Route } from 'react-router-dom';
import { AppSettings } from './../../config/app-settings.js';
import SidebarNavList from './sidebar-nav-list.jsx';
import menus from './menu.jsx';

class SidebarNav extends React.Component {
	static contextType = AppSettings;
	
	constructor(props) {
		super(props);
		this.state = {
			active: -1,
			clicked: -1,
			menus: menus
		};
		
		this.handleSidebarSearch = this.handleSidebarSearch.bind(this);
	}

	handleExpand(e, i, match) {
		e.preventDefault();

		if (this.state.clicked === -1 && match) {
			this.setState(state => ({
				active: -1,
				clicked: 1
			}));
		} else {
			this.setState(state => ({
				active: (this.state.active === i ? -1 : i),
				clicked: 1
			}));
		}
	}
	
	handleSidebarSearch(e) {
		let searchValue = e.target.value;
				searchValue = searchValue.toLowerCase();
				
		this.setState(state => {
			let newMenus = [];
			if (searchValue !== '') {
				newMenus = menus.filter(item => {
					let title = item.title;
							title = title.toLowerCase();
					if (title.search(searchValue) > -1) {
						item.search = true;
						return true;
					} else {
						if (item.children) {
							for (var i = 0; i < item.children.length; i++) {
								let title2 = item.children[i]['title'];
										title2 = title2.toLowerCase();
										
								if (title2.search(searchValue) > -1) {
									item.search = true;
									return true;
								}
							}
						}
						return false;
					}
				});
			} else {
				newMenus = menus.filter(item => {
					item.search = false;
					return true;
				});
			}
			return {
				menus: newMenus
			};
		});
	}
  
	render() {
		return (
			<div className="menu">
				{this.context.appSidebarSearch && (
					<div className="menu-search mb-n3">
						<input type="text" class="form-control" placeholder="Sidebar menu filter..." onKeyUp={this.handleSidebarSearch} />
					</div>
				)}
				<div className="menu-header">Navigação</div>
				{this.state.menus.map((menu, i) => (
					<Route path={menu.path} exact={menu.exact} key={i} children={({ match }) => (
						<SidebarNavList
							data={menu} 
							key={i} 
							expand={(e) => this.handleExpand(e, i, match)}
							active={i === this.state.active} 
							clicked={this.state.clicked}
						/>
					)} />
				))}
			</div>
		);
	}
}

export default SidebarNav;