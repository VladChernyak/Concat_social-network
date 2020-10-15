import React from 'react';
import { NavBar, Main } from '../../components';
import { UserProfile, OtherProfile, Social, Chat } from '..';
import { Route, Switch, Redirect } from 'react-router-dom';
import { useAppPage } from '../../hooks';
import './AppPage.scss';

const AppPage = () => {
  const { isLoggedIn } = useAppPage();

  return (
    <div className="page">
      <NavBar />
      <Main>
        {isLoggedIn ? (
          <Switch>
            <Route path="/" exact component={UserProfile} />
            <Route path="/id:id" component={OtherProfile} />
            <Route path="/chat/:id" component={Chat} />
            <Route exact path="/chat" component={Chat} />
            <Route path="/social" component={Social} />
          </Switch>
        ) : (
          <Redirect to={'/auth'} />
        )}
      </Main>
    </div>
  );
};

export default AppPage;
