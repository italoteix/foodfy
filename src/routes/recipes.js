const express = require('express');

const recipes = require('../app/controllers/recipes');
const multer = require('../app/middlewares/multer');

const routes = express.Router();

routes.get("/", recipes.index); // Show recipes list
routes.get("/create", recipes.create); // Show new recipe form
routes.get("/:id", recipes.show); // Show recipe's detail
routes.get("/:id/edit", recipes.edit); // Show recipe's edit form

routes.post("/", multer.array('photos', 5), recipes.post); // Add new recipe
routes.put("/", multer.array('photos', 5), recipes.put); // Edit a recipe
routes.delete("/", recipes.delete); // Delete a recipe

module.exports = routes;
