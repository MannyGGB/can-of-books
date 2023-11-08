import Form from "../components/Form";

export default function Home({ books, setBooks, deleteBook }) {
  return (
    <div>
      <h2>Home Page</h2>
      <Form books={books} setBooks={setBooks} />
      {books.length > 0 &&
        books.map((book) => (
          <article key={book._id}>
            <h2>{book.title}</h2>
            <p>{book.description}</p>
            <p>Read? {book.status ? "☑️" : "❌"}</p>
            <button
              onClick={() => {
                deleteBook(book._id);
              }}
            >
              Delete book
            </button>
          </article>
        ))}
      {books.length < 0 && <p>The book collection is empty</p>}
    </div>
  );
}
