import React from "react";
import { withRouter } from "react-router-dom";
import { isAuthenticated } from "../utils/auth";

class Logout extends React.Component {

	constructor(props) {
		super(props);
		try {
			if (isAuthenticated) {
				this.props.history.push("/login");
			} else {
				this.props.history.push("/app");
			}

		} catch (error) {
			console.log(error)
		}

	}
	render() {
		return (
			<div>
			</div>
		)
	}
}

//export default Login;
export default withRouter(Logout);