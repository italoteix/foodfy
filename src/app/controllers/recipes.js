const fs = require('fs');

const data = require('../../../data.json');

module.exports = {
  index(req, res) {
    return res.render('admin/index', { recipes: data.recipes });
  },
  create(req, res) {
    return res.render('admin/create');
  },
  show(req, res) {
    const { id } = req.params;
    
    const foundRecipe = data.recipes[id - 1];
  
    if (!foundRecipe) return res.send('Recipe not found!');
  
    return res.render('admin/show', { recipe: foundRecipe });
  },
  edit(req, res) {
    const { id } = req.params;
    
    const foundRecipe = data.recipes[id - 1];
  
    if (!foundRecipe) return res.send('Recipe not found!');
  
    return res.render('admin/edit', { recipe: foundRecipe });
  },
  post(req, res) {
    for (let key in req.body) {
      if (req.body[key] === '' || req.body[key][0] === '') {
        return res.send('Fill all the fields!');
      }
    }
  
    let id = 1;
    const lastRecipe = data.recipes[data.recipes.length - 1];
    if (lastRecipe) {
      id = lastRecipe.id + 1;
    }
  
    data.recipes.push({
      id,
      ...req.body
    });
  
    fs.writeFile('data.json', JSON.stringify(data, null, 2), function(err) {
      if (err) return res.send('Writhing error!');
    });
  
    return res.redirect('/admin/recipes');
  },
  put(req, res) {
    const { id } = req.body;
  
    let index = 0;
    const foundRecipe = data.recipes.find(function(recipe, foundIndex) {
      if (recipe.id == id) {
        index = foundIndex;
        return true;
      }
    });
  
    if (!foundRecipe) return res.send('Recipe not found!');
  
    const recipe = {
      ...foundRecipe,
      ...req.body,
      id: Number(id)
    };
  
    data.recipes[index] = recipe;
  
    fs.writeFile('data.json', JSON.stringify(data, null, 2), function(err) {
      if (err) return res.send('Writing error!');
  
      return res.redirect(`/admin/recipes/${id}`);
    });
  },
  delete(req, res) {
    const { id } = req.body;
    
    const filteredRecipes = data.recipes.filter(function(recipe) {
      return recipe.id != id;
    });
  
    if (!filteredRecipes) return res.send('Recipe not found!');
  
    data.recipes = filteredRecipes;
  
    fs.writeFile('data.json', JSON.stringify(data, null, 2), function(err) {
      if (err) return res.send('Writing error!');
  
      return res.redirect('/admin/recipes');
    });
  }
};