//Install express server
const express = require('express');
const path = require('path');

const app = express();

// Serve only the static files form the dist directory
app.use(express.static(__dirname + '/dist/posts'));
app.use(function (req, res, next) {

  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );
  // res.setHeader('Content-Type', 'application/x-www-form-urlencoded');


  // Pass to next layer of middleware
  next();
});

app.get('*', function (req, res) {

  res.sendFile(path.join(__dirname + '/dist/posts/index.html'));
});

// Start the app by listening on the default Heroku port
app.listen(process.env.PORT || 8080);
