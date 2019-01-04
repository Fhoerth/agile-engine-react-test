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
    if (word === selectedWord) {
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
