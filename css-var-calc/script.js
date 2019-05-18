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

const main = () => {
  const rootElement = document.documentElement;
  rootElement.addEventListener(
      'keyup',
      keyUpListener('input', (eventTarget) => {
        switch (eventTarget.name) {
          case "font-family":
            rootElement.style.setProperty(
                '--page-font',
                eventTarget.value
            );
            break;
          case "font-size":
            rootElement.style.setProperty(
                '--page-font-size',
                eventTarget.value
            );
            break;
        }
      })
  );
};

/**
 * Generates an event listener that executes the block function when 'Enter' key
 * is pressed on the element for the selector.
 *
 * @param selector
 * @param block accepts an event target parameter
 * @returns {Function} accepts an event parameter
 */
const keyUpListener = (selector, block) => {
  return (event) => {
    const targetMatches = event.target.matches(selector);
    if (!targetMatches) return;
    if ((event.key === 'Enter')) {
      block(event.target);
    }
  }
};

main();
