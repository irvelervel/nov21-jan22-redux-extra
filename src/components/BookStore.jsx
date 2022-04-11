import { useEffect } from 'react'
import BookList from './BookList'
import BookDetail from './BookDetail'
import { Col, Row, Spinner } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import { getBooksAction, setSelectedAction } from '../redux/actions'

// const mapStateToProps = (state) => ({
//   books: state.book.stock,
//   selected: state.book.selected,
//   areBooksLoading: state.book.isLoading,
// })

// const mapDispatchToProps = (dispatch) => ({
//   getBooks: () => {
//     dispatch(getBooksAction())
//   },
//   setSelected: (book) => {
//     dispatch(setSelectedAction(book))
//   },
// })

const BookStore = () => {
  useEffect(() => {
    dispatch(getBooksAction())
  }, [])

  const books = useSelector((state) => state.book.stock)
  const selected = useSelector((state) => state.book.selected)
  const areBooksLoading = useSelector((state) => state.book.isLoading)

  const dispatch = useDispatch()

  const changeBook = (book) => {
    // here I should send book to the reducer in order to be set as the new value of "selected"
    // book will be the payload of that action
    dispatch(setSelectedAction(book))
    // so I'll need to dispatch an action
  }

  return (
    <Row>
      {areBooksLoading ? (
        <Spinner animation="border" variant="success" />
      ) : (
        <>
          <Col md={4}>
            <BookList
              bookSelected={selected}
              changeBook={changeBook}
              books={books}
            />
          </Col>
          <Col md={8}>
            <BookDetail bookSelected={selected} />
          </Col>
        </>
      )}
    </Row>
  )
}

export default BookStore
// even if we just want to dispatch an action, we still have to provide
// a mapStateToProps because that's the only way for accessing the second
// argument of connect
