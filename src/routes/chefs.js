const express = require('express');

const chefs = require('../app/controllers/chefs');
const multer = require('../app/middlewares/multer');

const routes = express.Router();

routes.get('/', chefs.index); // Show chefs list
routes.get('/create', chefs.create); // Show new chef form
routes.get('/:id', chefs.show); // Show shef's profile
routes.get('/:id/edit', chefs.edit); // Show chef's edit form

routes.post('/', multer.array('file', 1), chefs.post); // Add new chef
routes.put('/', multer.array('file', 1), chefs.put); // Edit chef profile
routes.delete('/', chefs.delete); // Delete chef

module.exports = routes;
