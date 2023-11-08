import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Form from "../components/Form";

const API_Url = "http://localhost:8080" || process.env.VITE_SERVER_URL;

export default function Book() {
  const [book, setBook] = useState({});

  const params = useParams();

  useEffect(() => {
    getBook();
  }, []);

  async function getBook() {
    const API = `${API_Url}/books/?_id=${params.id}`;
    const res = await axios.get(API);
    setBook(res.data[0]);
  }

  return (
    <article>
      <h2>{book.title}</h2>
      <p>{book.description}</p>
      <p>Read? {book.status ? "☑️" : "❌"}</p>
      {book.title && <Form book={book} setBook={setBook} />}
    </article>
  );
}
