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

// Class definitions.
class TodoList {
  /**
   * @param {string} name
   * @param {Array<TodoItem>} items
   */
  constructor(name, items) {
    this.name = name;
    this.items = items;
  }
}

class TodoItem {
  /**
   * @param {string} content
   */
  constructor(content) {
    this.content = content;
    this.done = false;
    this.deadline_ = null;
  }

  // Computed Property: deadline.
  /**
   * @returns {Date}
   */
  get deadline() {
    return this.deadline_;
  }

  /**
   * Throws exception if value is not a string, that is not empty.
   * @param {string} value
   */
  set deadline(value) {
    if (!value || typeof value !== "string" || value.trim() === "") {
      throw new Error("deadline must be a non null, non empty, string");
    }
    const date = new Date(value);
    if (isNaN(date.getTime())) {
      throw new Error("deadline must be a valid date string");
    }
    this.deadline_ = date;
  }
}

// Test the code.
const main = () => {
  // Test constructor for TodoItem.
  {
    o1 = new TodoItem("buy milk");
    o1.deadline_ = new Date("Apr 12 2838");

    o2 = new TodoItem("get gas");
    o2.deadline = "May 14 2019";
    o2.done = true;

    console.log(o1);
    console.log(o2);
  }

  // Test constructor for TodoList.
  {
    const todoList = new TodoList("chores", [o1, o2]);
    console.log(todoList);
  }
};

let o1, o2;

main();
