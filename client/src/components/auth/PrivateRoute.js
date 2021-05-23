import React from 'react'
import { Route, Redirect } from "react-router-dom";
import { isAutheticated } from "../../helper";

const PrivateRoute = ({ component: Component, ...rest }) => {
    return (
        <Route
        {...rest}
        render={props =>
          isAutheticated() ? (
            <Component {...props} />
          ) : (
            <Redirect
              to={{
                pathname: "/",
              }}
            />
          )
        }
      />
    )
}

export default PrivateRoute
