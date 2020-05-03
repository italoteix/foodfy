const recipes = require('../data');

exports.home = function(req, res) {
  const featuredRecipes = recipes.slice(0, 6);

  res.render('main/home', { recipes: featuredRecipes});
}

exports.about = function(req, res) {
  res.render('main/about');
}

exports.recipes = function(req, res) {
  res.render('main/recipes', { recipes });
}

exports.recipe = function(req, res) {
  const id = req.params.id;

  res.render('main/recipe', { recipe: recipes[id] })
}