import React from 'react';
import { AuthForm, Loader } from '../../components';
import { Route, Redirect } from 'react-router-dom';
import { useAuthPage } from '../../hooks';
import './AuthPage.scss';

const AuthPage = () => {
  const { isLoggedIn, autoLoginDone } = useAuthPage();

  return (
    <div className="auth">
      {isLoggedIn && <Redirect to="/" />}
      {autoLoginDone ? (
        <>
          <Route exact path="/auth" render={() => <AuthForm title="Вход" />} />
          <Route path="/auth/reg" render={() => <AuthForm isReg={true} />} />
        </>
      ) : (
        <Loader />
      )}
    </div>
  );
};

export default AuthPage;
