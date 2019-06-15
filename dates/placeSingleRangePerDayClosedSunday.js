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

const placeSingleRangePerDayClosedSunday =
{
  'utc_offset': -420,
  'open_now': true,
  'periods': [
    {
      'close': {
        'day': 1,
        'time': '2200',
      },
      'open': {
        'day': 1,
        'time': '0730',
      },
    },
    {
      'close': {
        'day': 2,
        'time': '2200',
      },
      'open': {
        'day': 2,
        'time': '0730',
      },
    },
    {
      'close': {
        'day': 3,
        'time': '2200',
      },
      'open': {
        'day': 3,
        'time': '0730',
      },
    },
    {
      'close': {
        'day': 4,
        'time': '2200',
      },
      'open': {
        'day': 4,
        'time': '0730',
      },
    },
    {
      'close': {
        'day': 5,
        'time': '2200',
      },
      'open': {
        'day': 5,
        'time': '0730',
      },
    },
    {
      'close': {
        'day': 6,
        'time': '2200',
      },
      'open': {
        'day': 6,
        'time': '1030',
      },
    },
  ],
  'weekday_text': [
    'Monday: 7:30 AM - 10:00 PM',
    'Tuesday: 7:30 AM - 10:00 PM',
    'Wednesday: 7:30 AM - 10:00 PM',
    'Thursday: 7:30 AM - 10:00 PM',
    'Friday: 7:30 AM - 10:00 PM',
    'Saturday: 10:30 AM - 10:00 PM',
    'Sunday: Closed',
  ],
};
