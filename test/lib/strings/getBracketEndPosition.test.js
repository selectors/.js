import { getBracketEndPosition } from '../../../src/lib/strings/string';

describe('lib/strings/string.js -> getBracketEndPosition', () => {
  test('missing', () => {
    expect(getBracketEndPosition(`.foobar`, 3)).toEqual(3);
  });

  test('regular', () => {
    expect(getBracketEndPosition(`:not(.foobar)`, 4)).toEqual(12);
  });

  test('square', () => {
    expect(getBracketEndPosition(`[attr]`, 0)).toEqual(5);
  });

  test('nested regular outer', () => {
    expect(getBracketEndPosition(`:not(:is(.foobar))`, 4)).toEqual(17);
  });

  test('nested regular inner', () => {
    expect(getBracketEndPosition(`:not(:is(.foobar))`, 8)).toEqual(16);
  });

  test('mixed regular outer', () => {
    expect(getBracketEndPosition(`:not(:is(.foo), :is(.bar))`, 4)).toEqual(25);
  });

  test('mixed regular inner', () => {
    expect(getBracketEndPosition(`:not(:is(.foo), :is(.bar))`, 8)).toEqual(13);
  });

  test('unterminated regular', () => {
    expect(getBracketEndPosition(`:nth-child(1`, 10)).toEqual(-1);
  });

  test('unterminated square', () => {
    expect(getBracketEndPosition(`[unterminated`, 0)).toEqual(-1);
  });

  test('misterminated regular to square', () => {
    expect(getBracketEndPosition(`:dir(ltr]`, 4)).toEqual(-1);
  });

  test('misterminated square to regular', () => {
    expect(getBracketEndPosition(`[misterminated)`, 0)).toEqual(-1);
  });

  test('out of range regular', () => {
    expect(getBracketEndPosition(`(out-of-range)`, 99)).toEqual(-1);
  });

  test('out of range square', () => {
    expect(getBracketEndPosition(`[out-of-range]`, 99)).toEqual(-1);
  });
});