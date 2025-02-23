import React from 'react';
import classNames from 'classnames/bind';

import styles from '@/styles/pages/home-page.module.scss';

const cx = classNames.bind(styles);

const HomePage = () => {
  return <main className={cx('home')}>BKPassword</main>;
};

export default HomePage;
