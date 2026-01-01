/**
 * BookList Component - Display All Books
 * This component fetches and displays all books from the backend API
 * Supports deleting books with confirmation
 */

import React from 'react';

// BookList receives books array and onDelete callback as props
const BookList = ({ books, onDelete, loading, error }) => {
    // ========================
    // LOADING STATE
    // ========================
    
    // Show loading spinner while fetching books
    if (loading) {
        return (
            <div className="card shadow-sm">
                <div className="card-body text-center py-5">
                    <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                    <p className="mt-3 text-muted">Loading books...</p>
                </div>
            </div>
        );
    }

    // ========================
    // ERROR STATE
    // ========================
    
    // Show error message if fetching failed
    if (error) {
        return (
            <div className="card shadow-sm">
                <div className="card-body">
                    <div className="alert alert-danger mb-0">
                        {error}
                    </div>
                </div>
            </div>
        );
    }

    // ========================
    // EMPTY STATE
    // ========================
    
    // Show message when no books exist
    if (!books || books.length === 0) {
        return (
            <div className="card shadow-sm">
                <div className="card-body text-center py-5">
                    <h5 className="mt-3 text-muted">No Books Found</h5>
                    <p className="text-muted">Add books using the form above to get started</p>
                </div>
            </div>
        );
    }

    // ========================
    // DELETE HANDLER
    // ========================
    
    // Handle delete button click with confirmation
    const handleDelete = (bookId, bookTitle) => {
        // Show confirmation dialog before deleting
        if (window.confirm(`Are you sure you want to delete "${bookTitle}"?`)) {
            onDelete(bookId);
        }
    };

    // ========================
    // COMPONENT RENDER
    // ========================
    
    return (
        <div className="card shadow-sm">
            <div className="card-header bg-success text-white d-flex justify-content-between align-items-center">
                <h4 className="mb-0">
                    Book Collection
                </h4>
                <span className="badge bg-light text-dark">
                    {books.length} {books.length === 1 ? 'Book' : 'Books'}
                </span>
            </div>
            <div className="card-body p-0">
                {/* Responsive Table for larger screens */}
                <div className="table-responsive d-none d-md-block">
                    <table className="table table-hover mb-0">
                        <thead className="table-light">
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Title</th>
                                <th scope="col">Author</th>
                                <th scope="col">ISBN</th>
                                <th scope="col">Year</th>
                                <th scope="col" className="text-center">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* Map through books array and render each book as a row */}
                            {books.map((book, index) => (
                                <tr key={book._id}>
                                    <th scope="row">{index + 1}</th>
                                    <td className="fw-semibold">{book.title}</td>
                                    <td>{book.author}</td>
                                    <td><code>{book.isbn}</code></td>
                                    <td>{book.year}</td>
                                    <td className="text-center">
                                        {/* Delete Button with hover effect */}
                                        <button
                                            className="btn btn-danger btn-sm delete-btn"
                                            onClick={() => handleDelete(book._id, book.title)}
                                            title="Delete Book"
                                        >
                                            <span>Delete</span>
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                
                {/* Card Layout for mobile screens */}
                <div className="d-md-none">
                    {books.map((book, index) => (
                        <div key={book._id} className="border-bottom p-3">
                            <div className="d-flex justify-content-between align-items-start">
                                <div className="flex-grow-1">
                                    <h6 className="mb-1 fw-bold">
                                        <span className="badge bg-secondary me-2">{index + 1}</span>
                                        {book.title}
                                    </h6>
                                    <p className="mb-1 text-muted small">
                                        Author: {book.author}
                                    </p>
                                    <p className="mb-1 small">
                                        ISBN: <code>{book.isbn}</code>
                                    </p>
                                    <p className="mb-0 small">
                                        Year: {book.year}
                                    </p>
                                </div>
                                <button
                                    className="btn btn-danger btn-sm delete-btn"
                                    onClick={() => handleDelete(book._id, book.title)}
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default BookList;
