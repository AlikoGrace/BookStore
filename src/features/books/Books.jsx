import React from "react";
import BookItem from "./BookItem";
import { useLoaderData } from "react-router-dom";
import { getBooks } from "../../services/apiBooks";

const Books = () => {
  const books = useLoaderData();
  return (
    <ul>
      {books.map((book) => (
        <BookItem book={book} key={book.id} />
      ))}
    </ul>
  );
};

export async function loader() {
  const books = await getBooks();
  return books;
}

export default Books;
