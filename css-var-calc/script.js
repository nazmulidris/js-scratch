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
  document.querySelector('#root')
          .addEventListener(
              'keyup', (event) => {
                const inputMatches = event.target.matches('input');
                if (!inputMatches) return;
                if (event.key === "Enter") {
                  const inputElement = event.target;
                  const rootElement = document.documentElement;
                  switch (inputElement.name) {
                    case "font-family":
                      rootElement.style.setProperty(
                          '--page-font',
                          inputElement.value
                      );
                      break;
                    case "font-size":
                      rootElement.style.setProperty(
                          '--page-font-size',
                          inputElement.value
                      );
                      break;
                  }
                }
              })
};

main();
