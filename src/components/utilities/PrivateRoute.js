import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useUser } from "../../contexts/UserContext";

const PrivateRoute = ({ component: Component, ...rest }) => {
	const { currentUser } = useUser();

	return (
		<Route
			{...rest}
	render={(props) => {
		return currentUser ? (
			<Component {...props} />
		) : (
			<Redirect to="/sign-in"/>
		);
	}}
	/>
	);
};

export default PrivateRoute;
