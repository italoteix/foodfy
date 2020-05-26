const data = require('../../../data.json');
const Chef = require('../models/Chef');
const Recipe = require('../models/Recipe');

module.exports = {
  home(req, res) {
    Recipe.all(function(recipes) {
      recipes = recipes.slice(0, 6);

      res.render('main/home', { recipes });
    });
  },
  about(req, res) {
    res.render('main/about');
  },
  recipes(req, res) {
    res.render('main/recipes', { recipes: data.recipes });
  },
  recipe(req, res) {
    const id = req.params.id;
  
    res.render('main/recipe', { recipe: data.recipes[id] })
  },
  chefs(req, res) {
    Chef.all(function(chefs) {
      return res.render('main/chefs', { chefs });
    });
  }
};
