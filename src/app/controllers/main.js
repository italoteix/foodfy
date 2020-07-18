const Chef = require('../models/Chef');
const Recipe = require('../models/Recipe');

async function getImage(req, recipeId) {
  let results = await Recipe.files(recipeId);
  return `${req.protocol}://${req.headers.host}${results.rows[0].path.replace('public', '')}`;
}

module.exports = {
  async home(req, res) {
    try {
      let results = await Recipe.all();
      let recipes = results.rows.slice(0, 6);

      const filesPromise = recipes.map(async recipe => {
        recipe.image = await getImage(req, recipe.id);
        return recipe;
      });

      recipes = await Promise.all(filesPromise);

      return res.render('main/home', { recipes });
    } catch (err) {
      return res.send(err);
    }
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
  async recipe(req, res) {
    try {
      const results = await Recipe.find(req.params.id);
      const recipe = results.rows[0];

      if (!recipe) return res.send('Recipe not found!');

      recipe.image = await getImage(req, recipe.id);
      
      if (recipe.information)
        recipe.information = recipe.information.replace(/\\n/gi, '<br >');
  
      return res.render('main/recipe', { recipe });
    } catch (err) {
      return res.send(err);
    }
  },
  chefs(req, res) {
    Chef.all(function(chefs) {
      return res.render('main/chefs', { chefs });
    });
  },
  async results(req, res) {
    const { search } = req.query;

    try {
      let results = await Recipe.findBy(search);
      let recipes = results.rows;

      const filesPromise = recipes.map(async recipe => {
        recipe.image = await getImage(req, recipe.id);
        return recipe;
      });

      recipes = await Promise.all(filesPromise);

      return res.render('main/results', { search, recipes });
    } catch (err) {
      return res.send(err);
    }
  }
};
