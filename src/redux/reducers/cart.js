import { ADD_TO_CART, REMOVE_FROM_CART } from '../actions'
import { initialState } from '../store'

// the cartReducer now just has to mantain and return from every case
// its slice of the global redux store (the 'cart' key)
const cartReducer = (state = initialState.cart, action) => {
  switch (action.type) {
    // case 'blablabla':
    // return { // the new state... }
    case ADD_TO_CART:
      // the action here carries a type but also a payload
      return {
        ...state,
        products: [...state.products, action.payload],
      }

    case REMOVE_FROM_CART:
      return {
        ...state,
        // action.payload is the index of the element I need to remove from products
        products: state.products.filter((book, i) => i !== action.payload),
        //   products: [
        //     ...state.cart.products.slice(0, action.payload),
        //     ...state.cart.products.slice(action.payload + 1),
        //   ],
      }

    default:
      return state
  }
}

export default cartReducer

// PUSH IS FORBIDDEN IN A PURE FUNCTION
// SPLICE IS FORBIDDEN IN A PURE FUNCTION
