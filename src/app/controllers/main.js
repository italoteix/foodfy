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
    let { limit, page } = req.query;

    limit = limit || 3;
    page = page || 1;

    const offset = limit * (page - 1);

    Recipe.pagination(limit, offset, function(recipes) {
      const pagination = {
        total: Math.ceil(recipes[0].total / limit),
        page
      };

      res.render('main/recipes', { recipes, pagination });
    });
  },
  recipe(req, res) {
    Recipe.find(req.params.id, function(recipe) {
      if (!recipe) return res.send('Recipe not found!');

      if (recipe.information)
        recipe.information = recipe.information.replace(/\\n/gi, '<br >');

      return res.render('main/recipe', { recipe });
    });
  },
  chefs(req, res) {
    Chef.all(function(chefs) {
      return res.render('main/chefs', { chefs });
    });
  },
  results(req, res) {
    const { search } = req.query;

    Recipe.findBy(search, function(recipes) {
      return res.render('main/results', { search, recipes });
    });
  }
};
