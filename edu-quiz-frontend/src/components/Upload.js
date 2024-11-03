import React, { useState } from 'react';
import axios from 'axios';
import './Upload.css';

const Upload = () => {
    const [file, setFile] = useState(null);
    const [quiz, setQuiz] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
        setQuiz('');  // Clear previous quiz
        setError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!file) {
            setError('Please select a file first!');
            return;
        }

        const formData = new FormData();
        formData.append('file', file);
        setLoading(true);
        setError('');

        try {
            const response = await axios.post('http://localhost:5001/generate-quiz', formData);
            setQuiz(response.data.quiz);
        } catch (error) {
            setError('Failed to generate quiz. Please check your server.');
            console.error('Error uploading file:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="upload-container">
            <form onSubmit={handleSubmit} className="upload-form">
                <input type="file" onChange={handleFileChange} />
                <button type="submit" disabled={loading}>Generate Quiz</button>
            </form>
            {loading && <p>Generating quiz...</p>}
            {error && <p className="error">{error}</p>}
            {quiz && (
                <div className="quiz-container">
                    <h2>Generated Quiz:</h2>
                    <p>{quiz}</p>
                </div>
            )}
        </div>
    );
};

export default Upload;
