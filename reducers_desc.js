// Reducers

/*
  Reducers specify how the application's state changes in response to actions sent
  to the store.  Remember that actions only describe what happened, but don't describe
  how the application's state changes.
*/

// Designing the state shape

/*
  In Redux, all the spplication state is stored as a single object/. It's a good idea to think
  of its shape before writing any code.  What's the minimal representation of your app's state
  as an object?

  For our todo app, we want to store two different things:

    * The currently selected visibility filter.
    * The actual list of todos

  You'll often find that you need to store some data, as well as some UI state, in the state tree.
  This is fine, but try to keep the data separate from the UI state
*/

{
  visibilityFilter: 'SHOW_ALL',
  todos: [
    {
      text: 'Consider using Redux',
      completed: true
    },
    {
      text: 'Keep all the state in a single tree',
      completed: false
    }
  ]
}

/*
  Note on Relationships:
  In a more complex app, you're going to want different entities to reference each other.  
  You should keep your state as normalized as possible, without any nesting.  Keep every
  entity in an object stored with an ID as a key, and use IDs to reference it from other 
  entities, or lists.  Think of the app's state as a database.  For example, keeping 
  todosById: { id -> todo } and todos: array<id> inside the state would be a good idea.
  This approach is described at https://github.com/paularmstrong/normalizr in detail.
*/

// Handling Actions

/*
  Now that we've decide what our state object looks like, we're ready to write a reducer for it.
  The reducer is a pure function that takes the previous state and an action, and returns the 
  next state.
*/

(previousState, action) => newState

/*
  Is called a reducer because it's the type of function you would pass to 
  Array.prototype.reduce(reducer,?initialValue). 
  https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce

  It's very important that the reducer stays pure.  Things you should *never* do inside
  a reducer:

    * Mutate its arguments
    * Performe side effects like API calls and routing transitions
    * Call non-pure functions like Data.now() or Math.random()

  Given the same arguments, the reducer should calculate the next state and return it.  
  No surprises, no side effects.

  Let's teach a reducer to understand the actions we defined earlier.  We'll start by 
  specifying the initial state.  Redux will call our reducer with an undefined state for
  the first time.  This is our chance to return the initial state of our app.
*/

import { VisibilityFilters } from './actions'

const initialState = {
  visibilityFilter: VisibilityFilters.SHOW_ALL,
  todos: []
}

function todoApp(state, action) {
  if (typeof state === 'undefined') {
    return inititalState
  }

  // For now, don't handle any actions and just return the state given to us.
  return state
}

// You can use the ES6 default arguments syntax to write this in a more compact way:

function todoApp(state = initialState, action) {
  // For now, don't handle any actions and just return the state given to us
  return state
}

// Now let's handle SET_VISIBILITY_FILTER.  All it needs to do is change visibilityFilter
// on the state:

function todoApp(state = initialState, action) {
  switch(action.type) {
    case SET_VISIBILITY_FILTER:
    return Object.assign({}, state, {
      visibilityFilter: action.filter
    })
    default:
      return state
  }
}

/*
    Note that:

    1.  We don't mutate the state.  We create a copy with Object.assign().
        Object.assign(state, {visibilityFilter: action.filter}) is wrong as it
        will mutate the first arcument.  You *must* supply an empty object as the 
        first parameter.  You can also enable the object spread operator to write
        { ...state, ...newState } instead.

    2.  We return the previous state in the default case.  It's important to return
        the previous state for any unknown action.

      More on Object.assign()
      https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign

      Remember that Object.assign() is a part of ES6 and is not supported by older browsers.
      To support then you will need a polyfill (Babel) or a helper (.assign())
*/

// Handling More Actions

/*
    We have two more actions to handle.  Just like we did with SET_VISIBILITY_FILTER, we'll
    import the ADD_TODO and TOGGLE_TODO actions and then extend our reducer to handle 
    ADD_TODO
*/

import {
  ADD_TODO,
  TOGGLE_TODO,
  SET_VISIBILITY_FILTER,
  VisibilityFilters
} from './actions'

...

function todoApp(state = initialState, action) {
  switch (action.type) {
    case SET_VISIBILITY_FILTER:
      return Object.assign({}, state, {
        visibilityFilter: action.filter
      })
    case ADD_TODO:
      return Object.assign({}, state, {
        todos: [
          ...state.todos,
          {
            text: action.text,
            completed: false
          }
        ]
      })
      default:
        return state
  }
}

/*
    Just like before, we never write directly to state or its fields, and instead we return
    new objects.  The new todos is equal to the old todos concatenated with a single new
    item at the end.  The fresh todo was constructed using the data from the action.

    The implementation of the TOGGLE_TODO handler shouldn't come as a complete surprise:
*/

case TOGGLE_TODO:
return Object.assign({}, state, {
  todos: state.todos.map((todo, index) => {
    if (index === action.index) {
      return Object.assign({}, todo, {
        completed: !todo.completed
      })
    }
    return todo
  })
})

/*
    Because we want to update a specific item in the array without resorting to mutations,
    we have to create a new array with the same items except the item at the index.  If you
    find yourself often writing such operations, it's a good idea to use a helper like 
    immutability-helper, updeep, or even a library like Immutable that has native support
    for deep updates.  Just remember to never assign to anything inside the state unless you 
    clone it first.
*/

// Splitting Reducers
// All of the code so far:
function todoApp(state = initialState, action) {
  switch (action.type) {
    case SET_VISIBILITY_FILTER:
      return Object.assign({}, state. {
        visibilityFilter: action.filter
      })
    case ADD_TODO:
      return Object.assign({}, state, {
        todos: [
          ...state.todos,
          {
            test: action.text,
            completed: false
          }
        ]
      })
    case TOGGLE_TODO:
      return Object.assign({}, state, {
        todos: state.todos.map((todo, index) => {
          if (index === action.index) {
            return Object.assign({}, todo, {
              completed: !todo.completed
            })
          } // if
            return todo
        })
      })
    default:
      return state
  }
}

// Rather verbose!  Is there a way to make it easier to comprehend?  Seems like todos and 
// visibilityFilter are updated completely independently.  Sometimes state fields depend
// on one another and more consideration is required, but in our case we can easily split
// updating todos into a separate function:

// Here is that function:
function todos(state = [], action) {
  switch (action.type) {
    case ADD_TODO:
      return Object.assign({}, state, {
        todos: [
          ...state.todos,
          {
            test: action.text,
            completed: false
          }
        ]
      })
    case TOGGLE_TODO:
      return Object.assign({}, state, {
        todos: state.todos.map((todo, index) => {
          if (index === action.index) {
            return Object.assign({}, todo, {
              completed: !todo.completed
            })
          } // if
            return todo
        })
      })
    default:
      return state
  } // switch
} // function

function todoApp(state = initialState, action) {
  switch (action.type) {
    case SET_VISIBILITY_FILTER:
      return Object.assign({}, state, {
        visibilityFilter: action.filter
      })
    case ADD_TODO:
      return Object.assign({}, state, {
        todos: todos(state.todos, action)
      })
    case TOGGLE_TODO:
      return Object.assign({}, state, {
        todos: todos(state.todos, action)
      })
    default:
      return state
  }
}

/*
  Note that todos also accepts state -- but now state is an array!  Now todoApp() gives todos() just a slice of the state to manage, and todos knows just how to update that slice.  This is called 
  * reducer composition*, and it's the fundamental pattern of building Reedux apps.

  Can we also extract a reducer managing just visibilityFilter?  Yes, with ES6 Object Destructuring:
  https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment
*/


