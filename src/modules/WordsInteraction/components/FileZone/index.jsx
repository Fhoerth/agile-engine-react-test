import React from 'react';
import PropTypes from 'prop-types';

import { transformText, replaceWord } from './utils';
import styles from './styles.scss';

import Words from './components/Words';
import ToolTip from './components/ToolTip';

class FileZone extends React.Component {
  static propTypes = {
    text: PropTypes.string.isRequired,
  }

  constructor(props) {
    super(props);
    const { text } = props;

    this.state = {
      words: transformText(text),
      selectedWord: null,
      modal: {
        show: false,
        position: { x: 0, y: 0 },
      },
    };
  }

  componentDidUpdate(prevProps) {
    const { text } = this.props;
    const previousText = prevProps.text;

    if (text !== previousText) {
      // It's safe to setState here, because of the text prop comparisson.
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({
        words: transformText(text),
      });
    }
  }

  handleSelection = (e, word) => {
    const targetCoordinates = e.target.getBoundingClientRect();
    const targetParentCoordinates = e.target.parentNode.getBoundingClientRect();

    const x = targetCoordinates.left - targetParentCoordinates.left;
    const y = targetCoordinates.top - targetParentCoordinates.top;

    this.setState({
      modal: {
        show: true,
        position: { x, y },
      },
      selectedWord: word,
    });
  }

  handleDismiss = () => {
    const { modal } = this.state;

    if (modal.show) {
      this.setState({
        modal: { show: false },
      });
    }
  }

  handleSynonymClick = synonym => () => {
    const { words, selectedWord } = this.state;

    this.setState({
      modal: {
        show: false,
      },
      words: replaceWord(words, selectedWord, synonym),
    });
  }

  render() {
    const { words, modal, selectedWord } = this.state;

    return (
      <div className={styles['file-zone']}>
        <div className={styles.file} onClick={this.handleDismiss}>
          <ToolTip
            show={modal.show}
            position={modal.position}
            word={selectedWord}
            onSynonymClick={this.handleSynonymClick}
          />
          <Words
            words={words}
            onSelection={this.handleSelection}
          />
        </div>
      </div>
    );
  }
}

export default FileZone;
