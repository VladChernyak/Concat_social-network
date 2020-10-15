import React from 'react';
import { CatIcon } from '../icons';
import { useNavBarToggle } from '../../hooks';
import classNames from 'classnames';
import './Header.scss';

const Header = () => {
  const { toggleNavBar, isOpen, isHidden } = useNavBarToggle();

  return (
    <header className="header">
      {isHidden || (
        <button className={classNames('header__burger', { opened: isOpen })} onClick={toggleNavBar}>
          <div className="inner">
            <div className="line"></div>
            <div className="line"></div>
          </div>
        </button>
      )}
      <div className="logo">
        <span className="logo__icon">
          <CatIcon />
        </span>
        <div className="logo__name">
          con<span>cat</span>
        </div>
      </div>
    </header>
  );
};

export default Header;
