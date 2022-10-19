import { Route, Redirect } from 'react-router-dom';
import TokenService from 'services/token-service';

const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route
        {...rest}
        render={props =>
            TokenService.IsAuthenticated() ? (
                <Component {...props} />
            ) : (
                <Redirect to={{ pathname: "/login", state: { from: props.location } }} />
            )
        }
    />
);

export default PrivateRoute