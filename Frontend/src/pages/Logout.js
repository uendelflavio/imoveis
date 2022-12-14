import React from "react";
import { withRouter } from "react-router-dom";
import TokenService from "services/token-service";

class Logout extends React.Component {
  constructor(props) {
    super(props);
    try {
      if (TokenService.isAuthenticated) {
        this.props.history.push("/login");
      } else {
        this.props.history.push("/app");
      }
    } catch (error) {
      console.log(error);
    }
  }
  render() {
    return (
      <div>
      </div>
    );
  }
}

//export default Login;
export default withRouter(Logout);
