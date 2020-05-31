const Recipe = require('../models/Recipe');

module.exports = {
  index(req, res) {
    Recipe.all(function(recipes) {
      return res.render('admin/recipes/index', { recipes });
    });
  },
  create(req, res) {
    Recipe.chefsAvailable(function(options) {
      return res.render('admin/recipes/create', { chefOptions: options });
    });
  },
  show(req, res) {
    const { id } = req.params;

    Recipe.find(id, function(recipe) {
      if (!recipe) return res.send('Recipe not found!');

      recipe.information = recipe.information.replace(/\\n/gi, '<br>')

      return res.render('admin/recipes/show', { recipe });
    });
  },
  edit(req, res) {
    const { id } = req.params;

    Recipe.find(id, function(recipe) {
      if (!recipe) return res.send('Recipe not found!');

      Recipe.chefsAvailable(function(options) {
        return res.render('admin/recipes/edit', { recipe, chefOptions: options });
      });
    });
  },
  post(req, res) {
    for (let key in req.body) {
      if (key !== 'information' && req.body[key] === '' || req.body[key][0] === '') {
        return res.send('Fill all the fields!');
      }
    }
  
    Recipe.create(req.body, function(recipe) {
      return res.redirect(`/admin/recipes/${recipe.id}`);
    });
  },
  put(req, res) {
    for (let key in req.body) {
      if (req.body[key] === '' || req.body[key][0] === '') {
        return res.send('Fill all the fields!');
      }
    }

    Recipe.update(req.body, function() {
      return res.redirect(`/admin/recipes/${req.body.id}`);
    });
  },
  delete(req, res) {
    const { id } = req.body;

    Recipe.delete(id, function() {
      return res.redirect('/admin/recipes');
    });
  }
};
