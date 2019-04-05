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

const Selector = {
  SCOPE_DATA_ATTRIB_NAME: 'scope',
  NESTED_SCOPE_NAME: 'scope3',
  NESTED_SCOPE_DATA_ATTRIB_NAME: 'dropdown',
};

/**
 * Create 3 POJOs containing user input from the HTML, based on the containers
 * (divs w/ data-scope attributes 'scope1', 'scope2', 'scope3').
 */
const generatePojosFromUi = () => {
  const pojos = {};
  
  const divs = document.querySelectorAll(
    `div[data-${Selector.SCOPE_DATA_ATTRIB_NAME}]`);
  
  for (const div of divs) {
    const scopeName = div.dataset[Selector.SCOPE_DATA_ATTRIB_NAME];
    if (scopeName === Selector.NESTED_SCOPE_NAME) {
      let selectElement = div.querySelector('select');
      const selectValue = selectElement.value;
      const subScopeDiv =
        div.querySelector(
          `div[data-${Selector.NESTED_SCOPE_DATA_ATTRIB_NAME}="${selectValue}"]`);
      
      adjustNestedScopeVisibility(selectElement, div);
      
      console.log(`dropdownSelectValue: ${selectValue}`);
      
      // Using the value, only grab inputs for the sub-scope.
      pojos[scopeName] = getUserInputsForScope(scopeName, subScopeDiv);
    } else {
      pojos[scopeName] = getUserInputsForScope(scopeName, div);
    }
  }
  
  console.log('pojos:', JSON.stringify(pojos, undefined, 2));
  return pojos;
};

/**
 * Show/hide the children of the parentDiv, based on the value of the selectElement.
 */
const adjustNestedScopeVisibility = (selectElement, parentDiv) => {
  // TODO
  selectElement.addEventListener(
    'change',
    () => {
      alert('do something more on change');
    }
  );
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
const getUserInputsForScope = (scopeName, div) => {
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
 * Iterate thru all the containers and attach change listeners to the:
 * - input text and checkbox elements
 * - select elements.
 *
 * When a user changes the value of these input fields, they fire change events
 * which call generatePojosFromUi().
 */
const attachListenersToUi = () => {
  const attachListenersToUiForScope = (scopeName, div) => {
    const inputs = div.querySelectorAll('input, select');
    for (const userInput of inputs) {
      userInput.addEventListener('change', () => {
        console.log('change event fired on', userInput, 'in div', div);
        generatePojosFromUi();
      })
    }
  };
  
  const divs = document.querySelectorAll(
    `div[data-${Selector.SCOPE_DATA_ATTRIB_NAME}]`);
  for (const div of divs) {
    const scopeName = div.dataset.scope;
    attachListenersToUiForScope(scopeName, div);
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
