// here we're going to create action creators

export const ADD_TO_CART = 'ADD_TO_CART'
export const REMOVE_FROM_CART = 'REMOVE_FROM_CART'
export const SET_USERNAME = 'SET_USERNAME'
export const GET_BOOKS = 'GET_BOOKS'
export const GET_BOOKS_ERROR = 'GET_BOOKS_ERROR'
export const GET_BOOKS_LOADING = 'GET_BOOKS_LOADING'
export const SET_SELECTED = 'SET_SELECTED'

export const addToCartAction = (book) => ({
  // what is an action? a JS object with at least a 'type' property
  type: ADD_TO_CART,
  // ok, but which is the book I just clicked on?
  payload: book,
  // the payload is additional info you need to carry with the action
})

export const removeFromCartAction = (index) => ({
  type: REMOVE_FROM_CART,
  payload: index,
})

export const setUsernameAction = (name) => ({
  type: SET_USERNAME,
  payload: name,
})

// redux-thunk allows us to write MORE POWERFUL action creators!
// dispatch(addToCartAction(book)) -> we're dispatching a js object
// with redux-thunk, you can ALSO dispatch FUNCTIONS

export const setUsernameActionWithThunk = (name) => {
  return (dispatch, getState) => {
    // here I can do stuff before dispatching the action
    // whatever I want!
    console.log('Hello from redux-thunk!')
    console.log(getState())
    dispatch({
      type: SET_USERNAME,
      payload: name,
    })
  }
}

const getBooksErrorAction = () => ({
  type: GET_BOOKS_ERROR,
})

const getBooksLoadingAction = () => ({
  type: GET_BOOKS_LOADING,
})

export const getBooksAction = () => {
  return async (dispatch, getState) => {
    try {
      let resp = await fetch(
        'https://striveschool-api.herokuapp.com/food-books'
      )
      if (resp.ok) {
        let books = await resp.json()
        // this.setState({ books })
        console.log('books from the getBooks action creator!', books)
        // here I'll have to dispatch a successful action!
        dispatch({
          type: GET_BOOKS,
          payload: books,
        })
        dispatch(getBooksLoadingAction())
        // this is an action supposed to fill the stock property in the redux store
      } else {
        console.log('error')
        // from here instead we're going to dispatch another action, an error action!
        dispatch(getBooksErrorAction())
        dispatch(getBooksLoadingAction())
      }
    } catch (error) {
      console.log(error)
      // from here instead we're going to dispatch another action, an error action!
      dispatch(getBooksErrorAction())
      dispatch(getBooksLoadingAction())
    }
  }
}

// redux-thunk allows you to dispatch FUNCTIONS instead of just JS objects
// the function you are returning gets dispatch as an argument
// and getState, which can be invoked like this -> getState()
// that will return you the actual content of the redux store

export const setSelectedAction = (book) => ({
  type: SET_SELECTED,
  payload: book,
})
