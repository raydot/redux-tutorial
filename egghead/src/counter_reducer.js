var expect = require("expect");

// function counter(state, action) {
//   // if redux gets undefined by convention it should return what
//   // it considers to be the initial state of the application
//   if (typeof state === "undefined") {
//     return 0;
//   }

//   if (action.type === "INCREMENT") {
//     return state + 1;
//   } else if (action.type === "DECREMENT") {
//     return state - 1;
//   } else {
//     return state;
//   }
// }

// Now that we have all of the above working, time for a refactor that considers it all:
const counter = (state = 0, action) => {
  switch (action.type) {
    case "INCREMENT":
      return state + 1;
    case "DECREMENT":
      return state - 1;
    default:
      return state;
  }
};

// Business as usual
expect(counter(0, { type: "INCREMENT" })).toEqual(1);

expect(counter(1, { type: "INCREMENT" })).toEqual(2);

expect(counter(2, { type: "DECREMENT" })).toEqual(1);

expect(counter(1, { type: "DECREMENT" })).toEqual(0);

// What if we pass an unknown action?
expect(counter(1, { type: "NOT_A_REAL_ACTION" })).toEqual(1);

// What if we get undefined?
expect(counter(undefined, {})).toEqual(0);

console.log("Tests passed!");
