import { Component } from 'react'
import { Col, Row } from 'react-bootstrap'
import Button from 'react-bootstrap/Button'
import { connect } from 'react-redux'
import { addToCartAction } from '../redux/actions'

// BookDetail adds new elements to the products array inside the cart object
// BookDetail doens't need to read the value of the array
// BookDetails just needs to ADD a new element to the cart
// in any case, because mapDispatchToProps is the second argument of the connect,
// you also need to write mapStateToProps, so redux can give the dispatch argument
// to the right function
// so, tldr, even if you just need to dispatch an action from a component,
// you'll need a mapStateToProps just for accessing the second argument of connect :(

const mapStateToProps = (state) => ({
  username: state.user.name,
})

const mapDispatchToProps = (dispatch) => ({
  // now I can write my methods here...
  // I need to write a method that is going to dispatch an action
  // capable of returning out of the reducer a new products array
  addToCart: (book) => {
    dispatch(addToCartAction(book))
  },
})

class BookDetail extends Component {
  state = {
    book: null,
  }

  componentDidUpdate(prevProps) {
    if (prevProps.bookSelected !== this.props.bookSelected) {
      this.setState({
        book: this.props.bookSelected,
      })
    }
  }

  render() {
    return (
      <div className="mt-3">
        {this.state.book ? (
          <>
            <Row>
              <Col sm={12}>
                <h1>{this.state.book.title}</h1>
              </Col>
            </Row>
            <Row className="mt-3">
              <Col sm={4}>
                <div className="mt-3">
                  <img
                    className="book-cover"
                    src={this.state.book.imageUrl}
                    alt="book selected"
                  />
                </div>
              </Col>
              <Col sm={8}>
                <p>
                  <span className="font-weight-bold">Description:</span>
                  {this.state.book.description}
                </p>
                <p>
                  <span className="font-weight-bold">Price:</span>
                  {this.state.book.price}
                </p>
                {this.props.username ? (
                  <Button
                    color="primary"
                    onClick={() => {
                      this.props.addToCart(this.state.book)
                    }}
                  >
                    ADD TO CART
                  </Button>
                ) : (
                  <div>
                    You need to be logged in for adding books to the cart
                  </div>
                )}
              </Col>
            </Row>
          </>
        ) : (
          <Row>
            <Col sm={12}>
              <h3>Please select a book!</h3>
            </Col>
          </Row>
        )}
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BookDetail)
