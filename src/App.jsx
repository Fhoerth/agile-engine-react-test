import React from 'react';
import { hot } from 'react-hot-loader';

import WordsInteraction from './modules/WordsInteraction';
import './global.scss';

function Main() {
  return (
    <WordsInteraction />
  );
}

export default hot(module)(Main);
