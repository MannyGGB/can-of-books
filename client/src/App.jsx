import "./App.css";
import { useState, useEffect } from "react";
import { Routes, Route, Link, BrowserRouter } from "react-router-dom";
import axios from "axios";
import Home from "./pages/Home";
import About from "./pages/About";

function App() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    getBooks();
  }, []);

  async function getBooks() {
    const API = `http://localhost:8080/books`; // https://can-of-books-ezdy.onrender.com/books
    const res = await axios.get(API);
    setBooks(res.data);
  }
  async function deleteBook(id) {
    const check = confirm("Are you sure?");
    if (check) {
      const API = `http://localhost:8080/books/${id}`; // https://can-of-books-ezdy.onrender.com/books/${id}
      await axios.delete(API);
      getBooks();
    } else {
      alert("Good choice!");
    }
  }
  return (
    <BrowserRouter>
      <>
        <header>
          <h1>Can of Books</h1>
          <p>Your trusted book collector</p>
        </header>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
          </ul>
        </nav>
        <main>
          <Routes>
            <Route path="/about" element={<About />} />
            <Route
              path="/"
              element={
                <Home
                  books={books}
                  setBooks={setBooks}
                  deleteBook={deleteBook}
                />
              }
            />
          </Routes>
        </main>
      </>
    </BrowserRouter>
  );
}

export default App;
