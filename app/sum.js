function sum(a, b) {
  if (typeof(a) !== 'number') {
    throw a + ' is not a number!'
  }
  if (typeof(b) !== 'number') {
    throw b + ' is not a number!'
  }
  return a + b;
}

  module.exports = sum;