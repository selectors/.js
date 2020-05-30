# Selectors.js

[![Build Status](https://travis-ci.org/selectors/.js.svg?branch=master)](https://travis-ci.org/selectors/.js) ![Dev Dependencies](https://img.shields.io/david/dev/selectors/.js)

Split and parse CSS selectors.

🚧 **This is a work in progress and is currently in a very early stage of development.**

## Motivation

This library exists as the backbone of [selectors.io](https://selectors.io)<sup>†</sup>. Rather than siloing the code within the website itself, it made sense to share it with a wider audience.

† If [selectors.io](https://selectors.io) currently redirects to this readme, the new website is not yet ready. The old website can still be accessed at [http://selectors.github.io/selectors.io/](http://selectors.github.io/selectors.io) but its functionality may be a bit limited.

### What happened to the old library?

The old library was heavily based around regular expressions defined in [Appendix G. Grammar of CSS2.1](https://www.w3.org/TR/2011/REC-CSS2-20110607/grammar.html#q25.0). Whilst this worked for the intended purpose, it was slow and made the website feel very clunky. This has been shelved in favour of a string-iterative approach which is significantly faster.

The old library is archived but still available at [selectors/selectors.js](https://github.com/selectors/selectors.js).

## Terminology

To avoid confusion, the terminology used here is based on definitions made by W3C in the [Selectors Level 4 Working Draft](https://www.w3.org/TR/selectors) (specifically [this version](https://www.w3.org/TR/2018/WD-selectors-4-20181121/) last modified on the 21st November 2018, which at time of writing this readme in May 2020 is the most recent version).

For further reading, this terminology is defined explicitly in the [Structure and Terminology](https://www.w3.org/TR/selectors-4/#structure) section of the Selectors Level 4 Working Draft.

* **simple** - a single condition on an element (e.g. `div`, `.foo` or `:hover`)
* **compound** - a sequence of simple selectors that are not separated by a combinator (e.g. `div.foo:hover`)
* **combinator** - a condition of relationship between two elements represented by the compound selectors on either side (white space, `>`, `+` or `~`)
* **complex** - a sequence of one or more compound selectors separated by combinators (e.g. `div .foo` or `div > .foo:hover`)
* **list** - a comma-separated list of simple, compound, or complex selectors (e.g. `div, div .foo, div > .foo:hover`)
* **pseudo-element** - represents an element not directly present in the document tree (e.g. `::before` or `::first-letter`)