import { useState } from "react";
import BookFormModal from "../components/BookFormModal";
import Form from "../components/Form";

export default function Home({ books, setBooks, deleteBook }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleFormSubmit = (newBookData) => {
    setBooks([...books, newBookData]);
    closeModal();
  };

  return (
    <div>
      <h2>Home Page</h2>
      <button onClick={openModal}>Add Book</button>
      <Form books={books} setBooks={setBooks} />
      {books.length > 0 &&
        books.map((book) => (
          <article key={book._id}>
            <h2>{book.title}</h2>
            <p>{book.description}</p>
            <p>{book.status}</p>
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
      <BookFormModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onSubmit={handleFormSubmit}
      />
    </div>
  );
}
