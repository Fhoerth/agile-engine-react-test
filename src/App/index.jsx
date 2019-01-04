import React from 'react';
import { hot } from 'react-hot-loader';

import styles from './styles.scss';

function Main() {
  return (
    <h1 className={styles.title}>Hello World!!! :D :D :D :D</h1>
  );
}

export default hot(module)(Main);
