// Redux Hooks are an alternate way of CONNECTING a component to the redux store
// as usual with Hooks, this approach takes away a little bit of consistency
// towards the benefit of having a simpler syntax

// main redux hooks: useSelector(), useDispatch()
// useSelector can be used for replacing mapStateToProps
// useDispatch can be used for replacing mapDispatchToProps

// Remember to always check for the 2 RULES OF HOOKS:
// 1) Only use Hooks into React Functional Components
// 2) Hooks must ALWAYS be called in the same order, you cannot write them into
// loops, functions, conditionals etc.; also keep them before the return statement

import Button from 'react-bootstrap/Button'
import { FaTrash } from 'react-icons/fa'
import { Col, Row } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import { removeFromCartAction } from '../redux/actions'

// const mapStateToProps = (state) => ({
//   cart: state.cart.products,
// })

// const mapDispatchToProps = (dispatch) => ({
//   removeFromCart: (index) => {
//     dispatch(removeFromCartAction(index))
//   },
// })

const Cart = () => {
  // this is the place for Hooks!
  const cart = useSelector((state) => state.cart.products)
  const dispatch = useDispatch()

  return (
    <Row>
      <Col sm={12}>
        <ul style={{ listStyle: 'none' }}>
          {cart.map((book, i) => (
            <li key={i} className="my-4">
              <Button
                variant="danger"
                onClick={() => {
                  dispatch(removeFromCartAction(i))
                }}
              >
                <FaTrash />
              </Button>
              <img
                className="book-cover-small"
                src={book.imageUrl}
                alt="book selected"
              />
              {book.title}
            </li>
          ))}
        </ul>
      </Col>
      <Row>
        <Col sm={12} className="font-weight-bold">
          TOTAL:{' '}
          {cart.reduce(
            (acc, currentValue) => acc + parseFloat(currentValue.price),
            0
          )}
        </Col>
      </Row>
    </Row>
  )
}

export default Cart

// we need to connect Cart in both ways, because it will need to READ the content
// of the products array, as well as having the ability of REMOVING one element
// at a time
