import { isEscape, isQuote } from './char';

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