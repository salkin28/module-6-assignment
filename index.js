const express = require('express');
const app = express();
app.use(express.static('public'))
app.use(express.json());
// Create a new Express.js application. The application should be named book-collection.
app.set('name', 'book-collection');

// Implement a route that serves a static HTML file named index.html when a GET request is made to the root route.
app.get('/', (req, res) => {
  res.sendFile('index.html');
});

// Implement a route that returns a JSON array of books when a GET request is made to the /books route. The array should initially be empty.
const books = [];
app.get('/books', (req, res) => {
  res.json(books);
});

// Implement a route that allows a user to add a book to the collection when a POST request is made to the /books route. The route should accept a JSON object in the request body with the following properties:
//
// title (required): the title of the book
// author (required): the author of the book
// publishedDate (optional): the publication date of the book, in ISO 8601 format (e.g. "2022-05-07")
//
// The route should generate a unique ID for the book and add it to the collection. The response should be a JSON object with the following properties:
//
// id: the unique ID assigned to the book
// title: the title of the book
// author: the author of the book
// publishedDate: the publication date of the book, in ISO 8601 format (if provided)

app.post('/books', (req, res) => {
  const { title, author, publishedDate } = req.body;
  const id = Math.random().toString(36).substring(7);
  books.push({
    id,
    title,
    author,
    publishedDate,
  });
  res.json({
    id,
    title,
    author,
    publishedDate,
  });
});

// Implement a route that allows a user to delete a book from the collection when a DELETE request is made to the /books/:id route. The route should remove the book with the specified ID from the collection. The response should be a JSON object with the following property:
//
// message: a message indicating whether the book was successfully deleted or not

app.delete('/books/:id', (req, res) => {
  const id = req.params.id;
  const index = books.findIndex(book => book.id === id);
  if (index === -1) {
    res.json({
      message: 'Book not found',
    });
    return;
  }
  books.splice(index, 1);
  res.json({
    message: 'Book deleted successfully',
  });
});

// Start the server on port 3000.
app.listen(3000, () => {
  console.log('App listening on port 3000');
});