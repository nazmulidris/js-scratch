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
  DATA_ATTRIB_SCOPE: 'data-scope',
  DATA_ATTRIB_NESTED_SCOPE: 'data-dropdown',
  NESTED_SCOPE_NAME: 'scope3',
};

const getAllTopLevelContainerDivs = () => {
  return document.querySelectorAll(
    `div[${Selector.DATA_ATTRIB_SCOPE}]`);
};

const getScopeName = (div) => {
  return div.getAttribute(`${Selector.DATA_ATTRIB_SCOPE}`);
};

const getParentOfNestedDivs = () => {
  for (const div of getAllTopLevelContainerDivs()) {
    if (getScopeName(div) === Selector.NESTED_SCOPE_NAME) {
      return div;
    }
  }
};

const getSelectedNestedDiv = (parentDiv) => {
  const selectValue = parentDiv.querySelector('select').value;
  console.log(`dropdownSelectValue: ${selectValue}`);
  return parentDiv.querySelector(
    `div[${Selector.DATA_ATTRIB_NESTED_SCOPE}="${selectValue}"]`);
};

const getAllNestedDivs = (parentDiv) => {
  return parentDiv.querySelectorAll(
    `div[${Selector.DATA_ATTRIB_NESTED_SCOPE}]`)
};

/**
 * Show/hide the children of the parentDiv, based on the value of the select
 * element.
 */
const attachNestedDivVisibilityHandler = () => {
  const parentDiv = getParentOfNestedDivs();
  const selectElement = parentDiv.querySelector('select');
  selectElement.addEventListener(
    'change',
    () => {
      const parentDiv = getParentOfNestedDivs();
      const nestedDivs = getAllNestedDivs(parentDiv);
      nestedDivs.forEach((div) => {
        div.style.display = 'none';
      });
      getSelectedNestedDiv(parentDiv).style.display = 'block';
      console.log('nested div visibility changed');
    }
  );
  // Fire a change event to trigger the listener.
  selectElement.dispatchEvent(new Event('change'));
};

/**
 * Create 3 POJOs containing user input from the HTML, based on the containers
 * (divs w/ data-scope attributes 'scope1', 'scope2', 'scope3').
 */
const generatePojosFromUi = () => {
  const pojos = {};
  
  for (const div of getAllTopLevelContainerDivs()) {
    const scopeName = getScopeName(div);
    if (scopeName === Selector.NESTED_SCOPE_NAME) {
      const nestedDiv = getSelectedNestedDiv(div);
      pojos[scopeName] = getUserInputsForScope(scopeName, nestedDiv);
    } else {
      pojos[scopeName] = getUserInputsForScope(scopeName, div);
    }
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
 * @param scopeName
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
    `div[${Selector.DATA_ATTRIB_SCOPE}]`);
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
  // TODO for each key in pojos update the corresponding scope in the DOM
  // TODO make sure to handle input type text, checkbox, and select elements
  // TODO
  //  when programmatically updating the DOM, check to see if change events are fired
  //  else it might be necessary to call generatePojosFromUi() after the DOM is updated
};

// Main entry point.
const pojos = generatePojosFromUi();
attachListenersToUi();
attachNestedDivVisibilityHandler();
// Clicking button causes pojo to be modified triggering a change in the UI.
document.querySelector('button')
        .addEventListener("click", () => {
          pojos['scope1'].flag1 = true;
  
          pojos['scope2'].distance = "15";
          pojos['scope2'].mode = "BIKE";
          pojos['scope2'].textData1 = "test";
  
          pojos['scope3'].flag1 = true;
          pojos['scope3'].flag2 = true;
  
          console.log('pojos:', JSON.stringify(pojos, undefined, 2));
          applyPojosToUi(pojos);
        });