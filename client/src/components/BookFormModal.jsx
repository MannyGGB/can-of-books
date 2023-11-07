import React, { useState } from "react";

export default function BookFormModal({ isOpen, onClose, onSubmit }) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    status: "",
  });

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(formData);
    setFormData({
      title: "",
      description: "",
      status: "",
    });
  };

  return (
    <div className={`modal ${isOpen ? "open" : "closed"}`}>
      <div className="modal-content">
        <span className="close" onClick={onClose}>
          &times;
        </span>
        <h2>Add a Book</h2>
        <form onSubmit={handleSubmit}>
          <input name="title" placeholder="Title" onChange={handleChange} />
          <input
            name="description"
            placeholder="Description"
            onChange={handleChange}
          />
          <input name="status" placeholder="Status" onChange={handleChange} />
          <button type="submit">Add Book</button>
        </form>
      </div>
    </div>
  );
}
