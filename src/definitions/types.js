/**
 * This is a list of types extracted from https://www.w3.org/TR/selectors-4/#overview using the
 * below snippet, then manually named:

[...document.querySelector('#selector-examples').querySelectorAll('tr')].filter((
  (_, index) => index > 0
)).map((row, index) => (
`n_${index}: {
  description: '${row.querySelector('td:nth-child(2)').innerText}',
  doc: '${row.querySelector('td:nth-child(3) a').href}',
  level: '${row.querySelector('td:last-child').innerText}',
  name: '${row.querySelector('td:nth-child(3) a').innerText.replace(/§\d+(\.\d+)* /, '')}',
  pattern: \`${row.querySelector('td:first-child').innerText}\`,
}`
)).join(',\n');

 * TODO: Maybe convert this to a cURL-based approach?
 */

const types = {
  universal: {
    description: 'any element',
    doc: 'https://www.w3.org/TR/selectors-4/#the-universal-selector',
    level: '2',
    name: 'Universal selector',
    pattern: `*`,
  },
  type: {
    description: 'an element of type E',
    doc: 'https://www.w3.org/TR/selectors-4/#type-selectors',
    level: '1',
    name: 'Type (tag name) selector',
    pattern: `E`,
  },
  negation: {
    description: 'an E element that does not match either compound selector s1 or compound selector s2',
    doc: 'https://www.w3.org/TR/selectors-4/#negation',
    level: '3/4',
    name: 'The Negation (Matches-None) Pseudo-class: :not()',
    pattern: `E:not(s1, s2, …)`,
  },
  matchesAny: {
    description: 'an E element that matches compound selector s1 and/or compound selector s2',
    doc: 'https://www.w3.org/TR/selectors-4/#matches',
    level: '4',
    name: 'The Matches-Any Pseudo-class: :is()',
    pattern: `E:is(s1, s2, …)`,
  },
  specificityAdjustment: {
    description: 'an E element that matches compound selector s1 and/or compound selector s2 but contributes no specificity.',
    doc: 'https://www.w3.org/TR/selectors-4/#zero-matches',
    level: '4',
    name: 'The Specificity-adjustment Pseudo-class: :where()',
    pattern: `E:where(s1, s2, …)`,
  },
  relational: {
    description: 'an E element, if either of the relative selectors rs1 or rs2, when evaluated with E as the :scope elements, match an element',
    doc: 'https://www.w3.org/TR/selectors-4/#relational',
    level: '4',
    name: 'The Relational Pseudo-class: :has()',
    pattern: `E:has(rs1, rs2, …)`,
  },
  class: {
    description: 'an E element belonging to the class warning (the document language specifies how class is determined).',
    doc: 'https://www.w3.org/TR/selectors-4/#class-html',
    level: '1',
    name: 'Class selectors',
    pattern: `E.warning`,
  },
  id: {
    description: 'an E element with ID equal to myid.',
    doc: 'https://www.w3.org/TR/selectors-4/#id-selectors',
    level: '1',
    name: 'ID selectors',
    pattern: `E#myid`,
  },
  attribute: {
    description: 'an E element with a foo attribute',
    doc: 'https://www.w3.org/TR/selectors-4/#attribute-selectors',
    level: '2',
    name: 'Attribute selectors',
    pattern: `E[foo]`,
  },
  attributeEquals: {
    description: 'an E element whose foo attribute value is exactly equal to bar',
    doc: 'https://www.w3.org/TR/selectors-4/#attribute-selectors',
    level: '2',
    name: 'Attribute selectors',
    pattern: `E[foo="bar"]`,
  },
  attributeCaseInsensitive: {
    description: 'an E element whose foo attribute value is exactly equal to any (ASCII-range) case-permutation of bar',
    doc: 'https://www.w3.org/TR/selectors-4/#attribute-case',
    level: '4',
    name: 'Case-sensitivity',
    pattern: `E[foo="bar" i]`,
  },
  attributeCaseSensitive: {
    description: 'an E element whose foo attribute value is exactly and case-sensitively equal to bar',
    doc: 'https://www.w3.org/TR/selectors-4/#attribute-case',
    level: '4',
    name: 'Case-sensitivity',
    pattern: `E[foo="bar" s]`,
  },
  attributeWhiteSpaceContains: {
    description: 'an E element whose foo attribute value is a list of whitespace-separated values, one of which is exactly equal to bar',
    doc: 'https://www.w3.org/TR/selectors-4/#attribute-selectors',
    level: '2',
    name: 'Attribute selectors',
    pattern: `E[foo~="bar"]`,
  },
  attributeBegins: {
    description: 'an E element whose foo attribute value begins exactly with the string bar',
    doc: 'https://www.w3.org/TR/selectors-4/#attribute-substrings',
    level: '3',
    name: 'Substring matching attribute selectors',
    pattern: `E[foo^="bar"]`,
  },
  attributeEnds: {
    description: 'an E element whose foo attribute value ends exactly with the string bar',
    doc: 'https://www.w3.org/TR/selectors-4/#attribute-substrings',
    level: '3',
    name: 'Substring matching attribute selectors',
    pattern: `E[foo$="bar"]`,
  },
  attributeContains: {
    description: 'an E element whose foo attribute value contains the substring bar',
    doc: 'https://www.w3.org/TR/selectors-4/#attribute-substrings',
    level: '3',
    name: 'Substring matching attribute selectors',
    pattern: `E[foo*="bar"]`,
  },
  attributeHyphenPrefix: {
    description: 'an E element whose foo attribute value is a hyphen-separated list of values beginning with en',
    doc: 'https://www.w3.org/TR/selectors-4/#attribute-selectors',
    level: '2',
    name: 'Attribute selectors',
    pattern: `E[foo|="en"]`,
  },
  directionality: {
    description: 'an element of type E with left-to-right directionality (the document language specifies how directionality is determined)',
    doc: 'https://www.w3.org/TR/selectors-4/#the-dir-pseudo',
    level: '4',
    name: 'The Directionality Pseudo-class: :dir()',
    pattern: `E:dir(ltr)`,
  },
  language: {
    description: 'an element of type E tagged as being either in Chinese (any dialect or writing system) or otherwise written with traditional Chinese characters',
    doc: 'https://www.w3.org/TR/selectors-4/#the-lang-pseudo',
    level: '2/4',
    name: 'The Language Pseudo-class: :lang()',
    pattern: `E:lang(zh, "*-hant")`,
  },
  hyperlink: {
    description: 'an E element being the source anchor of a hyperlink',
    doc: 'https://www.w3.org/TR/selectors-4/#the-any-link-pseudo',
    level: '4',
    name: 'The Hyperlink Pseudo-class: :any-link',
    pattern: `E:any-link`,
  },
  hyperlinkUnvisited: {
    description: 'an E element being the source anchor of a hyperlink of which the target is not yet visited',
    doc: 'https://www.w3.org/TR/selectors-4/#link',
    level: '1',
    name: 'The Link History Pseudo-classes: :link and :visited',
    pattern: `E:link`,
  },
  hyperlinkVisited: {
    description: 'an E element being the source anchor of a hyperlink of which the target is already visited',
    doc: 'https://www.w3.org/TR/selectors-4/#link',
    level: '1',
    name: 'The Link History Pseudo-classes: :link and :visited',
    pattern: `E:visited`,
  },
  hyperlinkCurrent: {
    description: 'an E element being the source anchor of a hyperlink targetting the current URL',
    doc: 'https://www.w3.org/TR/selectors-4/#the-local-link-pseudo',
    level: '4',
    name: 'The Local Link Pseudo-class: :local-link',
    pattern: `E:local-link`,
  },
  target: {
    description: 'an E element being the target of the current URL',
    doc: 'https://www.w3.org/TR/selectors-4/#the-target-pseudo',
    level: '3',
    name: 'The Target Pseudo-class: :target',
    pattern: `E:target`,
  },
  targetContainer: {
    description: 'an E element that is the target of the current URL or contains an element that does.',
    doc: 'https://www.w3.org/TR/selectors-4/#the-target-within-pseudo',
    level: '4',
    name: 'The Target Container Pseudo-class: :target-within',
    pattern: `E:target-within`,
  },
  reference: {
    description: 'an E element being a designated reference element',
    doc: 'https://www.w3.org/TR/selectors-4/#the-scope-pseudo',
    level: '4',
    name: 'The Reference Element Pseudo-class: :scope',
    pattern: `E:scope`,
  },
  timeCurrent: {
    description: 'an E element that is currently presented in a time-dimensional canvas',
    doc: 'https://www.w3.org/TR/selectors-4/#time-pseudos',
    level: '4',
    name: 'Time-dimensional Pseudo-classes',
    pattern: `E:current`,
  },
  timeCurrentDeepest: {
    description: 'an E element that is the deepest :current element that matches selector s',
    doc: 'https://www.w3.org/TR/selectors-4/#time-pseudos',
    level: '4',
    name: 'Time-dimensional Pseudo-classes',
    pattern: `E:current(s)`,
  },
  timePast: {
    description: 'an E element that is in the past in a time-dimensional canvas',
    doc: 'https://www.w3.org/TR/selectors-4/#time-pseudos',
    level: '4',
    name: 'Time-dimensional Pseudo-classes',
    pattern: `E:past`,
  },
  timeFuture: {
    description: 'an E element that is in the future in a time-dimensional canvas',
    doc: 'https://www.w3.org/TR/selectors-4/#time-pseudos',
    level: '4',
    name: 'Time-dimensional Pseudo-classes',
    pattern: `E:future`,
  },
  active: {
    description: 'an E element that is in an activated state',
    doc: 'https://www.w3.org/TR/selectors-4/#useraction-pseudos',
    level: '1',
    name: 'User Action Pseudo-classes',
    pattern: `E:active`,
  },
  hover: {
    description: 'an E element that is under the cursor, or that has a descendant under the cursor',
    doc: 'https://www.w3.org/TR/selectors-4/#useraction-pseudos',
    level: '2',
    name: 'User Action Pseudo-classes',
    pattern: `E:hover`,
  },
  focus: {
    description: 'an E element that has user input focus',
    doc: 'https://www.w3.org/TR/selectors-4/#useraction-pseudos',
    level: '2',
    name: 'User Action Pseudo-classes',
    pattern: `E:focus`,
  },
  focusWithin: {
    description: 'an E element that has user input focus or contains an element that has input focus.',
    doc: 'https://www.w3.org/TR/selectors-4/#the-focus-within-pseudo',
    level: '4',
    name: 'The Focus Container Pseudo-class: :focus-within',
    pattern: `E:focus-within`,
  },
  focusVisible: {
    description: 'an E element that has user input focus, and the UA has determined that a focus ring or other indicator should be drawn for that element',
    doc: 'https://www.w3.org/TR/selectors-4/#useraction-pseudos',
    level: '4',
    name: 'User Action Pseudo-classes',
    pattern: `E:focus-visible`,
  },
  enabledDisabled: {
    description: 'a user interface element E that is enabled or disabled, respectively',
    doc: 'https://www.w3.org/TR/selectors-4/#enableddisabled',
    level: '3',
    name: 'The :enabled and :disabled Pseudo-classes',
    pattern: 'E:enabled, E:disabled',
  },
  mutability: {
    description: 'a user interface element E that is user alterable, or not',
    doc: 'https://www.w3.org/TR/selectors-4/#rw-pseudos',
    level: '3-UI/4',
    name: 'The Mutability Pseudo-classes: :read-only and :read-write',
    pattern: `E:read-write, E:read-only`,
  },
  placeholderShown: {
    description: 'an input control currently showing placeholder text',
    doc: 'https://www.w3.org/TR/selectors-4/#rw-pseudos',
    level: '3-UI/4',
    name: 'The Placeholder-shown Pseudo-class: :placeholder-shown',
    pattern: `E:placeholder-shown`,
  },
  default: {
    description: 'a user interface element E that is the default item in a group of related choices',
    doc: 'https://www.w3.org/TR/selectors-4/#the-default-pseudo',
    level: '3-UI/4',
    name: 'The Default-option Pseudo-class: :default',
    pattern: `E:default`,
  },
  checked: {
    description: 'a user interface element E that is checked/selected (for instance a radio-button or checkbox)',
    doc: 'https://www.w3.org/TR/selectors-4/#checked',
    level: '3',
    name: 'The Selected-option Pseudo-class: :checked',
    pattern: `E:checked`,
  },
  indeterminate: {
    description: 'a user interface element E that is in an indeterminate state (neither checked nor unchecked)',
    doc: 'https://www.w3.org/TR/selectors-4/#indeterminate',
    level: '4',
    name: 'The Indeterminate-value Pseudo-class: :indeterminate',
    pattern: `E:indeterminate`,
  },
  validity: {
    description: 'a user-input element E that meets, or doesn’t, its data validity semantics',
    doc: 'https://www.w3.org/TR/selectors-4/#range-pseudos',
    level: '3-UI/4',
    name: 'The Validity Pseudo-classes: :valid and :invalid',
    pattern: `E:valid, E:invalid`,
  },
  range: {
    description: 'a user-input element E whose value is in-range/out-of-range',
    doc: 'https://www.w3.org/TR/selectors-4/#range-pseudos',
    level: '3-UI/4',
    name: 'The Range Pseudo-classes: :in-range and :out-of-range',
    pattern: `E:in-range
  E:out-of-range`,
  },
  optionality: {
    description: 'a user-input element E that requires/does not require input',
    doc: 'https://www.w3.org/TR/selectors-4/#opt-pseudos',
    level: '3-UI/4',
    name: 'The Optionality Pseudo-classes: :required and :optional',
    pattern: `E:required, E:optional`,
  },
  blank: {
    description: 'a user-input element E whose value is blank (empty/missing)',
    doc: 'https://www.w3.org/TR/selectors-4/#blank',
    level: '4',
    name: 'The Empty-Value Pseudo-class: :blank',
    pattern: `E:blank`,
  },
  invalid: {
    description: 'a user-altered user-input element E with incorrect input (invalid, out-of-range, omitted-but-required)',
    doc: 'https://www.w3.org/TR/selectors-4/#user-pseudos',
    level: '4',
    name: 'The User-interaction Pseudo-class: :user-invalid',
    pattern: `E:user-invalid`,
  },
  treeRoot: {
    description: 'an E element, root of the document',
    doc: 'https://www.w3.org/TR/selectors-4/#structural-pseudos',
    level: '3',
    name: 'Tree-Structural pseudo-classes',
    pattern: `E:root`,
  },
  treeEmpty: {
    description: 'an E element that has no children (neither elements nor text) except perhaps white space',
    doc: 'https://www.w3.org/TR/selectors-4/#structural-pseudos',
    level: '3',
    name: 'Tree-Structural pseudo-classes',
    pattern: `E:empty`,
  },
  childNth: {
    description: 'an E element, the n-th child of its parent matching S',
    doc: 'https://www.w3.org/TR/selectors-4/#child-index',
    level: '3/4',
    name: 'Child-indexed Pseudo-classes',
    pattern: `E:nth-child(n [of S]?)`,
  },
  childNthLast: {
    description: 'an E element, the n-th child of its parent matching S, counting from the last one',
    doc: 'https://www.w3.org/TR/selectors-4/#child-index',
    level: '3/4',
    name: 'Child-indexed Pseudo-classes',
    pattern: `E:nth-last-child(n [of S]?)`,
  },
  childFirst: {
    description: 'an E element, first child of its parent',
    doc: 'https://www.w3.org/TR/selectors-4/#child-index',
    level: '2',
    name: 'Child-indexed Pseudo-classes',
    pattern: `E:first-child`,
  },
  childLast: {
    description: 'an E element, last child of its parent',
    doc: 'https://www.w3.org/TR/selectors-4/#child-index',
    level: '3',
    name: 'Child-indexed Pseudo-classes',
    pattern: `E:last-child`,
  },
  childOnly: {
    description: 'an E element, only child of its parent',
    doc: 'https://www.w3.org/TR/selectors-4/#child-index',
    level: '3',
    name: 'Child-indexed Pseudo-classes',
    pattern: `E:only-child`,
  },
  typeNth: {
    description: 'an E element, the n-th sibling of its type',
    doc: 'https://www.w3.org/TR/selectors-4/#typed-child-index',
    level: '3',
    name: 'Typed Child-indexed Pseudo-classes',
    pattern: `E:nth-of-type(n)`,
  },
  typeNthLast: {
    description: 'an E element, the n-th sibling of its type, counting from the last one',
    doc: 'https://www.w3.org/TR/selectors-4/#typed-child-index',
    level: '3',
    name: 'Typed Child-indexed Pseudo-classes',
    pattern: `E:nth-last-of-type(n)`,
  },
  typeFirst: {
    description: 'an E element, first sibling of its type',
    doc: 'https://www.w3.org/TR/selectors-4/#typed-child-index',
    level: '3',
    name: 'Typed Child-indexed Pseudo-classes',
    pattern: `E:first-of-type`,
  },
  typeLast: {
    description: 'an E element, last sibling of its type',
    doc: 'https://www.w3.org/TR/selectors-4/#typed-child-index',
    level: '3',
    name: 'Typed Child-indexed Pseudo-classes',
    pattern: `E:last-of-type`,
  },
  typeOnly: {
    description: 'an E element, only sibling of its type',
    doc: 'https://www.w3.org/TR/selectors-4/#typed-child-index',
    level: '3',
    name: 'Typed Child-indexed Pseudo-classes',
    pattern: `E:only-of-type`,
  },
  combinatorDescendant: {
    description: 'an F element descendant of an E element',
    doc: 'https://www.w3.org/TR/selectors-4/#descendant-combinators',
    level: '1',
    name: 'Descendant combinator ( )',
    pattern: `E F`,
  },
  combinatorChild: {
    description: 'an F element child of an E element',
    doc: 'https://www.w3.org/TR/selectors-4/#child-combinators',
    level: '2',
    name: 'Child combinator (>)',
    pattern: `E > F`,
  },
  combinatorNextSibling: {
    description: 'an F element immediately preceded by an E element',
    doc: 'https://www.w3.org/TR/selectors-4/#adjacent-sibling-combinators',
    level: '2',
    name: 'Next-sibling combinator (+)',
    pattern: `E + F`,
  },
  combinatorSubsequentSibling: {
    description: 'an F element preceded by an E element',
    doc: 'https://www.w3.org/TR/selectors-4/#general-sibling-combinators',
    level: '3',
    name: 'Subsequent-sibling combinator (~)',
    pattern: `E ~ F`,
  },
  gridStructural: {
    description: 'an E element that represents a cell in a grid/table belonging to a column represented by an element F',
    doc: 'https://www.w3.org/TR/selectors-4/#table-pseudos',
    level: '4',
    name: 'Grid-Structural Selectors',
    pattern: `F || E`,
  },
  colNth: {
    description: 'an E element that represents a cell belonging to the nth column in a grid/table',
    doc: 'https://www.w3.org/TR/selectors-4/#table-pseudos',
    level: '4',
    name: 'Grid-Structural Selectors',
    pattern: `E:nth-col(n)`,
  },
  colNthLast: {
    description: 'an E element that represents a cell belonging to the nth column in a grid/table, counting from the last one',
    doc: 'https://www.w3.org/TR/selectors-4/#table-pseudos',
    level: '4',
    name: 'Grid-Structural Selectors',
    pattern: `E:nth-last-col(n)`,
  }
}

