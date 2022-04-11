import {
  GET_BOOKS,
  GET_BOOKS_ERROR,
  GET_BOOKS_LOADING,
  SET_SELECTED,
} from '../actions'
import { initialState } from '../store'

const bookReducer = (state = initialState.book, action) => {
  switch (action.type) {
    case GET_BOOKS:
      return {
        // even if the reducer is not getting invoked immediately,
        // it's still invoked with final payload
        ...state,
        stock: action.payload,
      }

    case GET_BOOKS_ERROR:
      return {
        ...state,
        isError: true,
      }

    case GET_BOOKS_LOADING:
      return {
        ...state,
        isLoading: false,
      }

    case SET_SELECTED:
      return {
        ...state,
        selected: action.payload,
      }

    default:
      return state
  }
}

export default bookReducer

// PUSH IS FORBIDDEN IN A PURE FUNCTION
// SPLICE IS FORBIDDEN IN A PURE FUNCTION
