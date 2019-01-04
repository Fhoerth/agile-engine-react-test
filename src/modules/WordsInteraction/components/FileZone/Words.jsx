import React from 'react';
import PropTypes from 'prop-types';
import Word from './Word';

function Words({ words }) {
  return words.map(item => <Word key={item.key} text={item.text} punctuation={item.punctuation} />);
}

Words.propTypes = {
  words: PropTypes.arrayOf(PropTypes.shape({
    key: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    punctuation: PropTypes.string,
  })),
};

export default Words;
