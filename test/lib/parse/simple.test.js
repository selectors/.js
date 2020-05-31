import parseSimpleSelector from '../../../src/lib/parse/simple';

describe('lib/parse/simple.js -> parseSimpleSelector', () => {
  test('universal', () => {
    expect(parseSimpleSelector('*')).toEqual('Universal');
  });

  test('class', () => {
    expect(parseSimpleSelector('.foobar')).toEqual('Class');
  });

  test('id', () => {
    expect(parseSimpleSelector('#foobar')).toEqual('ID');
  });

  test('type', () => {
    expect(parseSimpleSelector('div')).toEqual('Type');
  });

  test('attribute', () => {
    expect(parseSimpleSelector('[foo]')).toEqual('Attribute');
  });

  test('attribute with equality', () => {
    expect(parseSimpleSelector('[foo="bar"]')).toEqual('Attribute');
  });

  test('attribute with white space list value', () => {
    expect(parseSimpleSelector('[foo~="bar"]')).toEqual('Attribute');
  });

  test('attribute begins with', () => {
    expect(parseSimpleSelector('[foo^="bar"]')).toEqual('Attribute');
  });

  test('attribute ends with', () => {
    expect(parseSimpleSelector('[foo$="bar"]')).toEqual('Attribute');
  });

  test('attribute contains', () => {
    expect(parseSimpleSelector('[foo*="bar"]')).toEqual('Attribute');
  });

  test('attribute with hyphenated value', () => {
    expect(parseSimpleSelector('[foo|="bar"]')).toEqual('Attribute');
  });

  test('attribute case sensitivity', () => {
    expect(parseSimpleSelector('[foo="bar" s]')).toEqual('Attribute');
  });

  test('attribute with case insensitivity', () => {
    expect(parseSimpleSelector('[foo="bar" i]')).toEqual('Attribute');
  });

  test('pseudo-class', () => {
    expect(parseSimpleSelector(':hover')).toEqual('Pseudo-class');
  });

  test('pseudo-element', () => {
    expect(parseSimpleSelector('::before')).toEqual('Pseudo-element');
  });

  test('descendant combinator', () => {
    expect(parseSimpleSelector(' ')).toEqual('Combinator');
  });

  test('child combinator', () => {
    expect(parseSimpleSelector('>')).toEqual('Combinator');
  });

  test('next sibling combinator', () => {
    expect(parseSimpleSelector('+')).toEqual('Combinator');
  });

  test('subsequent sibling combinator', () => {
    expect(parseSimpleSelector('~')).toEqual('Combinator');
  });

  test('grid structural', () => {
    expect(parseSimpleSelector('||')).toEqual('Grid');
  });

  test('escaped class', () => {
    expect(parseSimpleSelector('.\\foobar')).toEqual('Class');
  });

  test('escaped ID', () => {
    expect(parseSimpleSelector('#\\foobar')).toEqual('ID');
  });

  test('escaped type', () => {
    expect(parseSimpleSelector('\\div')).toEqual('Type');
  });  
  
  test('complex pseudo-class', () => {
    expect(parseSimpleSelector(':not(.foobar, .barfoo)')).toEqual('Pseudo-class');
  });
});