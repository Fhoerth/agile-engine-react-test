import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import styles from './styles.scss';

function ToolTip({ show, position }) {
  return (
    <div
      className={classnames(styles.tooltip, show && styles.show)}
      style={{ top: position.y, left: position.x }}
    >
      <button type="button" className={styles.close}>&times;</button>
      <h3 className={styles.title}>Top synonysms for word</h3>
    </div>
  );
}

ToolTip.propTypes = {
  show: PropTypes.bool,
  position: PropTypes.shape({
    x: PropTypes.number,
    y: PropTypes.number,
  }),
};

ToolTip.defaultProps = {
  show: false,
  position: {
    x: 0,
    y: 0,
  },
};

export default ToolTip;
