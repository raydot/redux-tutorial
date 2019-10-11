import { createStore } from "redux";

/**
 * This is a reducer, a pure function with (state, action) =>
 * state signature.  It describes how an action transforms
 * the state into the next state.
 *
 * State can be a primitive, array, object, or even
 * an Immutable.js data structure.  The only important
 * thing is not to mutate the state object, but to return
 * a new object if state changes.
 */

function counter(state = 0, action) {
  switch (action.type) {
    case "INCREMENT":
      return state + 1;
    case "DECREMENT":
      return state - 1;
    default:
      return state;
  }
}

// Create a Redux store holding the app state.
// The API is { subscribe, dispatch, getState }
let store = createStore(counter);

// Subscribe() to update the UI in response to state changes.
// This would normally be done via redux instead of
// directly.  It can also be handy to persist the current
// state in localStorage.

store.subscribe(() => console.log(store.getState()));

// The only way to mutate the internal state is to dispatch
// an action.  The actions can be serialized, logged, or
// stored and later replayed.

store.dispatch({ type: "INCREMENT" });

store.dispatch({ type: "INCREMENT" });

store.dispatch({ type: "INCREMENT" });

store.dispatch({ type: "DECREMENT" });

store.dispatch({ type: "INCREMENT" });