/**
 * This is a mapping between pseudo class names and their type definitions above.
 */
export const pseudoClassTypeMap = {
  not: types.negation,
  is: types.matchesAny,
  where: types.specificityAdjustment,
  has: types.relational,
  dir: types.directionality,
  language: types.lang,
  'any-link': types.hyperlink,
  link: types.hyperlinkUnvisited,
  visited: types.hyperlinkVisited,
  'local-link': types.hyperlinkCurrent,
  target: types.target,
  'target-within': types.targetContainer,
  scope: types.reference,
  current: types.timeCurrent,
  'current()': types.timeCurrentDeepest,
  past: types.timePast,
  future: types.timeFuture,
  active: types.active,
  hover: types.hover,
  focus: types.focus,
  'focus-within': types.focusWithin,
  'focus-visible': types.focusVisible,
  enabled: types.enabledDisabled,
  disabled: types.enabledDisabled,
  'read-write': types.mutability,
  'read-only': types.mutability,
  'placeholder-shown': types.placeholderShown,
  default: types.default,
  checked: types.checked,
  indeterminate: types.indeterminate,
  valid: types.validity,
  invalid: types.validity,
  'in-range': types.range,
  'out-of-range': types.range,
  required: types.optionality,
  optional: types.optionality,
  blank: types.blank,
  'user-invalid': types.invalid,
  root: types.treeRoot,
  empty: types.empty,
  'nth-child': types.childNth,
  'nth-last-child': types.childNthLast,
  'first-child': types.childFirst,
  'last-child': types.childLast,
};

export default types;