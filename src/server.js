const express = require('express');
const nunjucks = require('nunjucks');
const methodOverride = require('method-override');

const routes = require('./routes');

const server = express();

server.use(express.static('public'));
server.use(express.urlencoded({ extended: true }));
server.use(methodOverride('_method'));
server.set('view engine', 'njk');

nunjucks.configure('src/app/views', {
  express: server,
  noCache: true,
  autoescape: false
});

server.use(routes);

server.listen(5000, function() {
  console.log('Server running on port 5000!');
});
