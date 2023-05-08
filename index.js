const express = require('express');
const path = require('path');

const app = express();
const port = process.env.PORT || 8080;

// sendFile will go here
app.get('/:page', function(req, res) {
  let page = "/html/" + req.params.page + ".html"
  res.sendFile(path.join(__dirname, page));
});

app.listen(port);
console.log('Server started at http://localhost:' + port);