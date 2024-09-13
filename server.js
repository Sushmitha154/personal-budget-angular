const express = require('express');
const app = express();
const port = 3000;
app.use('/', express.static('public'));
app.get('/hello', (req, res) => {
    res.send('Hello World!');
});
app.get('/budget', (req, res) => {
    res.json(budget);
});
const budget = {
    myBudget: [
        {
            title: 'Eat out',
            budget: 25
        },
        {
            title: 'Rent',
            budget: 275
        },
        {
            title: 'Grocery',
            budget: 110
        },
    ]
};


app.listen(port, () => {
    console.log(`API served at http://localhost:${port}`);
});