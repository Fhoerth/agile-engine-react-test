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

  render() {
    const { text, punctuation } = this.props;

    return (
      <React.Fragment>
        <span onDoubleClick={this.handleDoubleClick}>{text}</span>{punctuation && (<span>{punctuation} </span>) || " "}
      </React.Fragment>
    )
  }
}

export default Word;
