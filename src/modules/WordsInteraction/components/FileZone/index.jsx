import React from 'react';
import PropTypes from 'prop-types';

import transformText from './utils';
import styles from './styles.scss';

import Words from './components/Words';

class FileZone extends React.Component {
  static propTypes = {
    // eslint-disable-next-line react/no-unused-prop-types
    text: PropTypes.string.isRequired,
  }

  constructor(props) {
    super(props);

    this.state = {
      words: [],
    };
  }

  static getDerivedStateFromProps(props) {
    const { text } = props;

    return {
      words: transformText(text),
    };
  }

  handleSelection = () => {

  }

  render() {
    const { words } = this.state;

    return (
      <div className={styles['file-zone']} onDoubleClick={this.handleSelection}>
        <div className={styles.file}>
          <Words words={words} />
        </div>
      </div>
    );
  }
}

export default FileZone;
