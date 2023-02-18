import React from 'react'
import { Redirect,Route } from 'react-router';
import { useSelector } from 'react-redux';

export default function AdminRouters({ component: Component, ...rest }) {
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
    return (
        <Route {...rest} render={(props) => userInfo && userInfo.isAdmin ? (
          <Component {...props}></Component>
        ) : (
          <Redirect to="/signin" />
        )
      }
    ></Route>
    )
}