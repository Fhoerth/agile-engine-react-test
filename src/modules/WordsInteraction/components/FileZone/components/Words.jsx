import React from 'react';
import PropTypes from 'prop-types';

import Word from './Word';
import { onSelectionPropType } from '../prop-types';

function Words({ words, onSelection }) {
  return words.map(item => (
    <Word
      key={item.key}
      text={item.text}
      punctuation={item.punctuation}
      onSelection={onSelection}
    />
  ));
}

Words.propTypes = {
  words: PropTypes.arrayOf(PropTypes.shape({
    key: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    punctuation: PropTypes.string,
  })),
  onSelection: onSelectionPropType,
};

export default Words;
