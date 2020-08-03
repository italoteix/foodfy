const express = require('express');

const main = require('../app/controllers/main');

const routes = express.Router();

routes.get('/', main.home);
routes.get('/about', main.about);
routes.get('/recipes', main.recipes);
routes.get('/recipes/:id', main.recipe);
routes.get('/chefs', main.chefs);
routes.get('/results', main.results);

module.exports = routes;
