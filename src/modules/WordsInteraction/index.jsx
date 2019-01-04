import React from 'react';
import textAPIClient from './api-client/text';

import Header from './components/Header';
import ControlPanel from './components/ControlPanel';
import FileZone from './components/FileZone';

import styles from './styles.scss';
import {
  replaceWord,
  transformText,
  toggleWordFormat,
  toggleSelectedWordFormat,
} from './utils';

class WordsInteraction extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      words: [],
      isLoading: true,
    };
  }

  componentDidMount() {
    textAPIClient.fetchMockText().then((text) => {
      this.setState({
        words: transformText(text),
        isLoading: false,
        selectedWord: null,
        tooltip: { show: false },
      });
    });
  }

  handleSelection = (e, word) => {
    const targetCoordinates = e.target.getBoundingClientRect();
    const targetParentCoordinates = e.target.parentNode.getBoundingClientRect();

    const x = targetCoordinates.left - targetParentCoordinates.left;
    const y = targetCoordinates.top - targetParentCoordinates.top;

    this.setState({
      tooltip: {
        show: true,
        position: { x, y },
      },
      selectedWord: word,
    });
  }

  handleDismiss = () => {
    const { tooltip } = this.state;

    if (tooltip.show) {
      this.setState({
        tooltip: { show: false },
      });
    }
  }

  handleSynonymClick = synonym => () => {
    const { words, selectedWord } = this.state;

    this.setState({
      words: replaceWord(words, selectedWord, synonym),
    });
  }

  handleOnFormatToggle = format => () => {
    if (format) {
      const { words, selectedWord } = this.state;

      this.setState({
        words: toggleWordFormat(words, selectedWord, format),
        selectedWord: toggleSelectedWordFormat(selectedWord, format),
      });
    }
  }

  render() {
    const {
      words,
      isLoading,
      selectedWord,
      tooltip,
    } = this.state;

    return (
      <div className={styles.app}>
        <Header />
        <div className={styles.main} onClick={this.handleDismiss}>
          <ControlPanel
            selectedWord={selectedWord}
            onFormatToggle={this.handleOnFormatToggle}
          />

          {!isLoading && (
            <FileZone
              words={words}
              tooltip={tooltip}
              selectedWord={selectedWord}
              onSelection={this.handleSelection}
              onSynonymClick={this.handleSynonymClick}
            />
          )}
        </div>
      </div>
    );
  }
}

export default WordsInteraction;
