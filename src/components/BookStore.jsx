import { Component } from 'react'
import BookList from './BookList'
import BookDetail from './BookDetail'
import { Col, Row, Spinner } from 'react-bootstrap'
import { connect } from 'react-redux'
import { getBooksAction, setSelectedAction } from '../redux/actions'

const mapStateToProps = (state) => ({
  books: state.book.stock,
  selected: state.book.selected,
  areBooksLoading: state.book.isLoading,
})

const mapDispatchToProps = (dispatch) => ({
  getBooks: () => {
    dispatch(getBooksAction())
  },
  setSelected: (book) => {
    dispatch(setSelectedAction(book))
  },
})

class BookStore extends Component {
  componentDidMount = async () => {
    // here I'd like to dispatch my getBooks action creator!
    // so let's connect this component to the Redux Store in order to be able
    // to dispatch an action
    this.props.getBooks()
  }

  changeBook = (book) => {
    // here I should send book to the reducer in order to be set as the new value of "selected"
    // so I'll need to dispatch an action
    // book will be the payload of that action
    this.props.setSelected(book)
  }

  render() {
    return (
      <Row>
        {this.props.areBooksLoading ? (
          <Spinner animation="border" variant="success" />
        ) : (
          <>
            <Col md={4}>
              <BookList
                bookSelected={this.props.selected}
                changeBook={this.changeBook}
                books={this.props.books}
              />
            </Col>
            <Col md={8}>
              <BookDetail bookSelected={this.props.selected} />
            </Col>
          </>
        )}
      </Row>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BookStore)
// even if we just want to dispatch an action, we still have to provide
// a mapStateToProps because that's the only way for accessing the second
// argument of connect
