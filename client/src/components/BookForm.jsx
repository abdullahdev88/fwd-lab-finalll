/**
 * BookForm Component - Form for Adding New Books
 * This component renders a form with input fields for book details
 * Uses controlled components with React hooks for state management
 */

import React, { useState } from 'react';

// BookForm receives onBookAdded callback as prop to notify parent of new book
const BookForm = ({ onBookAdded }) => {
    // ========================
    // STATE MANAGEMENT
    // ========================
    
    // Form data state - stores all input field values
    const [formData, setFormData] = useState({
        title: '',
        author: '',
        isbn: '',
        year: ''
    });
    
    // Loading state - shows spinner when form is submitting
    const [loading, setLoading] = useState(false);
    
    // Error state - stores error message to display to user
    const [error, setError] = useState('');
    
    // Success state - shows success message after adding book
    const [success, setSuccess] = useState('');

    // ========================
    // EVENT HANDLERS
    // ========================
    
    // Handle input field changes - updates formData state
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
        // Clear any previous error/success messages when user types
        setError('');
        setSuccess('');
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        // Prevent default form submission (page reload)
        e.preventDefault();
        
        // Validate all fields are filled
        if (!formData.title || !formData.author || !formData.isbn || !formData.year) {
            setError('Please fill in all fields');
            return;
        }
        
        setLoading(true);
        setError('');
        
        try {
            // Send POST request to backend API
            const response = await fetch('http://localhost:5000/api/books', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    ...formData,
                    year: parseInt(formData.year) // Convert year to number
                })
            });
            
            // Parse JSON response
            const data = await response.json();
            
            // Check if request was successful
            if (!response.ok) {
                throw new Error(data.message || 'Failed to add book');
            }
            
            // Show success message
            setSuccess('Book added successfully!');
            
            // Clear form fields
            setFormData({
                title: '',
                author: '',
                isbn: '',
                year: ''
            });
            
            // Notify parent component that a new book was added
            if (onBookAdded) {
                onBookAdded(data);
            }
        } catch (err) {
            // Display user-friendly error message
            setError(err.message || 'Failed to add book. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    // ========================
    // COMPONENT RENDER
    // ========================
    
    return (
        <div className="card shadow-sm mb-4">
            <div className="card-header bg-primary text-white">
                <h4 className="mb-0">
                    Add New Book
                </h4>
            </div>
            <div className="card-body">
                {/* Error Alert - Shows when there's an error */}
                {error && (
                    <div className="alert alert-danger alert-dismissible fade show" role="alert">
                        {error}
                        <button 
                            type="button" 
                            className="btn-close" 
                            onClick={() => setError('')}
                        ></button>
                    </div>
                )}
                
                {/* Success Alert - Shows after successfully adding a book */}
                {success && (
                    <div className="alert alert-success alert-dismissible fade show" role="alert">
                        {success}
                        <button 
                            type="button" 
                            className="btn-close" 
                            onClick={() => setSuccess('')}
                        ></button>
                    </div>
                )}
                
                {/* Book Form */}
                <form onSubmit={handleSubmit}>
                    <div className="row">
                        {/* Book Title Input */}
                        <div className="col-md-6 mb-3">
                            <label htmlFor="title" className="form-label">
                                Book Title
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                id="title"
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                placeholder="Enter book title"
                                required
                            />
                        </div>
                        
                        {/* Author Name Input */}
                        <div className="col-md-6 mb-3">
                            <label htmlFor="author" className="form-label">
                                Author Name
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                id="author"
                                name="author"
                                value={formData.author}
                                onChange={handleChange}
                                placeholder="Enter author name"
                                required
                            />
                        </div>
                    </div>
                    
                    <div className="row">
                        {/* ISBN Number Input */}
                        <div className="col-md-6 mb-3">
                            <label htmlFor="isbn" className="form-label">
                                ISBN Number
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                id="isbn"
                                name="isbn"
                                value={formData.isbn}
                                onChange={handleChange}
                                placeholder="Enter ISBN number"
                                required
                            />
                        </div>
                        
                        {/* Publication Year Input */}
                        <div className="col-md-6 mb-3">
                            <label htmlFor="year" className="form-label">
                                Publication Year
                            </label>
                            <input
                                type="number"
                                className="form-control"
                                id="year"
                                name="year"
                                value={formData.year}
                                onChange={handleChange}
                                placeholder="Enter publication year"
                                min="1000"
                                max="2100"
                                required
                            />
                        </div>
                    </div>
                    
                    {/* Submit Button */}
                    <button 
                        type="submit" 
                        className="btn btn-primary w-100"
                        disabled={loading}
                    >
                        {loading ? (
                            <>
                                <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                                Adding Book...
                            </>
                        ) : (
                            'Add Book'
                        )}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default BookForm;
