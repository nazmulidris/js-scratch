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

const mainRange = () => {
  testRange();
};

const testRange = () => {
  const r1 = new Range(
      Time.createFromString('0700'),
      Time.createFromString('2000')
  );
  const r2 = new Range(
      Time.createFromString('1100'),
      Time.createFromString('1400')
  );
  const r3 = new Range(
      Time.createFromString('1700'),
      Time.createFromString('2100')
  );

  console.log('r1', r1);
  console.log('r2', r2);
  console.log('r3', r3);

  console.log('f 0600 is in r1: ', r1.isInRange(Time.createFromString('0600')));
  console.log('t 1100 is in r2: ', r2.isInRange(Time.createFromString('1100')));
  console.log('f 1400 is in r2: ', r2.isInRange(Time.createFromString('1400')));
  console.log('t 1200 is in r2: ', r2.isInRange(Time.createFromString('1200')));
};

/**
 * Contains a start time and an end time. Allows checking whether a given
 * time falls in this range. It falls in this range if both:
 * 1) given time >= start time.
 * 2) given time < endTime.
 */
class Range {
  /**
   * @param {Time} startTime
   * @param {Time} endTime
   */
  constructor(startTime, endTime) {
    /**
     * @type {Time}
     */
    this.startTime = startTime;
    /**
     * @type {Time}
     */
    this.endTime = endTime;
  }

  /**
   * @param {Time} givenTime
   * @return {boolean}
   */
  isInRange(givenTime) {
    return givenTime.compare(this.startTime) >= 0 &&
           givenTime.compare(this.endTime) < 0;
  }
}

mainRange();
