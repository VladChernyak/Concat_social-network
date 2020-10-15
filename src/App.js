import React from 'react';
import { Header } from './components';
import { AuthPage, AppPage } from './containers';
import { Route, Switch } from 'react-router-dom';
import { AUTH, HOME } from './constants/pathnames';
import './App.scss';

const App = () => (
  <div className="wrapper">
    <Header />
    <Switch>
      <Route path={AUTH} render={() => <AuthPage />} />
      <Route path={HOME} render={() => <AppPage />} />
    </Switch>
  </div>
);

export default App;
