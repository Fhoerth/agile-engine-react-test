import React from 'react';
import PropTypes from 'prop-types';

class Word extends React.Component {
  static propTypes = {
    text: PropTypes.string.isRequired,
    punctuation: PropTypes.string,
  };

  static defaultProps = {
    punctuation: null,
  };

  handleDoubleClick = () => {
    console.log('Selected');
  };

  renderPunctuation() {
    const { punctuation } = this.props;

    return punctuation
      ? (
        <span>
          {punctuation}
        </span>
      ) : ' ';
  }

  render() {
    const { text } = this.props;

    return (
      <React.Fragment>
        <span onDoubleClick={this.handleDoubleClick}>
          {text}
        </span>
        {this.renderPunctuation()}
      </React.Fragment>
    );
  }
}

export default Word;
