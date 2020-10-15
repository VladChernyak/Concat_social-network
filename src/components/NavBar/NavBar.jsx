import React from 'react';
import { Indicator } from '..';
import { HomeIcon, EnvelopeIcon, UsersIcon } from '../icons';
import { NavLink } from 'react-router-dom';
import { useNavBar } from '../../hooks';
import { CHAT, HOME, SOCIAL } from '../../constants/pathnames';
import classNames from 'classnames';
import './NavBar.scss';

const NavBar = () => {
  const { newMessages, menuOpen, logOut } = useNavBar();

  return (
    <aside className={classNames('nav-bar', { opened: menuOpen })}>
      <nav className="nav">
        <div className="nav__content">
          <ul>
            <li className="nav__link">
              <NavLink to={HOME} exact className="nav__link">
                <div className="icon">
                  <HomeIcon />
                </div>
                <span className="nav__link-name">Профиль</span>
              </NavLink>
            </li>
            <li className="nav__link">
              <NavLink to={CHAT} className="nav__link">
                <div className="icon">
                  {newMessages ? (
                    <Indicator className="nav__link-indicator" value={newMessages} />
                  ) : null}
                  <EnvelopeIcon />
                </div>
                <span className="nav__link-name">Сообщения</span>
              </NavLink>
            </li>
            <li className="nav__link">
              <NavLink to={SOCIAL} className="nav__link">
                <div className="icon">
                  <UsersIcon />
                </div>
                <span className="nav__link-name">Люди</span>
              </NavLink>
            </li>
          </ul>
        </div>
        <button className="log-out" onClick={logOut}>
          Выйти
        </button>
      </nav>
    </aside>
  );
};

export default NavBar;
