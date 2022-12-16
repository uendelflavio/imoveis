import React from "react";
import { withRouter } from "react-router-dom";
import routes from "config/app-route.jsx";
import { AppSettings } from "config/app-settings.js";
import PrivateRoute from "config/private-route";

const Content = props => {
  const context = React.useContext(AppSettings);

  const setTitle = (path, routeArray) => {
    var appTitle;
    for (var i = 0; i < routeArray.length; i++) {
      if (routeArray[i].path === path) {
        appTitle = "Aluguel de Imoveis | " + routeArray[i].title;
      }
    }
    document.title = appTitle ? appTitle : "Aluguel de Imoveis";
  };

  React.useEffect(() => {
    setTitle(props.history.location.pathname, routes);

    return () => {
      props.history.listen(() => {
        setTitle(props.history.location.pathname, routes);
      });
    };
  });

  return (
    <AppSettings.Consumer>
      {({ appContentClass }) =>
        <div className={"app-content " + context.appContentClass}>
          {routes.map((route, index) =>
            <PrivateRoute
              key={index}
              path={route.path}
              exact={route.exact}
              component={route.component}
            />
          )}
        </div>}
    </AppSettings.Consumer>
  );
};

export default withRouter(Content);
