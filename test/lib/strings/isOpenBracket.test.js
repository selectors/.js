import { isOpenBracket } from '../../../src/lib/strings/char';

describe('lib/strings/char.js -> isOpenBracket', () => {
  test('regular', () => {
    expect(isOpenBracket(`(`)).toEqual(true);
  });

  test('square', () => {
    expect(isOpenBracket(`[`)).toEqual(true);
  });

  test('non-open bracket char', () => {
    expect(isOpenBracket('a')).toEqual(false);
  });
});