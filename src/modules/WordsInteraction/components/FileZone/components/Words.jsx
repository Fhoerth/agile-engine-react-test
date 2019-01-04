import React from 'react';
import PropTypes from 'prop-types';

import Word from './Word';
import { onSelectionPropType, wordPropType } from '../../../prop-types';

function Words({ words, onSelection }) {
  return words.map(word => (
    <Word
      key={word.key}
      word={word}
      onSelection={onSelection}
    />
  ));
}

Words.propTypes = {
  words: PropTypes.arrayOf(wordPropType),
  onSelection: onSelectionPropType,
};

export default Words;
