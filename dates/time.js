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

const mainTime = () => {
  testTime();
};

const testTime = () => {
  // Machine's timezone (converted to UTC).
  {
    const date = new Date();
    const minutes = (date.getUTCDay() * 24 * 60) +
        (date.getUTCHours() * 60) +
        date.getUTCMinutes();

    const timeNow = TimeOfWeek.createFromRequestedTime(date);
    console.log(timeNow);
    console.assert(
        timeNow.timeInMinutes === minutes,
        'failed to handle local time to UTC'
    );
  }

  // Pacific TimeOfWeek (Mountain View).
  {
    const testData = {
      openingHoursTime: {day: 0, time: '1205'},
      utcOffset: -420,
    };
    const time = TimeOfWeek.createFromOpeningHoursTime(
        testData.openingHoursTime,
        testData.utcOffset
    );
    console.log(time);
    console.assert(
        time.timeInMinutes === 1145,
        'failed to handle utcOffset -420'
    );
  }

  // Sydney TimeOfWeek (UNDER FLOW).
  {
    const testData = {
      openingHoursTime: {day: 0, time: '0610'},
      utcOffset: 600,
    };
    const time = TimeOfWeek.createFromOpeningHoursTime(
        testData.openingHoursTime,
        testData.utcOffset
    );
    console.log(time);
    console.assert(
        time.timeInMinutes === 9850,
        'failed to handle utcOffset 600'
    );
  }

  // Pacific TimeOfWeek (OVER FLOW).
  {
    const testData = {
      openingHoursTime: {day: 6, time: '2310'},
      utcOffset: -420,
    };
    const time = TimeOfWeek.createFromOpeningHoursTime(
        testData.openingHoursTime,
        testData.utcOffset
    );
    console.log(time);
    console.assert(
        time.timeInMinutes === 370,
        'failed to handle utcOffset -420'
    );
  }
};

/**
 * TimeOfWeek is represented by 3 things:
 * 1) day of week
 * 2) hours
 * 3) minutes.
 *
 * Based on these 3 things, the number of minutes are calculated that represent
 * this time on a scale that can have only 7 days. So the minimum is 0
 * minutes, and maximum is 10080 minutes (7d x 24h x 60m).
 *
 * This class allows other time objects to be compared to it.
 *
 * The static factory methods convert the given Date or OpeningHoursTime +
 * utcOffset into UTC time and then convert them into minutes that fit on this
 * scale (from 0 to 10080).
 */
class TimeOfWeek {
  /**
   * Note `utc_offset` is in minutes and is used to convert UTC time to local
   * time. That is, UTC time + utc_offset = local time.
   *
   * Given local time and utc_offset, UTC time = local time - utc_offset.
   *
   * From the docs:
   * The offset from UTC of the Place’s current timezone, in minutes. For
   * example, Sydney, Australia in daylight savings is 11 hours ahead of
   * UTC, so the <code>utc_offset</code> will be <code>660</code>. For
   * timezones behind UTC, the offset is negative. For example, the </code>
   * is <code>-60</code> for Cape Verde.
   *
   * @param {Object} openingHoursTime Open or close openingHoursTime contains
   *     day (number) and time (string) properties.
   * @param {number} utcOffset
   * @return {TimeOfWeek}
   */
  static createFromOpeningHoursTime(openingHoursTime, utcOffset) {
    /** @type {number} */
    const day = openingHoursTime.day;
    /** @type {string} */
    const timeString = openingHoursTime.time;

    const hours = parseInt(timeString.substring(0, 2), 10);
    const minutes = parseInt(timeString.substring(2, 4), 10);

    let utcTimeInMinutes = (day * 24 * 60) + (hours * 60) + minutes - utcOffset;

    if (utcTimeInMinutes < this.getMinTime()) {
      utcTimeInMinutes = this.getMaxTime() - Math.abs(utcTimeInMinutes);
    } else if (utcTimeInMinutes > this.getMaxTime()) {
      utcTimeInMinutes = (utcTimeInMinutes - this.getMaxTime());
    }

    return new TimeOfWeek(utcTimeInMinutes);
  }

  /**
   * @return {number}
   */
  static getMaxTime() {
    return 10080;
  }

  /**
   * @return {number}
   */
  static getMinTime() {
    return 0;
  }

  /**
   * @param {Date} date
   * @return {TimeOfWeek}
   */
  static createFromRequestedTime(date = new Date()) {
    const utcDay = date.getUTCDay();
    const utcHours = date.getUTCHours();
    const utcMinutes = date.getUTCMinutes();
    return new TimeOfWeek((utcDay * 24 * 60) + (utcHours * 60) + utcMinutes);
  }

  /**
   * @param {number} timeInMinutes
   */
  constructor(timeInMinutes) {
    /**
     * @type {number}
     */
    this.timeInMinutes = timeInMinutes;
  }

  /**
   * Compares the given time in to the `this.timeInMinutes` and returns:
   * 1) 0 if equal,
   * 2) -1 if it's less,
   * 3) +1 if it's greater.
   *
   * @param {TimeOfWeek} time
   * @return {number}
   */
  compare(time) {
    const timeInMinutes = time.timeInMinutes;
    if (this.timeInMinutes === timeInMinutes) {
      return 0;
    } else if (this.timeInMinutes < timeInMinutes) {
      return -1;
    } else {
      return +1;
    }
  }
}

mainTime();
