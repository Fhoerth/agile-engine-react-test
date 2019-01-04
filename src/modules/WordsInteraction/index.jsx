import React from 'react';
import textAPIClient from './api-client/text';

import Header from './components/Header';
import ControlPanel from './components/ControlPanel';
import FileZone from './components/FileZone';

import styles from './styles.scss';

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
      });
    });
  }

  render() {
    const { text, isLoading } = this.state;

    return (
      <div className={styles.app}>
        <Header />
        <main className={styles.main}>
          <ControlPanel />

          {isLoading && (
            <FileZone text="Loading..." />
          )}

          {!isLoading && (
            <FileZone text={text} />
          )}
        </main>
      </div>
    );
  }
}

export default WordsInteraction;
