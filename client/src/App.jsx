import "./App.css";
import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [books, setBooks] = useState("");

  useEffect(() => {
    getBooks();
  }, []);

  async function getBooks() {
    const API = `http://localhost:8080/books`;
    const res = await axios.get(API);
    setBooks(res.data);
  }
  return (
    <>
      <header>
        <h1>Can of Books</h1>
        <p>Your trusted book collector</p>
      </header>
      <main>
        {books.length > 0 &&
          Array.from(books).map((book) => {
            {
              /* Array.from() makes sure the array of objects books is an array, so
        map can work and return a new array */
            }
            return (
              <article key={book._id}>
                <h2>{book.title}</h2>
                <p>{book.description}</p>
                <p>{book.status}</p>
              </article>
            );
          })}
        {books.length < 0 && <p>The book collection is empty</p>}
      </main>
    </>
  );
}

export default App;
