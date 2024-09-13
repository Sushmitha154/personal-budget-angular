const express = require('express');
const fs = require("fs");
const app = express();
const port = 3000;

app.use('/', express.static('public'));

app.get('/hello', (req, res) => {
    res.send('Hello World!');
});

app.get('/budget', (req, res) => {
    fs.readFile("budgetData.json", "utf8", (err, data) => {
        if (err) {
          console.error(err);
          res.status(500).send("Error reading data");
          return;
        }
        const budgetData = JSON.parse(data);
        res.json(budgetData);
      });
}); 
app.get("/d3js", (req, res) => {
    fs.readFile("d3js.json", "utf8", (err, data) => {
      if (err) {
        console.error(err);
        res.status(500).send("Error reading data");
        return;
      }
      const d3jsData = JSON.parse(data);
      res.json(d3jsData);
    });
  });
app.listen(port, () => {
    console.log(`API served at http://localhost:${port}`);
});