/**
 * Book Routes - API Endpoints for Book Operations
 * This file contains all REST API routes for CRUD operations on books
 * Routes: GET, POST, DELETE
 */

const express = require('express');
const router = express.Router();

// Import Book model for database operations
const Book = require('../models/Book');

// ========================
// GET /api/books
// Retrieve all books from database
// ========================
router.get('/', async (req, res) => {
    try {
        // Find all books and sort by creation date (newest first)
        const books = await Book.find().sort({ createdAt: -1 });
        
        // Send books array as JSON response
        res.json(books);
    } catch (error) {
        // If database operation fails, send error response
        console.error('Error fetching books:', error);
        res.status(500).json({ 
            message: 'Failed to fetch books', 
            error: error.message 
        });
    }
});

// ========================
// POST /api/books
// Add a new book to database
// ========================
router.post('/', async (req, res) => {
    try {
        // Extract book data from request body
        const { title, author, isbn, year } = req.body;
        
        // Validate required fields
        if (!title || !author || !isbn || !year) {
            return res.status(400).json({ 
                message: 'All fields are required (title, author, isbn, year)' 
            });
        }
        
        // Create new Book instance with provided data
        const newBook = new Book({
            title,
            author,
            isbn,
            year
        });
        
        // Save book to MongoDB database
        const savedBook = await newBook.save();
        
        // Send success response with saved book data
        res.status(201).json(savedBook);
    } catch (error) {
        // Handle validation or database errors
        console.error('Error adding book:', error);
        res.status(500).json({ 
            message: 'Failed to add book', 
            error: error.message 
        });
    }
});

// ========================
// DELETE /api/books/:id
// Remove a book by its ID
// ========================
router.delete('/:id', async (req, res) => {
    try {
        // Extract book ID from URL parameters
        const { id } = req.params;
        
        // Find and delete the book by ID
        const deletedBook = await Book.findByIdAndDelete(id);
        
        // Check if book was found and deleted
        if (!deletedBook) {
            return res.status(404).json({ 
                message: 'Book not found' 
            });
        }
        
        // Send success response
        res.json({ 
            message: 'Book deleted successfully', 
            deletedBook 
        });
    } catch (error) {
        // Handle invalid ID format or database errors
        console.error('Error deleting book:', error);
        res.status(500).json({ 
            message: 'Failed to delete book', 
            error: error.message 
        });
    }
});

// Export router for use in server.js
module.exports = router;
