import React from 'react';
import { onSelectionPropType, wordPropType } from '../prop-types';

class Word extends React.Component {
  static propTypes = {
    onSelection: onSelectionPropType,
    word: wordPropType.isRequired,
  };

  static defaultProps = {
    onSelection: null,
  }

  handleDoubleClick = (e) => {
    const { onSelection, word } = this.props;

    if (onSelection) {
      onSelection(e, word);
    }
  };

  renderPunctuation() {
    const { word } = this.props;

    return word.punctuation
      ? (
        <span>
          {word.punctuation}
          {' '}
        </span>
      ) : ' ';
  }

  render() {
    const { word } = this.props;

    return (
      <React.Fragment>
        <span onDoubleClick={this.handleDoubleClick}>
          {word.text}
        </span>
        {this.renderPunctuation()}
      </React.Fragment>
    );
  }
}

export default Word;
