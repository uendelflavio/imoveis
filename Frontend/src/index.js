import React from 'react';
import ReactDOM from 'react-dom';


import { Provider } from 'react-redux'
import store from './store';

import App from './app.jsx';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { isAuthenticated } from "./utils/auth";
import Login from './pages/Login';
import Logout from './pages/Logout';

// css
import 'bootstrap/dist/css/bootstrap.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'react-calendar/dist/Calendar.css';
import 'react-quill/dist/quill.snow.css';
import 'simple-line-icons/css/simple-line-icons.css';
import 'flag-icon-css/css/flag-icons.min.css';
import 'react-perfect-scrollbar/dist/css/styles.css';
import './index.css';
import './scss/react.scss';
import 'bootstrap-social/bootstrap-social.css';
import 'bootstrap-daterangepicker/daterangepicker.css';


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

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <Switch>
        <Route exact path="/login" component={Login} />
        <Route exact path="/" component={Logout} />
        <PrivateRoute path="/app" component={App} />
        <Route path="*" component={() => <h1>Page not found</h1>} />
      </Switch>
    </BrowserRouter>,
  </Provider>,
  document.getElementById('root')
);
