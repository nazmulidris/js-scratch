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
  // End time ends up being earlier (less) than start time (due to utc offset).
  {
    const data = [{
      'close': {
        'day': 6,
        'time': '2200',
      },
      'open': {
        'day': 6,
        'time': '1200',
      },
    }];
    const ranges = Range.createRangesFrom(data, -420);
    console.assert(ranges.length === 2,
        'failed to split ranges that spill over TimeOfWeek.MAX boundary');
  }

  // Spanning 3days.
  {
    const data = {
      open: {day: 0, time: '0805'},
      close: {day: 2, time: '1330'},
      utcOffset: -420,
    };
    const range = new Range(
        TimeOfWeek.createFromOpeningHoursTime(data.open, data.utcOffset),
        TimeOfWeek.createFromOpeningHoursTime(data.close, data.utcOffset));
    console.assert(range.startTime.timeInMinutes === 905,
        'problem w/ range start time');
    console.assert(range.endTime.timeInMinutes === 4110,
        'problem w/ range start time');
    console.log('Range spanning 3 days', range);

    // Monday @ 2.25pm, should be in range.
    {
      const time = TimeOfWeek.createFromRequestedTime(
          // June 17 2019 2:25 pm PDT
          new Date('17 June 2019 14:25 PDT'));
      console.assert(range.isInRange(time),
          `${time} should be in the range!`);
    }

    // Thursday @ 2.25pm, should not be in range.
    {
      const time = TimeOfWeek.createFromRequestedTime(
          // June 20 2019 2:25 pm
          new Date('20 June 2019 14:25 PDT'));
      console.assert(!range.isInRange(time),
          `${time} should not be in the range!`);
    }
  }
};

/**
 * Contains a start time and an end time. Allows checking whether a given
 * time falls in this range. It falls in this range if both:
 * 1) given time >= start time.
 * 2) given time < endTime.
 */
class Range {
  /**
   * @param {Array<Object>} periods
   * @param {number} utcOffset
   * @return {Array<Range>}
   */
  static createRangesFrom(periods, utcOffset) {
    /** @type{Array<Range>} */
    const timeRanges = [];
    periods.forEach((period) => {
      const {open, close} = period;
      const range = new Range(
          TimeOfWeek.createFromOpeningHoursTime(open, utcOffset),
          TimeOfWeek.createFromOpeningHoursTime(close, utcOffset)
      );

      // startTime (2) > endTime (1) ||
      // endTime (1) < startTime (2)
      if (range.endTime.compare(range.startTime) < 0) {
        const range1 = new Range(
            range.startTime,
            new TimeOfWeek(TimeOfWeek.getMaxTime()));
        const range2 = new Range(
            new TimeOfWeek(TimeOfWeek.getMinTime()),
            range.endTime);
        timeRanges.push(range1);
        timeRanges.push(range2);
      } else {
        timeRanges.push(range);
      }
    });

    return timeRanges;
  }

  /**
   * @param {TimeOfWeek} startTime
   * @param {TimeOfWeek} endTime
   */
  constructor(startTime, endTime) {
    /**
     * @type {TimeOfWeek}
     */
    this.startTime = startTime;
    /**
     * @type {TimeOfWeek}
     */
    this.endTime = endTime;
  }

  /**
   * @param {TimeOfWeek} givenTime
   * @return {boolean}
   */
  isInRange(givenTime) {
    return givenTime.compare(this.startTime) >= 0 &&
           givenTime.compare(this.endTime) < 0;
  }
}

mainRange();
