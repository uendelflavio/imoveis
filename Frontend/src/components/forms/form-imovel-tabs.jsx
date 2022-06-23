import React,{ useState } from 'react'
import {  TabContent, TabPane, Nav, NavItem, NavLink,Alert } from 'reactstrap';
import classnames from 'classnames';

 const FormImovelTabs = () => {
    const [activeTab, setTab] = useState(1);
     
    const toggleTab = (tab) => {
		if (activeTab !== tab) {
			setTab(tab);
		}
	}

    return (     
    <Nav tabs>
    <NavItem>
        <NavLink  className={classnames(activeTab === '1' )} onClick={() => { toggleTab('1'); }}>      
            <span className="d-sm-block d-none">Endereço do Imovel</span>
        </NavLink>
    </NavItem>
    <NavItem>
        <NavLink className={classnames( activeTab === '2' )} onClick={() => { toggleTab('2'); }}>      
            <span className="d-sm-block d-none">Detalhes do Imóvel</span>
        </NavLink>
    </NavItem>
  <TabContent className="tab-content p-3 bg-white" activeTab={activeTab}>
    <TabPane tabId="1">                 
        <Alert color="primary" className="mb-0 rounded-0">
            <i className="fa fa-check fa-2x float-start me-3"></i>
            <p className="mb-0">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque ac posuere lacus, quis suscipit sem. Nulla sagittis aliquam erat non convallis.</p>
        </Alert>                     
    </TabPane>
    <TabPane tabId="2">                 
        <Alert color="success" className="mb-0 rounded-0">
            <i className="fa fa-check fa-2x float-start me-3"></i>
            <p className="mb-0">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque ac posuere lacus, quis suscipit sem. Nulla sagittis aliquam erat non convallis.</p>
        </Alert>                      
    </TabPane>
  </TabContent>
    </Nav>             
  )
}

export default FormImovelTabs
