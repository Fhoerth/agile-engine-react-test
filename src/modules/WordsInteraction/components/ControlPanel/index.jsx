import React from 'react';
import classnames from 'classnames';

import styles from './styles.scss';
import { wordPropType } from '../../prop-types';
import { hasFormat } from '../../utils';

function ControlPanel({ selectedWord }) {
  return (
    <div className={styles['control-panel']}>
      <div className={styles['format-actions']}>
        <button
          type="button"
          className={classnames({ [styles.actionSelected]: hasFormat(selectedWord, 'bold') })}
        >
          <b>B</b>
        </button>
        <button
          type="button"
          className={classnames({ [styles.actionSelected]: hasFormat(selectedWord, 'italic') })}
        >
          <b>I</b>
        </button>
        <button
          type="button"
          className={classnames({ [styles.actionSelected]: hasFormat(selectedWord, 'underline') })}
        >
          <u>U</u>
        </button>
      </div>
    </div>
  );
}

ControlPanel.propTypes = {
  selectedWord: wordPropType,
};

ControlPanel.defaultProps = {
  selectedWord: null,
};

export default ControlPanel;
