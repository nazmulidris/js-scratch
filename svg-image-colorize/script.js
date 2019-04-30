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

const originalSvgImage = 'data:image/svg+xml,%3Csvg%20viewBox%3D%220%200%2064%2064%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Ccircle%20fill%3D%22%23228B22%22%20cx%3D%2232%22%20cy%3D%2232%22%20r%3D%2232%22%2F%3E%3Cpath%20d%3D%22M34.2992755%2034.529018h.0924391S35.61272%2047.683762%2036.6016422%2048.9341519C37.5905644%2050.1845419%2042.4300894%2052.9568075%2042.4300894%2052.9568075H31.8703095v-.0078125H21.363158S26.202683%2050.1767294%2027.1916052%2048.9263394C28.1805274%2047.6759495%2029.4015328%2034.5212055%2029.4015328%2034.5212055H29.4308566C28.4539247%2033.7909594%2027.8226905%2032.6328378%2027.8226905%2031.329018c0-2.2091390000000004%201.812180699999999-4%204.047619000000001-4S35.9179286%2029.119879%2035.9179286%2031.329018C35.9179286%2032.6374972%2035.2821746%2033.799235%2034.2992755%2034.529018zM39.1037307%22%20fill%3D%22%23FFF%22%2F%3E%3C%2Fg%3E%3C%2Fsvg%3E';

/**
 * Note: to remove glyph, simply set bgColor to transparent hex color.
 * Note: throw exceptions if colors aren't what is expected.
 *
 * @param {string} svg
 * @param {string} fgColor ex: 'EEE', or '#EEE'
 * @param {string} bgColor ex: 'ABC', or '#ABC'
 * @return {string}
 */
const processImage = (svg, fgColor, bgColor) => {
  const pattern = /fill%3D%22%23(?<hex>[A-Fa-f0-9]{3,6})%22/g;
  const allColors = new Set(
      Array.from(svg.matchAll(pattern)).map(
          ({groups}) => {
            console.log(groups);
            return groups.hex;
          }));
  console.log(allColors);

  // Validation.
  if (allColors.length < 2) {
    throw new Error(
        'image is expected to have at least 2 colors');
  }
  if (!allColors.has('FFF')) {
    throw new Error(
        'image is expected to have at least fg color FFF');
  }

  // Extract set of background colors.
  const bgColors = new Set(allColors);
  bgColors.delete('FFF');
  console.log(bgColors);

  // Normalize color inputs.
  let foregroundColor, backgroundColor;
  if (fgColor) {
    foregroundColor = fgColor;
    if (!fgColor.startsWith('#')) {
      foregroundColor = '#' + fgColor;
    }
  }
  if (bgColor) {
    backgroundColor = bgColor;
    if (!bgColor.startsWith('#')) {
      backgroundColor = '#' + bgColor;
    }
  }

  let decodedSvg = decodeURIComponent(svg.split(',')[1]);

  // Process fgColor.
  if (foregroundColor) {
    decodedSvg = decodedSvg.replace('#FFF', foregroundColor);
  }

  // Process bgColor.
  if (backgroundColor) {
    for (const color of bgColors) {
      decodedSvg = decodedSvg.replace('#' + color, backgroundColor);
    }
  }

  return 'data:image/svg+xml,' + encodeURIComponent(decodedSvg);
};

document.getElementById('icon1').src = originalSvgImage;
document.getElementById('icon2').src =
    processImage(originalSvgImage, '#8B0000', undefined);
document.getElementById('icon3').src =
    processImage(originalSvgImage, undefined, '#74DBFF');
document.getElementById('icon3').src =
    processImage(originalSvgImage, undefined, '#74DBFF');
document.getElementById('icon4').src =
    processImage(originalSvgImage, '#8B0000', '#74DBFF');
document.getElementById('icon5').src =
    processImage(originalSvgImage, '#00000000', undefined);
