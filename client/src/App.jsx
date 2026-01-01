/**
 * App Component - Main Application Component
 * This is the root component that manages global state
 * and renders BookForm and BookList components
 */

import React, { useState, useEffect } from 'react';
import BookForm from './components/BookForm';
import BookList from './components/BookList';
import './App.css';

function App() {
    // ========================
    // STATE MANAGEMENT
    // ========================
    
    // Books state - stores array of all books from database
    const [books, setBooks] = useState([]);
    
    // Loading state - indicates if books are being fetched
    const [loading, setLoading] = useState(true);
    
    // Error state - stores error message if fetch fails
    const [error, setError] = useState('');

    // ========================
    // FETCH BOOKS FROM API
    // ========================
    
    // Function to fetch all books from backend
    const fetchBooks = async () => {
        try {
            setLoading(true);
            setError('');
            
            // Make GET request to backend API
            const response = await fetch('http://localhost:5000/api/books');
            
            // Check if response is successful
            if (!response.ok) {
                throw new Error('Failed to fetch books');
            }
            
            // Parse JSON response
            const data = await response.json();
            
            // Update books state with fetched data
            setBooks(data);
        } catch (err) {
            // Set error message for display
            setError('Failed to load books. Please make sure the server is running.');
            console.error('Error fetching books:', err);
        } finally {
            setLoading(false);
        }
    };

    // ========================
    // EFFECT HOOK - FETCH ON MOUNT
    // ========================
    
    // useEffect runs when component mounts (empty dependency array)
    useEffect(() => {
        fetchBooks();
    }, []);

    // ========================
    // EVENT HANDLERS
    // ========================
    
    // Handle new book added - update books list without refetching
    const handleBookAdded = (newBook) => {
        // Add new book to beginning of array (newest first)
        setBooks(prevBooks => [newBook, ...prevBooks]);
    };

    // Handle book deletion
    const handleDeleteBook = async (bookId) => {
        try {
            // Make DELETE request to backend API
            const response = await fetch(`http://localhost:5000/api/books/${bookId}`, {
                method: 'DELETE'
            });
            
            // Check if deletion was successful
            if (!response.ok) {
                throw new Error('Failed to delete book');
            }
            
            // Remove deleted book from state (filter out by ID)
            setBooks(prevBooks => prevBooks.filter(book => book._id !== bookId));
        } catch (err) {
            // Show error alert to user
            alert('Failed to delete book. Please try again.');
            console.error('Error deleting book:', err);
        }
    };

    // ========================
    // COMPONENT RENDER
    // ========================
    
    return (
        <div className="min-vh-100 bg-light">
            {/* Navigation Header */}
            <nav className="navbar navbar-dark bg-dark shadow">
                <div className="container">
                    <span className="navbar-brand mb-0 h1">
                        Smart Library System
                    </span>
                </div>
            </nav>
            
            {/* Main Content */}
            <main className="container py-4">
                <div className="row justify-content-center">
                    <div className="col-12 col-lg-10 col-xl-8">
                        {/* Page Header */}
                        <div className="text-center mb-4">
                            <h1 className="display-6 fw-bold text-dark">
                                Library Book Management
                            </h1>
                            <p className="text-muted">
                                Manage your institutional book collection efficiently
                            </p>
                        </div>
                        
                        {/* BookForm Component - For adding new books */}
                        <BookForm onBookAdded={handleBookAdded} />
                        
                        {/* BookList Component - Displays all books */}
                        <BookList 
                            books={books} 
                            onDelete={handleDeleteBook}
                            loading={loading}
                            error={error}
                        />
                    </div>
                </div>
            </main>
            
            {/* Footer */}
            <footer className="bg-dark text-white text-center py-3 mt-4">
                <div className="container">
                    <small>
                        Smart Library System © 2026 | Professional Book Management Solution
                    </small>
                </div>
            </footer>
        </div>
    );
}

export default App;
