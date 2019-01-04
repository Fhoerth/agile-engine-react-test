import React from 'react';
import PropTypes from 'prop-types';

import styles from './styles.scss';

function FileZone({ text }) {
  return (
    <div className={styles['file-zone']}>
      <div className={styles.file}>{text}</div>
    </div>
  );
}

FileZone.propTypes = {
  text: PropTypes.string,
};

FileZone.defaultProps = {
  text: null,
};

export default FileZone;
