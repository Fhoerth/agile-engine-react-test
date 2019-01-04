import PropTypes from 'prop-types';

export const onSelectionPropType = PropTypes.func;
export const wordPropType = PropTypes.shape({
  key: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  punctuation: PropTypes.string,
});
