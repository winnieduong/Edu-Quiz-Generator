import React from 'react';
import './App.css';
import Upload from './components/Upload';

function App() {
    return (
        <div className="App">
            <header className="App-header">
                <h1>Educational Quiz Generator</h1>
                <p>Upload a document, and we’ll generate a quiz for you!</p>
            </header>
            <main>
                <Upload />
            </main>
        </div>
    );
}

export default App;
