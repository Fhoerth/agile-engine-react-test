import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import dataMuseAPIClient from '../../../../api-client/dataMuse';
import styles from './styles.scss';
import { wordPropType } from '../../prop-types';

class ToolTip extends React.Component {
  static propTypes = {
    show: PropTypes.bool,
    position: PropTypes.shape({
      x: PropTypes.number,
      y: PropTypes.number,
    }),
    word: wordPropType,
    onSynonymClick: PropTypes.func.isRequired,
  };

  static defaultProps = {
    show: false,
    position: {
      x: 0,
      y: 0,
    },
    word: {},
  };

  constructor(props) {
    super(props);

    this.state = {
      fetching: false,
      isFetchSuccess: false,
      isFetchRejected: false,
      synonyms: [],
    };
  }

  componentDidUpdate(prevProps) {
    const { props } = this;
    const { word } = props;
    const isBeingOpened = props.show && !prevProps.show;

    if (word && isBeingOpened) {
      this.fetchSynonyms();
    }
  }

  fetchSynonyms() {
    const { word } = this.props;

    if (word) {
      this.setState({
        fetching: true,
      });

      dataMuseAPIClient
        .fetchSynonyms(word.text.value)
        .then((synonyms) => {
          this.setState({
            synonyms,
            fetching: false,
            isFetchSuccess: true,
          });
        })
        .catch(() => {
          this.setState({
            synonyms: [],
            fetching: false,
            isFetchRejected: true,
          });
        });
    }
  }

  renderTitle() {
    const { word } = this.props;

    return (
      <h3 className={styles.title}>
        Top synonyms for word {'"'}{word.text.value}{'"'}
      </h3>
    );
  }

  renderSynonyms() {
    const {
      fetching,
      isFetchSuccess,
      isFetchRejected,
      synonyms,
    } = this.state;
    const { word, onSynonymClick } = this.props;

    if (fetching) {
      return (<span className={styles.fetchingSynonyms}>Loading..</span>);
    }

    if (isFetchSuccess && synonyms.length) {
      return (
        <ul className={styles.synonyms}>
          {synonyms.map(synonym => (
            <li key={synonym.word}>
              <span onClick={onSynonymClick(synonym)}>{synonym.word}</span>
            </li>
          ))}
        </ul>
      );
    }

    if (isFetchSuccess && !synonyms.length) {
      return (
        <span className={styles.noResults}>Sorry. No results synonyms found for {'"'}{word.text.value}{'"'}</span>
      );
    }

    if (isFetchRejected) {
      return (
        <span className={styles.synonymsFetchRejection}>
          Failed to fetch synonyms.
        </span>
      );
    }

    return null;
  }

  render() {
    const { show, position, word } = this.props;

    return (
      <div
        className={classnames(styles.tooltip, show && styles.show)}
        style={{ top: position.y, left: position.x }}
      >
        <button type="button" className={styles.close}>&times;</button>
        {word && this.renderTitle()}
        {word && this.renderSynonyms()}
      </div>
    );
  }
}

export default ToolTip;
