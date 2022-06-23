import React from 'react';
import { Link } from 'react-router-dom';
import { TabContent, TabPane, Nav, NavItem, NavLink } from 'reactstrap';
import { Panel, PanelHeader, PanelBody } from '../components/panel/panel.jsx';
import classnames from 'classnames';
class Locadores extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			activeTab: '1',
		};

	}
	toggleTab(tab) {
		if (this.state.activeTab !== tab) {
			this.setState({
				activeTab: tab
			});
		}
	}
	render() {
		return (
			<div>
				<ol className="breadcrumb float-xl-end">
					<li className="breadcrumb-item"><Link to="/">Locadores</Link></li>
					<li className="breadcrumb-item active">Cadastros</li>
				</ol>
				<h1 className="page-header">Gerência de Locadores <small>Modulo de Cadastros...</small></h1>
				<Panel theme="default" className="panel-with-tabs">
					<PanelHeader noButton={true}>
						Panel with Tabs
					</PanelHeader>
					<PanelBody>
						<div className="row">
							<div className="col-xl-6">
								<Nav tabs className="nav-tabs-inverse nav-justified">
									<NavItem>
										<NavLink className={classnames({ active: this.state.activeTab === '1' })} onClick={() => { this.toggle('1') }}>
											<i className="fa fa-camera fa-lg me-5px"></i> <span className="d-none d-md-inline">Latest Post</span>
										</NavLink>
									</NavItem>
									<NavItem>
										<NavLink className={classnames({ active: this.state.activeTab === '2' })} onClick={() => { this.toggle('2') }}>
											<i className="fa fa-archive fa-lg me-5px"></i> <span className="d-none d-md-inline">Purchase</span>
										</NavLink>
									</NavItem>
								</Nav>
								<TabContent className="panel rounded-0 rounded-bottom mb-20px p-3" activeTab={this.state.activeTab}>
									<TabPane tabId="1">
										<h3 className="mt-10px"><i className="fa fa-cog"></i> Lorem ipsum dolor sit amet</h3>
										<p className="m-b-0">home</p>
									</TabPane>
									<TabPane tabId="2">
										<h3 className="mt-10px"><i className="fa fa-cog"></i> Lorem ipsum dolor sit amet</h3>
										<p className="m-b-0">profile</p>
									</TabPane>
								</TabContent>
							</div>
						</div>
					</PanelBody>
				</Panel>
			</div>
		)
	}


}

export default Locadores;