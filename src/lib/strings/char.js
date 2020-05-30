/**
 * Is this an escape character (`\`)?
 * @param {String} char - The character to check.
 * @returns {Boolean}
 */
export const isEscape = (char = '') => {
  return char === '\\';
}

/**
 * Is this a quote character (`'` or `"`)?
 * @param {String} char - The character to check.
 * @returns {Boolean}
 */
export const isQuote = (char = '') => {
  return char === '\'' || char === '"';
}