import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useUser } from "../../contexts/UserContext";

const SignedInRoute = ({ component: Component, ...rest }) => {
  const { currentUser } = useUser();

  return (
    <Route
      {...rest}
      render={(props) => {
        return currentUser ? <Redirect to="/" /> : <Component {...props} />;
      }}
    ></Route>
  );
};

export default SignedInRoute;
