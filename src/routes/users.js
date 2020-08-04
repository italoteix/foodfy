const express = require('express');

const routes = express.Router();

// Profile routes of a logged in user
routes.get('/admin/profile', ProfileController.index) // Show form with logged user data
routes.put('/admin/profile', ProfileController.put)// Edit logged user

// Routes that the admin will access to manage the users
routes.get('/admin/users', UserController.list) // Show the registered user list
routes.post('/admin/users', UserController.post) // Register a user
routes.put('/admin/users', UserController.put) // Edit a user
routes.delete('/admin/users', UserController.delete) // Delete a user

module.exports = routes;
