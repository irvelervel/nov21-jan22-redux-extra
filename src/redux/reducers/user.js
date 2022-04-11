import { SET_USERNAME } from '../actions'
import { initialState } from '../store'

const userReducer = (state = initialState.user, action) => {
  switch (action.type) {
    // case 'blablabla':
    // return { // the new state... }

    case SET_USERNAME:
      return {
        ...state,
        name: action.payload,
      }

    default:
      return state
  }
}

export default userReducer

// PUSH IS FORBIDDEN IN A PURE FUNCTION
// SPLICE IS FORBIDDEN IN A PURE FUNCTION
