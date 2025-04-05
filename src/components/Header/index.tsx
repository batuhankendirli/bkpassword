import React from 'react';
import classNames from 'classnames/bind';
import Link from 'next/link';
import Logo from '../Logo';

import styles from './header.module.scss';

const cx = classNames.bind(styles);

const Header = () => (
  <header className={cx('header')}>
    <Link href="/">
      <Logo className={cx('header__logo')} />
    </Link>
  </header>
);

export default Header;
