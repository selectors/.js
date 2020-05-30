import {
  isOpenBracket,
  isEscape,
  isQuote,
  matchingBrackets,
} from './char';

/**
 * Determine where a bracket is closed.
 * @param {String} selector - The full selector.
 * @param {Number} position - Where to start traversing.
 * @returns {Number} - The closing bracket position.
 */
export const getBracketEndPosition = (selector = '', position = 0) => {
  if (position > selector.length) {
    // The position is out of range.
    return -1;
  }

  const startChar = selector[position];

  if (!isOpenBracket(startChar)) {
    // The selector start position does not contain a bracket character. This is not a bracket.
    return position;
  }

  const matchingBracket = matchingBrackets[startChar];
  let nested = 0;

  for (let index = position + 1; index < selector.length; index += 1) {
    const char = selector[index];

    if (isQuote(char)) {
      // A quote has started, skip to the end of the quote before continuing.
      const quoteEndPosition = getQuoteEndPosition(selector, index);

      if (quoteEndPosition === -1) {
        // The quote never ends; the bracket never gets closed.
        return -1;
      }

      index = quoteEndPosition;
      continue;
    }

    if (char === matchingBracket) {
      // The character matches the closing bracket.

      if (nested === 0) {
        // It's not nested, this is our end bracket.
        return index;
      }

      nested -= 1;
      continue;
    }

    if (char === startChar) {
      // We've found another open bracket, increase the nested count.
      nested += 1;
    }
  }

  return -1;
}

/**
 * Determine the end position of a quote.
 * @param {String} selector - The full selector.
 * @param {Number} position - Where to start traversing.
 * @returns {Number} - The closing quote position.
 */
export const getQuoteEndPosition = (selector = '', position = 0) => {
  if (position > selector.length) {
    // The position is out of range.
    return -1;
  }

  const startChar = selector[position];

  if (!isQuote(startChar)) {
    // The selector start position does not contain a quote character. This is not a quote.
    return position;
  }

  let isEscaped = false;

  for (let index = position + 1; index < selector.length; index += 1) {
    if (isEscaped) {
      isEscaped = false;
      continue;
    }

    if (selector[index] === startChar) {
      return index;
    }

    if (isEscape(selector[index])) {
      isEscaped = true;
    }
  }

  return -1;
}