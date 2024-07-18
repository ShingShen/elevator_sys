const express = require('express');
const path = require('path');

const app = express();
const port = 3002;

app.use(express.static('centralcontrol'));

app.get('/', (res) => {
    res.sendFile(path.join(__dirname, 'centralcontrol', 'index.html'));
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});