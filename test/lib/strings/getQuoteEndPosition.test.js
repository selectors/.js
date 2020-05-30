import { getQuoteEndPosition } from '../../../src/lib/strings/string';

describe('lib/strings/string.js -> getQuoteEndPosition', () => {
  test('missing', () => {
    expect(getQuoteEndPosition(`[missing]`, 3)).toEqual(3);
  });

  test('single', () => {
    expect(getQuoteEndPosition(`[single='foobar']`, 8)).toEqual(15);
  });

  test('double', () => {
    expect(getQuoteEndPosition(`[double="foobar"]`, 8)).toEqual(15);
  });

  test('mixed single', () => {
    expect(getQuoteEndPosition(`[mixed='foo "bar" baz']`, 7)).toEqual(21);
  });

  test('mixed double', () => {
    expect(getQuoteEndPosition(`[mixed="foo 'bar' baz"]`, 7)).toEqual(21);
  });

  test('unterminated single', () => {
    expect(getQuoteEndPosition(`[unterminated='foo]`, 14)).toEqual(-1);
  });

  test('unterminated double', () => {
    expect(getQuoteEndPosition(`[unterminated="foo]`, 14)).toEqual(-1);
  });

  test('misterminated single to double', () => {
    expect(getQuoteEndPosition(`[misterminated='foo"]`, 15)).toEqual(-1);
  });

  test('misterminated double to single', () => {
    expect(getQuoteEndPosition(`[misterminated="foo']`, 15)).toEqual(-1);
  });

  test('escaped single', () => {
    expect(getQuoteEndPosition(`[escaped='foo \\'bar\\' baz']`, 9)).toEqual(25);
  });

  test('escaped double', () => {
    expect(getQuoteEndPosition(`[escaped="foo \\"bar\\" baz"]`, 9)).toEqual(25);
  });

  test('out of range', () => {
    expect(getQuoteEndPosition(`[out-of-range]`, 99)).toEqual(-1);
  });
});