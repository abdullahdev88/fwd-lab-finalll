/**
 * Book Model - MongoDB Schema Definition
 * This file defines the structure of Book documents in MongoDB
 * using Mongoose ODM (Object Document Mapper)
 */

const mongoose = require('mongoose');

// ========================
// BOOK SCHEMA DEFINITION
// ========================

// Define the structure of a Book document
const bookSchema = new mongoose.Schema({
    // Title of the book - required field
    title: {
        type: String,
        required: [true, 'Book title is required'],
        trim: true  // Remove whitespace from beginning and end
    },
    
    // Author's name - required field
    author: {
        type: String,
        required: [true, 'Author name is required'],
        trim: true
    },
    
    // ISBN (International Standard Book Number) - required field
    isbn: {
        type: String,
        required: [true, 'ISBN is required'],
        trim: true
    },
    
    // Publication year - required field
    year: {
        type: Number,
        required: [true, 'Publication year is required']
    }
}, {
    // Automatically add createdAt and updatedAt timestamps
    timestamps: true
});

// ========================
// EXPORT MODEL
// ========================

// Create and export the Book model
// 'Book' is the model name, bookSchema is the schema definition
module.exports = mongoose.model('Book', bookSchema);
