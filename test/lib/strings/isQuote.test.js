import { isQuote } from '../../../src/lib/strings/char';

describe('lib/strings/char.js -> isQuote', () => {
  test('single', () => {
    expect(isQuote(`'`)).toEqual(true);
  });

  test('double', () => {
    expect(isQuote(`"`)).toEqual(true);
  });

  test('non-quote char', () => {
    expect(isQuote('a')).toEqual(false);
  });
});