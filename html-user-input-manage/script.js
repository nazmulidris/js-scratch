/*
 * Copyright 2019 Nazmul Idris All rights reserved.
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

/**
 * Create 3 POJOs containing user input from the HTML, based on the containers
 * (divs w/ data-scope attributes 'page', 'map-options', 'layout').
 */
const generatePojosFromUi = () => {
  const pojos = {};
  const divs = document.querySelectorAll('div[data-scope]');
  for (const div of divs) {
    const scopeName = div.dataset.scope;
    pojos[scopeName] = getUserInputsForScope(div);
  }
  console.log('pojos:', JSON.stringify(pojos, undefined, 2));
  return pojos;
};

/**
 * Return an object containing key-value pairs of the input elements for the
 * given div. Input elements include:
 * - checkbox element
 * - select element
 * - input text element
 *
 * @param div
 */
const getUserInputsForScope = (div) => {
  const pojo = {};

  const inputs = div.querySelectorAll('input, select');

  for (const userInput of inputs) {
    const key = userInput.name;
    let value = null;
    const type = userInput.type;

    // console.log(
    //     `input: type: ${type}, name:${key}, value: ${value}`);

    switch (type) {
      case 'checkbox':
        value = userInput.checked;
        break;
      default:
        value = userInput.value;
    }
    pojo[key] = value;
  }

  return pojo;
};

/**
 * Iterate thru all the containers (divs w/ data-scope attributes 'page',
 * 'map-options', 'layout') and attach change listeners to the:
 * - input text and checkbox elements
 * - select elements.
 *
 * When a user changes the value of these input fields, they fire change events
 * which call generatePojosFromUi().
 */
const attachListenersToUi = () => {
  const attachListenersToUiForScope = (div) => {
    const inputs = div.querySelectorAll('input, select');
    for (const userInput of inputs) {
      userInput.addEventListener('change', () => {
        console.log('change event fired on', userInput, 'in div', div);
        generatePojosFromUi();
      })
    }
  };

  const divs = document.querySelectorAll('div[data-scope]');
  for (const div of divs) {
    attachListenersToUiForScope(div);
  }
};

/**
 * Given the pojos, apply the key-value pairs to the DOM, so that it reflects
 * what is in the pojos. The assumption is that the attachListenersToUi()
 * function has already been called before this function.
 */
const applyPojosToUi = (pojos) => {
  // TODO
};

// Main entry point.

const pojos = generatePojosFromUi();

attachListenersToUi();

document.querySelector(
    'body > div:nth-child(3) > label > select').addEventListener('change',
    () => {
      alert('do something more on layout change');
    });

const pagediv = document.querySelector('div[data-scope="page"');
const layoutdiv = document.querySelector('div[data-scope="layout"');
const mapoptionsdiv = document.querySelector('div[data-scope="map-options"');
