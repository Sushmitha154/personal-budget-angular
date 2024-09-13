// Budget API

const express = require('express');
const app = express();
const port = 3000;

app.use('/', express.static('public'));


app.get('/hello', (req, res) => {
    res.send('Hello World!');
});

app.get('/budget', (req, res) => {
    const fs = require('fs');

    fs.readFile('budget.json', 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading the file:', err);
            return;
        }

        try {
            const jsonData = JSON.parse(data);
            res.json(jsonData)
        } catch (error) {
            console.error('Error parsing JSON:', error);
        }
    });

});

app.get('/getD3Data', (req, res) => {
    const fs = require('fs');

    fs.readFile('d3jsData.json', 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading the file:', err);
            return;
        }

        try {
            const jsonData = JSON.parse(data);
            res.json(jsonData)
        } catch (error) {
            console.error('Error parsing JSON:', error);
        }
    });
});

app.listen(port, () => {
    console.log(`API served at http://localhost:${port}`);
});