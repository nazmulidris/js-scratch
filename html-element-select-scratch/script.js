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

const selectElement = document.querySelector('.ice-cream');

selectElement.addEventListener(
    'change',
    (event) => {
        const result = document.querySelector('.result');
        result.textContent = `You like ${event.target.value}`;
    });

/**
 * Programmatically change the option that's selected in the HTML select
 * element. Also fires a `change` event on the select element.
 * @param selectElementSelector The selector for the HTML select element.
 * @param optionValue Try and pick this option if it exists.
 */
const setSelectedIndexAndFireChangeEvent =
    (selectElementSelector, optionValue) => {
        const selectElement =
            document.querySelector(selectElementSelector);
        for (let i = 0; i < selectElement.options.length; i++) {
            if (selectElement.options[i].text === optionValue) {
                selectElement.options[i].selected = true;
                selectElement.dispatchEvent(new Event('change'));
                return;
            }
        }
    };

setSelectedIndexAndFireChangeEvent('sardine');
