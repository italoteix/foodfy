const data = require('../../../data.json');

module.exports = {
  home(req, res) {
    const featuredRecipes = data.recipes.slice(0, 6);
  
    res.render('main/home', { recipes: featuredRecipes});
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
  }
};
