import React from 'react';
import { Route ,withRouter, Redirect } from 'react-router-dom';
import routes from './../../config/app-route.jsx';
import { AppSettings } from './../../config/app-settings.js';
import { isAuthenticated } from "./../../utils/auth";


const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      isAuthenticated() ? (
        <Component {...props} />
      ) : (
        <Redirect to={{ pathname: "/", state: { from: props.location } }} />
      )
    }
  />
);

function setTitle(path, routeArray) {
	var appTitle;
	for (var i=0; i < routeArray.length; i++) {
		if (routeArray[i].path === path) {
			appTitle = 'Aluguel de Imoveis | ' + routeArray[i].title;
		}
	}
	document.title = (appTitle) ? appTitle : 'Aluguel de Imoveis';
}

class Content extends React.Component {
	componentDidMount() {
		setTitle(this.props.history.location.pathname, routes);
	}
	componentWillMount() {
    this.props.history.listen(() => {
			setTitle(this.props.history.location.pathname, routes);
    });
  }
  
	render() {
		return (
			<AppSettings.Consumer>
				{({appContentClass}) => (
					<div className={'app-content '+ appContentClass}>
						{routes.map((route, index) => (
							/*<Route
								key={index}
								path={route.path}
								exact={route.exact}
								component={route.component}
							/>*/
							<PrivateRoute 
								key={index}
								path={route.path}
								exact={route.exact}
								component={route.component}
							/>
						))}
					</div>
				)
			}
			</AppSettings.Consumer>
		)
	}
}

export default withRouter(Content);
