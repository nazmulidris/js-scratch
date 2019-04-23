const getStyleProperty = (element, propertyName) => {
  return element.style[propertyName];
  // The following doesn't work unless it's a valid CSS property name.
  // return element.style.getPropertyValue(propertyName);
};

const setStyleProperty = (element, propertyName, value) => {
  element.style[propertyName] = value;
};

const main = () => {
  const propertyName = 'my-property';
  const element = document.getElementById('my_div');
  setStyleProperty(element, propertyName, 'testValue');
  const value = getStyleProperty(element, propertyName);
  console.log(element);
  console.log('propertyName:', propertyName, 'value:', value);
};

main();
