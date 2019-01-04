import React from 'react';
import PropTypes from 'prop-types';

import styles from './styles.scss';
import Words from './components/Words';
import ToolTip from './components/ToolTip';

import {
  onSelectionPropType,
  onSynonymClickPropType,
  tooltipPropType,
  wordPropType,
} from '../../prop-types';

function FileZone({
  tooltip,
  selectedWord,
  onSelection,
  onSynonymClick,
  words,
}) {
  return (
    <div className={styles['file-zone']}>
      <div className={styles.file}>
        <ToolTip
          show={tooltip.show}
          position={tooltip.position}
          word={selectedWord}
          onSynonymClick={onSynonymClick}
        />
        <Words
          words={words}
          onSelection={onSelection}
        />
      </div>
    </div>
  );
}

FileZone.propTypes = {
  words: PropTypes.arrayOf(wordPropType).isRequired,
  onSelection: onSelectionPropType.isRequired,
  onSynonymClick: onSynonymClickPropType.isRequired,
  tooltip: tooltipPropType.isRequired,
  selectedWord: wordPropType,
};

FileZone.defaultProps = {
  selectedWord: null,
};

export default FileZone;
