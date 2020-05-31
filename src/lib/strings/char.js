/**
 * Bracket matches.
 */
export const matchingBrackets = {
  '(': ')',
  '[': ']',
}

/**
 * Is this an escape character (`\`)?
 * @param {String} char - The character to check.
 * @returns {Boolean}
 */
export const isEscape = (char = '') => {
  return char === '\\';
}

/**
 * Is this an open bracket character (`(` or `[`)?
 * @param {String} char - The character to check.
 * @returns {Boolean}
 */
export const isOpenBracket = (char = '') => {
  return !!matchingBrackets[char];
}

/**
 * Is this a quote character (`'` or `"`)?
 * @param {String} char - The character to check.
 * @returns {Boolean}
 */
export const isQuote = (char = '') => {
  return char === '\'' || char === '"';
}