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

/**
 * Sets the selectElement's value to newValue. And fires a change event on the
 * selectElement.
 *
 * @param selectElement
 * @param newValue
 */
const setValueOnSelectElement = (selectElement, newValue) => {
  selectElement.value = newValue;
  fireChangeEventOnSelectElement(selectElement);
};

const fireChangeEventOnSelectElement = (selectElement) => {
  selectElement.dispatchEvent(new Event('change'));
};

const getSelectElement = (parentDiv) => {
  const selectElement = parentDiv.querySelector('select');
  return selectElement;
};

const getSelectedNestedDiv = (parentDiv) => {
  const selectValue = getSelectElement(parentDiv).value;
  // console.log(`dropdownSelectValue: ${selectValue}`);
  return parentDiv.querySelector(
    `div[${Selector.DATA_ATTRIB_NESTED_SCOPE}="${selectValue}"]`);
};

const getAllNestedDivs = (parentDiv) => {
  return parentDiv.querySelectorAll(
    `div[${Selector.DATA_ATTRIB_NESTED_SCOPE}]`)
};

const getDivForScope = (key) => {
  return document.querySelector(`div[${Selector.DATA_ATTRIB_SCOPE}="${key}"]`);
};

/**
 * Show/hide the children of the parentDiv, based on the value of the select
 * element. This method causes a change event to be dispatched as soon as it is
 * called forcing the UI to show/hide what is currently selected.
 */
const attachNestedDivVisibilityHandler = () => {
  const parentDiv = getParentOfNestedDivs();
  const selectElement = parentDiv.querySelector('select');
  selectElement.addEventListener(
    'change',
    () => {
      const parentDiv = getParentOfNestedDivs();
      const nestedDivs = getAllNestedDivs(parentDiv);
      nestedDivs.forEach((div) => div.style.display = 'none');
      getSelectedNestedDiv(parentDiv).style.display = 'block';
      // console.log('nested div visibility changed');
    }
  );
  fireChangeEventOnSelectElement(selectElement);
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
      pojos[Selector.DATA_ATTRIB_NESTED_SCOPE] = getSelectElement(div).value;
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
    
    if (type === 'checkbox') {
      value = userInput.checked;
    } else {
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
  const attachListenersToUiForScope = (div) => {
    const elements = div.querySelectorAll('input, select');
    for (const element of elements) {
      element.addEventListener('change', generatePojosFromUi);
    }
  };
  
  getAllTopLevelContainerDivs()
    .forEach((div) => attachListenersToUiForScope(div));
};

/**
 * Given the pojos, apply the key-value pairs to the DOM, so that it reflects
 * what is in the pojos. The assumption is that the attachListenersToUi()
 * function has already been called before this function.
 */
const applyPojosToUi = (pojos) => {
  const applyToUi = (divForScope, pojo) => {
    Object.keys(pojo)
          .forEach((key) => {
            const element = divForScope.querySelector(
              `input[name="${key}"], select[name="${key}"]`);
            if (element !== null) {
              const value = pojo[key];
              const type = element.type;
        
              if (type === 'checkbox') {
                element.checked = value;
              } else {
                element.value = value;
              }
        
              // console.log('scope:', getScopeName(divForScope),
              //             '\nkey:', key,
              //             '\nelement:', element,
              //             '\ntype:', type,
              //             '\nvalue:', value);
            }
          });
  };
  
  Object.keys(pojos)
        .forEach((key) => {
          const div = getDivForScope(key);
          switch (key) {
            case Selector.DATA_ATTRIB_NESTED_SCOPE:
              // Ignore this, since it is used only to store the value of the dropdown.
              break;
            case Selector.NESTED_SCOPE_NAME:
              const savedSelectValue = pojos[Selector.DATA_ATTRIB_NESTED_SCOPE];
              const selectElement = getSelectElement(div);
              setValueOnSelectElement(selectElement, savedSelectValue);
              applyToUi(getSelectedNestedDiv(div), pojos[key]);
              break;
            default:
              applyToUi(div, pojos[key]);
              break;
          }
        });
  
  // Since change events didn't get fired for each value that was set above,
  // call this.
  generatePojosFromUi();
  
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
          pojos['scope2'].latLng = "48.8894895,2.242825";
  
          pojos['data-dropdown'] = 'Dropdown2';
          pojos['scope3'].flag1 = true;
  
          applyPojosToUi(pojos);
        });