const setAndGetCustomProperty = () => {
  console.log(element);
  printValue();
  element.style.setProperty(customPropertyName, 'italic');
  printValue();
};

const printValue = () => {
  // More info: https://stackoverflow.com/a/41725772/2085356
  // const value = element.style.getPropertyValue(customPropertyName);
  const value = window.getComputedStyle(element).getPropertyValue(
      customPropertyName);
  console.log('customPropertyName:', customPropertyName, 'value:', value);
};

const customPropertyName = '--custom-property';
const element = document.querySelector('.my-style');

setAndGetCustomProperty();
