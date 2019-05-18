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

const Selector = {
  DATA_SCOPE: 'data-scope',
  DATA_DROPDOWN: 'data-dropdown',
  DATA_SCOPE_WITH_NESTING: 'scope3',
};

const getAllTopLevelContainerDivs = () => {
  return document.querySelectorAll(
      `div[${Selector.DATA_SCOPE}]`);
};

const getScopeName = (div) => {
  return div.getAttribute(`${Selector.DATA_SCOPE}`);
};

const getParentOfNestedDivs = () => {
  for (const div of getAllTopLevelContainerDivs()) {
    if (getScopeName(div) === Selector.DATA_SCOPE_WITH_NESTING) {
      return div;
    }
  }
};

const setValueOnSelectElementAndFireChangeEvent = (selectElement, newValue) => {
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
  return parentDiv.querySelector(
      `div[${Selector.DATA_DROPDOWN}="${selectValue}"]`);
};

const getAllNestedDivs = (parentDiv) => {
  return parentDiv.querySelectorAll(
      `div[${Selector.DATA_DROPDOWN}]`)
};

const getDivForScope = (scopeName) => {
  return document.querySelector(`div[${Selector.DATA_SCOPE}="${scopeName}"]`);
};

/**
 * Show/hide the children of the parentDiv, based on the value of the select
 * element. This method causes a change event to be dispatched as soon as it is
 * called forcing the UI to show/hide what is currently selected.
 */
const handleNestedDivVisibility = () => {
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
 * Create 4 POJOs containing user input from the HTML, based on the containers
 * (divs w/ data-scope attributes 'scope1', 'scope2', 'scope3', and
 * Selector.DATA_DROPDOWN).
 */
const generatePojosFromUi = () => {
  const pojos = {};
  
  for (const div of getAllTopLevelContainerDivs()) {
    const scopeName = getScopeName(div);
    if (scopeName === Selector.DATA_SCOPE_WITH_NESTING) {
      pojos[Selector.DATA_DROPDOWN] = getSelectElement(div).value;
      const nestedDiv = getSelectedNestedDiv(div);
      pojos[scopeName] = getUserInputValuesForScope(nestedDiv);
    } else {
      pojos[scopeName] = getUserInputValuesForScope(div);
    }
  }
  
  console.log('pojos:', JSON.stringify(pojos, undefined, 2));
  return pojos;
};

/**
 * Returns an object containing key-value pairs for the input & select elements
 * contained in the given div.
 *
 * Input elements include:
 * - select element
 * - input (text, number, checkbox, etc) element
 *
 * @param div
 */
const getUserInputValuesForScope = (div) => {
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
 * what is in the pojos. It calls generatePojosFromUi() once its completed
 * updating the DOM.
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
            case Selector.DATA_DROPDOWN:
              // Ignore this, since it is used only to store the value of the
              // dropdown.
              break;
            case Selector.DATA_SCOPE_WITH_NESTING:
              const savedSelectValue = pojos[Selector.DATA_DROPDOWN];
              const selectElement = getSelectElement(div);
              setValueOnSelectElementAndFireChangeEvent(selectElement, savedSelectValue);
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
handleNestedDivVisibility();

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