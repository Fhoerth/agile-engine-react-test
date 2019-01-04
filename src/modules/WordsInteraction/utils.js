export function transformText(text) {
  return text.split(' ')
    .map((wordWithPunctuation, idx) => {
      const punctuationRE = /(,|\.|:|\(|\)|!|\?|\s)*$/g;

      let punctuation = null;
      const textWithoutPunctuation = wordWithPunctuation.replace(punctuationRE, '');

      const punctuationMatch = wordWithPunctuation.match(punctuationRE);

      if (punctuationMatch) {
        ([punctuation] = punctuationMatch);
      }

      return {
        text: {
          value: textWithoutPunctuation,
        },
        key: textWithoutPunctuation.toLowerCase().concat(`-${idx}`),
        punctuation,
      };
    });
}

export function replaceWord(words, selectedWord, synonym) {
  const mapper = (word) => {
    if (word.key === selectedWord.key) {
      return {
        ...word,
        text: {
          ...word.text,
          value: synonym.word,
        },
      };
    }

    return word;
  };

  return words.map(mapper);
}

export function toggleSelectedWordFormat(selectedWord, format) {
  return {
    ...selectedWord,
    text: {
      ...selectedWord.text,
      format: {
        ...selectedWord.text.format,
        [format]: !(selectedWord.text.format && selectedWord.text.format[format]),
      },
    },
  };
}

export function toggleWordFormat(words, selectedWord, format) {
  const mapper = (word) => {
    if (word.key === selectedWord.key) {
      return toggleSelectedWordFormat(selectedWord, format);
    }

    return word;
  };

  return words.map(mapper);
}

export function hasFormat(word, format) {
  return word && word.text && word.text.format && word.text.format[format];
}
