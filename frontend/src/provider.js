import React, { useContext } from 'react';
import { Route, Navigate } from 'react-router-dom';
import { GlobalContext } from './context/context';

const PrivateRoute = ({ path, element }) => {
  const { state } = useContext(GlobalContext);

  return state.isLogin === true ? (
    <Route {...rest} element={element} />
  ) : (
    <Navigate to="/" replace />
  );
};

export default PrivateRoute;

