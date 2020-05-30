import { isEscape } from '../../../src/lib/strings/char';

describe('lib/strings/char.js -> isEscape', () => {
  test('escape char', () => {
    expect(isEscape('\\')).toEqual(true);
  });

  test('non-escape char', () => {
    expect(isEscape('a')).toEqual(false);
  });
});