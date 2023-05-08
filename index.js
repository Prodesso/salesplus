const express = require('express');
const path = require('path');

const app = express();
const port = process.env.PORT || 8080;
app.use(express.static('public'));

// sendFile will go here
app.get('/dashboard', function(req, res) {
  let page = "/html/dashboard.html"
  res.sendFile(path.join(__dirname, page));
});

app.listen(port);
console.log('Server started at http://localhost:' + port);