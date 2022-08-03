const sum = require('../app/sum.js');

test('adds 1 + 2 to equal 3', () => {
  expect(sum(1, 2)).toBe(3);
});

test('throws an error for 1 + hello', () => {
  expect(() => sum(1, 'hello')).toThrowError('hello is not a number!');
});

test('throws an error for hello + 1', () => {
  expect(() => sum('hello', 1)).toThrowError('hello is not a number!');
});