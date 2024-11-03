const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.send('Hello from the test server!');
});

app.listen(5001, '0.0.0.0', () => console.log('Test server running on port 5001'));
