// ACTIONS
/*  Actions are payloads of information that send data from your application to your
    store.  They are the *only* source of information for the store.  You send them to
    the store using store.dispatch()
*/

// Here's an example action which represents adding a new todo item:
const ADD_TODO = 'ADD_TODO'

{
  type: ADD_TODO,
  text: 'Build my first Redux app'
}

/*
  Actions are plain JavaScript objects.  Actions must have a type property that indicates
  the type of action being performed.  Types should typically be defined as string constants.
  Once your app is large enough, you may want to move them into a separate module.
*/

import { ADD_TODO, REMOVE_TODO } from '../actionTypes'

/*
  You don't have to define action type constants in a separate file, or even define them
  at all.  For a small project, it might be easier to just use string literals for action
  types.  
*/

/*
  Other than type, the structire of an action object is really up to oyu.
  Let's add one more action type to describe a user ticking off a todo as
  completeted.  We refer to a particular todo by index because we store then in an array.
  In a real app, it is wiser to generate a unique ID every time something new is created.
*/

{
  type: TOGGLE_TODO,
  index: 5
}

/*
  It's a good idea to pass as little data in each action as possible.  For example, it's better
  to pass index than the whole todo object.

  Finally, we'll add one more action type for changing the currently visible todos.
*/

{
  type: SET_VISIBILITY_FILTER,
  filter: SHOW_COMPLETED
}

//ACTION CREATORS
/*
    Action creators are exactly that -- functions that create actions.  It's easy to conflate
    the terms "action" and "action creator," so do your best to use the proper term.

    In Redux, action creators simply return an action.  This makes them portable and easy to test.
*/
function addTodo(text) {
  return {
    type: ADD_TODO,
    text
  }
}

/*
  To actually initiate a dispatch, pass the result to the dispatch() function
*/

dispatch(addTodo(text))
dispatch(completeTodo(index))

/*
  Alternatively, you can create a bound action creator that automatically dispatches:
*/

const boundAddTodo = text => dispatch(addTodo(text))
const boundCompleteTodo = index => dispatch(completeTodo(index))

// Now you'll be able to call them directly:

boundAddTodo(text)
boundCompleteTodo(index)

/*
  The dispatch() function can be accessed directly from the store as store.dispatch(), but more 
  likely you'll access it using a helper like react-redux's connect().  You can use 
  bindActionCreators() to automatically bind many action creators to a dispatch() function.
*/

/*  
  Action creators can be asynchronous and have side-effects. 
*/
