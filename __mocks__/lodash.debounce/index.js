module.exports = function mockDebounce(cb) {
  return () => cb();
};
