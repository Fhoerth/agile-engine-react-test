import PropTypes from 'prop-types';

export const onSelectionPropType = PropTypes.func;
export const wordPropType = PropTypes.shape({
  key: PropTypes.string.isRequired,
  text: PropTypes.shape({
    value: PropTypes.string.isRequired,
    format: PropTypes.shape({
      bold: PropTypes.bool,
      underline: PropTypes.bool,
      italic: PropTypes.bool,
    }),
  }),
  punctuation: PropTypes.string,
});
