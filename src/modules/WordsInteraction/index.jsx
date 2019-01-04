import React from 'react';
import textAPIClient from './api-client/text';

import Header from './components/Header';
import ControlPanel from './components/ControlPanel';
import FileZone from './components/FileZone';

import styles from './styles.scss';
import { formatWord } from './utils';

class WordsInteraction extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      text: null,
      isLoading: true,
    };
  }

  componentDidMount() {
    textAPIClient.fetchMockText().then((text) => {
      this.setState({
        text,
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

  handleFormat = () => {

  }

  render() {
    const {
      text,
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
            onFormat={this.handleFormat}
          />

          {!isLoading && (
            <FileZone
              text={text}
              tooltip={tooltip}
              selectedWord={selectedWord}
              onSelection={this.handleSelection}
            />
          )}
        </div>
      </div>
    );
  }
}

export default WordsInteraction;
