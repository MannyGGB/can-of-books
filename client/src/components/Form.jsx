import { useState } from "react";
import axios from "axios";

const API_Url = "http://localhost:8080" || process.env.VITE_SERVER_URL;

export default function Form({ books, setBooks, book, setBook }) {
  const [formData, setFormData] = useState(
    book ?? {
      title: "",
      description: "",
      status: false,
    }
  );

  function handleChange(event) {
    if (event.target.type === "checkbox") {
      setFormData({ ...formData, [event.target.name]: event.target.checked });
    } else {
      setFormData({ ...formData, [event.target.name]: event.target.value });
    }
  }

  async function addBook(event) {
    event.preventDefault();
    const API = `${API_Url}/books`;
    const res = await axios.post(API, formData);
    setBooks([...books, res.data]);
  }

  async function updateBook(event) {
    event.preventDefault();
    const API = `${API_Url}/books/${book._id}`;
    await axios.put(API, formData);
    setBook(formData);
  }

  return (
    <form onSubmit={book?.name ? updateBook : addBook}>
      <input
        name="title"
        placeholder="title"
        onChange={handleChange}
        value={formData.title}
      />
      <input
        name="description"
        placeholder="description"
        onChange={handleChange}
        value={formData.description}
      />
      <input
        name="status"
        type="checkbox"
        onChange={handleChange}
        value={formData.status}
      />
      <button>Submit</button>
    </form>
  );
}
