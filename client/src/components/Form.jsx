import { useState } from "react";
import axios from "axios";

export default function Form({ books, setBooks }) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    status: false,
  });

  function handleChange(event) {
    if (event.target.type === "checkbox") {
      setFormData({ ...formData, [event.target.name]: event.target.checked });
    } else {
      setFormData({ ...formData, [event.target.name]: event.target.value });
    }
  }

  async function submitForm(event) {
    event.preventDefault();
    const API = "http://localhost:8080/books"; // https://can-of-books-ezdy.onrender.com/books
    const res = await axios.post(API, formData);
    setBooks([...books, res.data]);
  }

  return (
    <form onSubmit={submitForm}>
      <input name="title" placeholder="title" onChange={handleChange} />
      <input
        name="description"
        placeholder="description"
        onChange={handleChange}
      />
      <input name="status" type="checkbox" onChange={handleChange} />
      <button>Add Book</button>
    </form>
  );
}
