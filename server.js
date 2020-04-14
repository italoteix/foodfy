const express = require('express');
const nunjucks = require('nunjucks');

const recipes = require('./data');

const server = express();

server.use(express.static('public'));

server.set('view engine', 'njk');

nunjucks.configure('views', {
  express: server,
  noCache: true,
  autoescape: false
});

server.get('/', function(req, res) {
  const featuredRecipes = recipes.slice(0, 6);

  res.render('home', { recipes: featuredRecipes});
});

server.get('/about', function(req, res) {
  res.render('about');
});

server.get('/recipes', function(req, res) {
  res.render('recipes', { recipes });
});

server.get('/recipes/:id', function(req, res) {
  const id = req.params.id;

  res.render('recipe', { recipe: recipes[id] })
})

server.listen(5000, function() {
  console.log('Srever running on port 5000!');
});
