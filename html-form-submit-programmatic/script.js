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

function processForm(day, month, year, length, size, tour, own_bike) {
  
  console.log('day:', day.value);
  console.log('month:', month.value);
  console.log('year:', year.value);
  console.log('length:', length.value);
  console.log('size:', size.value);
  console.log('tour:', tour.value);
  
  console.log('own_bike:', own_bike);
  console.log('own_bike.checked:', own_bike.checked);
  console.log('own_bike.value:', own_bike.value);
  
  // Don't reload the page.
  return false;
}