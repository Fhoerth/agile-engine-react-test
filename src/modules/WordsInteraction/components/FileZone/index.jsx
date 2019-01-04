import React from 'react';
import PropTypes from 'prop-types';

import styles from './styles.scss';
import Words from './components/Words';
import ToolTip from './components/ToolTip';

import { transformText, replaceWord } from '../../utils';
import { onSelectionPropType, tooltipPropType, wordPropType } from './prop-types';

class FileZone extends React.Component {
  static propTypes = {
    text: PropTypes.string.isRequired,
    onSelection: onSelectionPropType.isRequired,
    tooltip: tooltipPropType.isRequired,
    selectedWord: wordPropType,
  }

  static defaultProps = {
    selectedWord: null,
  };

  constructor(props) {
    super(props);
    const { text } = props;

    this.state = {
      words: transformText(text),
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

  handleSynonymClick = synonym => () => {
    const { words } = this.state;
    const { selectedWord } = this.props;

    this.setState({
      words: replaceWord(words, selectedWord, synonym),
    });
  }

  render() {
    const { words } = this.state;
    const { tooltip, selectedWord, onSelection } = this.props;

    return (
      <div className={styles['file-zone']}>
        <div className={styles.file}>
          <ToolTip
            show={tooltip.show}
            position={tooltip.position}
            word={selectedWord}
            onSynonymClick={this.handleSynonymClick}
          />
          <Words
            words={words}
            onSelection={onSelection}
          />
        </div>
      </div>
    );
  }
}

export default FileZone;
