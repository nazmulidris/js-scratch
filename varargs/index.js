const main = () => {
  f3({a: 1, b: 2});
  f2({a: 1, b: 2});
  f1({a: 1, b: 2});
};

const f1 = (...args) => {
  f2('f2', 'new1', 'new2', ...args);
};

const f2 = (...args) => {
  console.log('f2:', ...args);
};

const f3 = (...args) => {
  console.log('f3:', args);
};

main();
