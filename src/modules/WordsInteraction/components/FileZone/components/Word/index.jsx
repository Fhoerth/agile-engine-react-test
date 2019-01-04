import React from 'react';
import classnames from 'classnames';

import styles from './styles.scss';
import { onSelectionPropType, wordPropType } from '../../../../prop-types';

class Word extends React.Component {
  static propTypes = {
    onSelection: onSelectionPropType,
    word: wordPropType.isRequired,
  };

  static defaultProps = {
    onSelection: null,
  }

  getWordValueClassName() {
    const { word } = this.props;
    const format = word.text.format || {};

    return classnames({
      [styles.bold]: format.bold,
      [styles.underline]: format.underline,
      [styles.italic]: format.italic,
    });
  }

  handleDoubleClick = (e) => {
    const { onSelection, word } = this.props;

    if (onSelection) {
      onSelection(e, word);
    }
  };

  render() {
    const { word } = this.props;

    return (
      <React.Fragment>
        <span onDoubleClick={this.handleDoubleClick} className={this.getWordValueClassName()}>
          {word.text.value}
        </span>
        <span>
          {word.punctuation}
          {' '}
        </span>
      </React.Fragment>
    );
  }
}

export default Word;
