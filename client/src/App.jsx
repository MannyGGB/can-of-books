import "./App.css";
import { useState, useEffect } from "react";
import { Routes, Route, Link, BrowserRouter } from "react-router-dom";
import axios from "axios";
import Home from "./pages/Home";
import About from "./pages/About";
import Book from "./pages/Book";
import { useAuth0 } from "@auth0/auth0-react";
import LoginButton from "./components/LoginButton";
import LogoutButton from "./components/LogoutButton";
import Profile from "./components/Profile";

const API_Url = import.meta.env.VITE_SERVER_URL || "http://localhost:8080";

function App() {
  const { user, isAuthenticated, isLoading } = useAuth0();
  const [books, setBooks] = useState([]);

  useEffect(() => {
    getBooks();
  }, [isAuthenticated]);

  async function getBooks() {
    const API = `${API_Url}/books`;

    const userId = isAuthenticated ? user.sub : null;

    try {
      const res = await axios.get(API, {
        params: { userId },
      });

      setBooks(res.data);
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  }

  async function deleteBook(id) {
    const check = confirm("Are you sure?");
    if (check) {
      const API = `${API_Url}/books/${id}`;
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
        {isAuthenticated ? (
          <div>
            <Profile />
            <LogoutButton />
          </div>
        ) : (
          <LoginButton />
        )}

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
            <Route path="/book/:id" element={<Book />} />
          </Routes>
        </main>
        <footer>
          <p>&copy; You want books? We got books!</p>
        </footer>
      </>
    </BrowserRouter>
  );
}

export default App;
