import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import userReducer from '../reducers/user'
import cartReducer from '../reducers/cart'

import thunk from 'redux-thunk'
import bookReducer from '../reducers/book'
// __REDUX_DEVTOOLS_EXTENSION_COMPOSE__ is the compose function from the extension
// if we have the extension installed, we have to use it otherwise we lose
// the extension functionality (the redux devTools)
const composeFunctionThatAlwaysWorks =
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

// this app has to share a cart array
// now let's also introduce a "user login" feature

// redux-thunk is a middleware that we're going to inject into the redux flow
// it will allow us to interact with async actions inside the redux ecosystem
// it's especially helpful to delay the dispatching of an action or waiting
// for the fulfilling of a Promise before dispatching an action

// we still want the devTools to work, but we also want to inject the thunk
// middleware... the problem is we have just one spot (the third argument of createStore())

export const initialState = {
  cart: {
    products: [
      // this should be filled with book objects
    ],
  },
  user: {
    name: '',
  },
  book: {
    stock: [
      // this should be filled with book objects
      // this time from a Promise, an async operation
    ],
    selected: null,
    isError: false,
    isLoading: true,
  },
}

const bigReducer = combineReducers({
  cart: cartReducer,
  user: userReducer,
  book: bookReducer,
})
// each key of the object you provide to combineReducers has to
// match a sub-object key of your redux store!

const configureStore = createStore(
  // 1) the main reducer of the application (or the only one)
  bigReducer,
  // 2) the initial state for your redux store
  initialState,
  // 3) an enhancer function, for extensions or middlewares
  composeFunctionThatAlwaysWorks(applyMiddleware(thunk))
)

export default configureStore
