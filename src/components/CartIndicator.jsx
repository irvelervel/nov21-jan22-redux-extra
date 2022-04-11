import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { FaShoppingCart } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { useState } from 'react'
import { setUsernameActionWithThunk } from '../redux/actions'
import { Alert } from 'react-bootstrap'

// CartIndicator should now connect to the Redux Store
// so we're going to use the connect() function from react-redux
// we're going to read the length of state.cart.products

// CartIndicatore just needs a mapStateToProps function, because
// we don't need "write access" from here

// const mapStateToProps = (state) => ({
//   // every key of this object will become a props for CartIndicator
//   cartLength: state.cart.products.length,
//   // cartLength is now a PROP for CartIndicator!
//   username: state.user.name,
//   isError: state.book.isError,
// })

// const mapDispatchToProps = (dispatch) => ({
//   setUsername: (name) => {
//     dispatch(setUsernameActionWithThunk(name))
//   },
// })

const CartIndicator = () => {
  const navigate = useNavigate()
  const [name, setName] = useState('')

  // state here is the exact same object we were getting in mapStateToProps
  const cartLength = useSelector((state) => state.cart.products.length)
  const username = useSelector((state) => state.user.name)
  const isError = useSelector((state) => state.book.isError)

  const dispatch = useDispatch()

  const handleSubmit = (e) => {
    console.log(e)
    e.preventDefault()
    // here I want to submit my username to the redux store!
    // setUsername(name)
    dispatch(setUsernameActionWithThunk(name))
  }

  return (
    <div className="ml-auto mt-2">
      {isError ? (
        <Alert variant="danger">ERROR FETCHING DATA</Alert>
      ) : username ? (
        <>
          <span className="mr-3">Hello {username}!</span>
          <Button color="primary" onClick={() => navigate('/cart')}>
            <FaShoppingCart />
            <span className="ml-2">{cartLength}</span>
          </Button>
        </>
      ) : (
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Control
              type="text"
              placeholder="Login from here!"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>
        </Form>
      )}
    </div>
  )
}

export default CartIndicator
