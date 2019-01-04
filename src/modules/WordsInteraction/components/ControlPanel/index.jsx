import React from 'react';

import styles from './styles.scss';

function ControlPanel() {
  return (
    <div className={styles['control-panel']}>
      <div className={styles['format-actions']}>
        <button className="format-action" type="button"><b>B</b></button>
        <button className="format-action" type="button"><i>I</i></button>
        <button className="format-action" type="button"><u>U</u></button>
      </div>
    </div>
  );
}

export default ControlPanel;
