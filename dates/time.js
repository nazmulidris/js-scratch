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
  const t1 = Time.createFromString('1000');
  const t2 = Time.createFromString('1200');
  console.log('t1: ', t1);
  console.log('t2: ', t2);
  console.log('0  t1 compare to t1: ', t1.compare(t1));
  console.log('-1 t1 compare to t2: ', t1.compare(t2));
  console.log('1  t2 compare to t1: ', t2.compare(t1));
  console.log(
      '-1 t1 compare to 1700',
      t1.compare(Time.createFromString('1700'))
  );
  console.log(
      '1  t1 compare to 0000',
      t1.compare(Time.createFromString('0000'))
  );
  console.log(
      '-1 t1 compare to 1159',
      t1.compare(Time.createFromString('1159'))
  );
  console.log(
      '-1 t1 compare to 2359',
      t1.compare(Time.createFromString('2359'))
  );
  const now = Time.createFromDate();
  console.log('now: ', now);
  console.log('1  t1 compare to now', t1.compare(now));
};

/**
 * Simple wrapper for a time expressed in "hhmm". Allows other times to be
 * compared to it.
 */
class Time {
  /**
   * @param {string} timeString Formatted as "hhmm".
   * @return {Time}
   */
  static createFromString(timeString) {
    const hours = parseInt(timeString.substring(0, 2), 10);
    const minutes = parseInt(timeString.substring(2, 4), 10);
    return new Time(hours, minutes);
  }

  /**
   * @param {Date=} date If this isn't passed, it creates a new Date().
   * @return {Time}
   */
  static createFromDate(date = null) {
    if (!date) {
      date = new Date();
    }
    return new Time(date.getHours(), date.getMinutes());
  }

  /**
   * @param {number} hours
   * @param {number} minutes
   */
  constructor(hours, minutes) {
    /**
     * @type {number}
     */
    this.hours = hours;
    /**
     * @type {number}
     */
    this.minutes = minutes;
    /**
     * @type {number}
     */
    this.timeInMinutes =
        this.hours * 60 + this.minutes;
  }

  /**
   * @param {Time} time
   * @return {number}
   */
  compare(time) {
    return this.compare_(
        time.hours,
        time.minutes
    );
  }

  /**
   * Compares the given time in `hours` and `minutes` to the
   * `this.timeInMinutes` and returns 0 if equal, -1 if it's less, and +1 if
   * it's greater.
   * @param {number} hours
   * @param {number} minutes
   * @return {number}
   * @private
   */
  compare_(hours, minutes) {
    const timeInMinutes = hours * 60 + minutes;
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
