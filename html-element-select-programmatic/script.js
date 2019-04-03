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

// Helper methods.
const getElement = (selector) => document.querySelector(selector);

const Selector = {
  'ice-cream-select': 'select[name=ice_cream]',
  'result-div': '.result',
};

// Add change event listener to the select element.
getElement(Selector['ice-cream-select']).addEventListener(
    'change',
    (event) => {
      const value = event.target.value;
      getElement(Selector['result-div']).textContent = `You like ${value}`;
    });

/**
 * Programmatically change the option that's selected in the HTML select
 * element. Also fires a `change` event on the select element.
 * @param selector The selector for the HTML select element.
 * @param optionValue Try and pick this option if it exists.
 */
const setSelectedIndexAndFireChangeEvent =
    (selector, optionValue) => {
      const selectElement = getElement(selector);
      for (let i = 0; i < selectElement.options.length; i++) {
        if (selectElement.options[i].value === optionValue) {
          selectElement.options[i].selected = true;
          selectElement.dispatchEvent(new Event('change'));
          return;
        }
      }
    };

// Change the default select value & fire change event.
setSelectedIndexAndFireChangeEvent(
    Selector['ice-cream-select'], 'sardine');
