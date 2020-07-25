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

const delayMs                         = 500;
let animationIndex                    = 0;
const firstSequenceOfStringsToDisplay = [
  'I',
  'I am',
  'I am a',
  'I am a product',
  'I am a product designer',
  'who',
  'who codes',
];

const draw = () => {
  const stringToDisplay = firstSequenceOfStringsToDisplay[animationIndex];
  const container1      = document.querySelector('#container1');
  container1.innerHTML  = `<p>${stringToDisplay}</p>`;
};

const animate = (timer) => {
  if (animationIndex === firstSequenceOfStringsToDisplay.length - 1) {
    clearInterval(timer);
    return;
  }
  animationIndex++;
  draw();
};

const main = () => {
  const timer = setInterval(() => animate(timer), delayMs);
};

main();
