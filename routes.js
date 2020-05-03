const express = require('express');

const main = require('./controllers/main');
const recipes = require('./controllers/recipes');

const routes = express.Router();

// Main routes
routes.get('/', main.home);
routes.get('/about', main.about);
routes.get('/recipes', main.recipes);
routes.get('/recipes/:id', main.recipe);

//  Admin
routes.get("/admin/recipes", recipes.index); // Show recipes list
routes.get("/admin/recipes/create", recipes.create); // Show new recipe form
routes.get("/admin/recipes/:id", recipes.show); // Show recipe's detail
routes.get("/admin/recipes/:id/edit", recipes.edit); // Show recipe's edit form

routes.post("/admin/recipes", recipes.post); // Add new recipe
routes.put("/admin/recipes", recipes.put); // Edit a recipe
routes.delete("/admin/recipes", recipes.delete); // Delete a recipe

module.exports = routes;
