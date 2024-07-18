const express = require('express');
const path = require('path');

const app = express();
const port = 3001;

app.use(express.static('client'));

app.get('/', (res) => {
    res.sendFile(path.join(__dirname, 'client', 'index.html'));
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});