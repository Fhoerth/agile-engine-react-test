import PropTypes from 'prop-types';

export const onFormatTogglePropType = PropTypes.func;
export const onSelectionPropType = PropTypes.func;
export const onSynonymClickPropType = PropTypes.func;
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
export const tooltipPropType = PropTypes.shape({
  show: PropTypes.bool.isRequired,
  position: PropTypes.shape({
    x: PropTypes.number,
    y: PropTypes.number,
  }),
});
