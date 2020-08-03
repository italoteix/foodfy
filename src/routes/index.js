const express = require('express');

const main = require('./main');
const chefs = require('./chefs');
const recipes = require('./recipes');

const routes = express.Router();

routes.use('/', main);
routes.use('/admin/chefs', chefs);
routes.use('/admin/recipes', recipes);

module.exports = routes;