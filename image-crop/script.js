/*
 * Copyright 2019 Nazmul Idris. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

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
