import React from 'react';
import PropTypes from 'prop-types';

import transformText from './utils';
import styles from './styles.scss';

import Words from './components/Words';
import ToolTip from './components/ToolTip';

class FileZone extends React.Component {
  static propTypes = {
    // eslint-disable-next-line react/no-unused-prop-types
    text: PropTypes.string.isRequired,
  }

  constructor(props) {
    super(props);

    this.state = {
      words: [],
      selectedWord: null,
      modal: {
        show: false,
        position: {
          x: 0,
          y: 0,
        },
      },
    };
  }

  static getDerivedStateFromProps(props, state) {
    const { text } = props;

    return {
      ...state,
      words: transformText(text),
    };
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
        modal: {
          show: false,
          position: { x: 0, y: 0 },
        },
      });
    }
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
