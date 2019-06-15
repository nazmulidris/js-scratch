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

const mainIndex = () => {
  console.log(
      't isOpen(placeMultipleRangesPerDay, July 4 2019 (Thr) 5p)',
      isOpen(
          placeMultipleRangesPerDay,
          new Date('July 4 2019 5:00 pm')
      )
  );

  console.log(
      'u isOpen(placeMissingUtcOffset, any date)',
      isOpen(
          placeMissingUtcOffset,
          new Date('July 4 2019 5:00 pm')
      )
  );

  console.log(
      't isOpen(placeOpenTwentyFourSeven, any date)',
      isOpen(
          placeOpenTwentyFourSeven,
          new Date('July 4 2019 5:00 pm')
      )
  );
};

/**
 * @param {Object} place Expected to contain `utc_offset` number, `periods`
 * array.
 * @param {Date=} date
 * @return {boolean|undefined}
 */
const isOpen = (place, date = new Date()) => {
  /** @type{Array<Object>} */
  const periods = place.periods;
  /** @type{number} */
  const utcOffset = place.utc_offset;

  if (!periods || !utcOffset) {
    return undefined;
  }

  if (periods.length === 0) {
    return false;
  }

  if (isAlwaysOpen(periods)) {
    return true;
  }

  // Other than always open and always closed case, period.getOpen() or
  // period.getClose() would never be null. See
  // https://developers.google.com/places/web-service/details#PlaceDetailsResults
  // opening_hours section for details.
  periods.forEach((period) => {
    if (!period.open || !period.close) {
      return undefined;
    }
  });

  const requestedTime = Time.createFromRequestedTime(date);

  /** @type{Array<Range>} */
  const timeRanges = Range.createRangesFrom(periods, utcOffset);
  return timeRanges.some(
      (range) => {
        return range.isInRange(requestedTime);
      });
};

/**
 * @param {Array<Object>} periods
 * @return {boolean}
 */
const isAlwaysOpen = (periods) => {
  return (
    periods.length === 1 &&
      !periods[0].hasOwnProperty('close') &&
      periods[0].hasOwnProperty('open') &&
      periods[0].open.day === 0 &&
      periods[0].open.time === '0000'
  );
};

mainIndex();
