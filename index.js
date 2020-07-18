const express = require('express')
const app = express()

const port = 3000;

app.get('/', function(req, res) {
    res.send("Welcome to the Express app");
});

app.listen(port, function() {
    console.log(`Server is running on ${port}`);
});