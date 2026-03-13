/**
 * 🍛 Highway Dhaba Rating System - Higher-Order Functions
 *
 * Highway pe dhabas ki rating system bana raha hai. Higher-order functions
 * (HOF) use karne hain — aise functions jo doosre functions ko parameter
 * mein lete hain YA return karte hain.
 *
 * Functions:
 *
 *   1. createFilter(field, operator, value)
 *      - Returns a FUNCTION that filters objects
 *      - Operators: ">", "<", ">=", "<=", "==="
 *      - e.g., createFilter("rating", ">=", 4) returns a function that
 *        takes an object and returns true if object.rating >= 4
 *      - Unknown operator => return function that always returns false
 *
 *   2. createSorter(field, order = "asc")
 *      - Returns a COMPARATOR function for Array.sort()
 *      - order "asc" => ascending, "desc" => descending
 *      - Works with both numbers and strings
 *
 *   3. createMapper(fields)
 *      - fields: array of field names, e.g., ["name", "rating"]
 *      - Returns a function that takes an object and returns a new object
 *        with ONLY the specified fields
 *      - e.g., createMapper(["name"])({name: "Dhaba", rating: 4}) => {name: "Dhaba"}
 *
 *   4. applyOperations(data, ...operations)
 *      - data: array of objects
 *      - operations: any number of functions to apply SEQUENTIALLY
 *      - Each operation takes an array and returns an array
 *      - Apply first operation to data, then second to result, etc.
 *      - Return final result
 *      - Agar data not array, return []
 *
 * Hint: HOF = functions that take functions as arguments or return functions.
 *   createFilter returns a function. applyOperations takes functions as args.
 *
 * @example
 *   const highRated = createFilter("rating", ">=", 4);
 *   highRated({ name: "Punjab Dhaba", rating: 4.5 }) // => true
 *
 *   const byRating = createSorter("rating", "desc");
 *   [{ rating: 3 }, { rating: 5 }].sort(byRating)
 *   // => [{ rating: 5 }, { rating: 3 }]
 */
export function createFilter(field, operator, value) {
  // Your code here
  return function (obj) {
    if (operator === ">") return obj[field] > value;
    if (operator === "<") return obj[field] < value;
    if (operator === ">=") return obj[field] >= value;
    if (operator === "<=") return obj[field] <= value;
    if (operator === "===") return obj[field] === value;

    return false;
  };
}


export function createSorter(field, order = "asc") {
  // Your code here
  return function (a, b) {
    let valA = a[field];
    let valB = b[field];

    if (order === "asc") {
      if (valA < valB) return -1;
      if (valA > valB) return 1;
      return 0;
    } else {
      if (valA > valB) return -1;
      if (valA < valB) return 1;
      return 0;
    }
  };
}


export function createMapper(fields) {
  // Your code here
  return function (obj) {
    let newObj = {};
    for (let f of fields) {
      if (obj.hasOwnProperty(f)) {
        newObj[f] = obj[f];
      }
    }
    return newObj;
  };
}


export function applyOperations(data, ...operations) {
  // Your code here
  if (!Array.isArray(data)) {
    return [];
  }

  let result = data;

  for (let op of operations) {
    if (typeof op === "function") {
      result = op(result);
    }
  }

  return result;
}
