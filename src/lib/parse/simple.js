/**
 * Return the type of a simple selector (e.g. `div` or `.foo`).
 * This assumes the selector is valid.
 * @param {String} selector - A simple selector.
 * @returns {Object} - The matching type definition.
 */
const parseSimpleSelector = (selector = '') => {
  const firstChar = selector[0];

  // First get rid of the basic selectors.
  switch (firstChar) {
    case '*':
      return 'Universal';

    case '.':
      return 'Class';

    case '#':
      return 'ID';

    case '[':
      // To avoid overcomplication all attributes will return as the same.
      return 'Attribute';

    case ' ':
    case '>':
    case '+':
    case '~':
      // To avoid overcomplication all combinators will return as the same.
      return 'Combinator';

    case '|':
      return 'Grid';

    default:
      break;
  }

  if (firstChar !== ':') {
    // We assume anything else is a type selector.
    return 'Type';
  }
  
  const secondChar = selector[1];

  if (secondChar === ':') {
    // It's a pseudo-element of some sort.
    return 'Pseudo-element';
  }

  return 'Pseudo-class';
}

export default parseSimpleSelector;