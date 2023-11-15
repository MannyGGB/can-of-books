import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Form from "../components/Form";

const API_Url = "http://localhost:8080" || import.meta.env.VITE_SERVER_URL;

export default function Book() {
  const [book, setBook] = useState({});
  const [isError, setIsError] = useState(false);

  const params = useParams();

  useEffect(() => {
    getBook();
  }, []);

  async function getBook() {
    const API = `${API_Url}/books/?_id=${params.id}`;
    try {
      const res = await axios.get(API);
      setBook(res.data[0]);
    } catch (error) {
      console.log(error);
      setIsError(true);
    }
  }

  if (isError) {
    return <p> Whoops!</p>;
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
