import React from 'react';
import classnames from 'classnames';

import styles from './styles.scss';
import { wordPropType, onFormatTogglePropType } from '../../prop-types';
import { hasFormat } from '../../utils';

function ControlPanel({ selectedWord, onFormatToggle }) {
  return (
    <div className={styles['control-panel']}>
      <div className={styles['format-actions']}>
        <button
          type="button"
          className={classnames({ [styles.actionSelected]: hasFormat(selectedWord, 'bold') })}
          onClick={onFormatToggle('bold')}
        >
          <b>B</b>
        </button>
        <button
          type="button"
          className={classnames({ [styles.actionSelected]: hasFormat(selectedWord, 'italic') })}
          onClick={onFormatToggle('italic')}
        >
          <b>I</b>
        </button>
        <button
          type="button"
          className={classnames({ [styles.actionSelected]: hasFormat(selectedWord, 'underline') })}
          onClick={onFormatToggle('underline')}
        >
          <u>U</u>
        </button>
      </div>
    </div>
  );
}

ControlPanel.propTypes = {
  selectedWord: wordPropType,
  onFormatToggle: onFormatTogglePropType.isRequired,
};

ControlPanel.defaultProps = {
  selectedWord: null,
};

export default ControlPanel;
