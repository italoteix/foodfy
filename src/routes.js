const express = require('express');

const main = require('./app/controllers/main');
const recipes = require('./app/controllers/recipes');
const chefs = require('./app/controllers/chefs');
const multer = require('./app/middlewares/multer');

const routes = express.Router();

// Main routes
routes.get('/', main.home);
routes.get('/about', main.about);
routes.get('/recipes', main.recipes);
routes.get('/recipes/:id', main.recipe);
routes.get('/chefs', main.chefs);
routes.get('/results', main.results);

//  Admin
// // Recipes
routes.get("/admin/recipes", recipes.index); // Show recipes list
routes.get("/admin/recipes/create", recipes.create); // Show new recipe form
routes.get("/admin/recipes/:id", recipes.show); // Show recipe's detail
routes.get("/admin/recipes/:id/edit", recipes.edit); // Show recipe's edit form

routes.post("/admin/recipes", multer.array('photos', 5), recipes.post); // Add new recipe
routes.put("/admin/recipes", multer.array('photos', 5), recipes.put); // Edit a recipe
routes.delete("/admin/recipes", recipes.delete); // Delete a recipe

// // Chefs
routes.get('/admin/chefs', chefs.index); // Show chefs list
routes.get('/admin/chefs/create', chefs.create); // Show new chef form
routes.get('/admin/chefs/:id', chefs.show); // Show shef's profile
routes.get('/admin/chefs/:id/edit', chefs.edit); // Show chef's edit form

routes.post('/admin/chefs', multer.array('file', 1), chefs.post); // Add new chef
routes.put('/admin/chefs', multer.array('file', 1), chefs.put); // Edit chef profile
routes.delete('/admin/chefs', chefs.delete); // Delete chef

module.exports = routes;
