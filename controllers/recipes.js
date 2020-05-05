const fs = require('fs');

const data = require('../data.json');

exports.index = function(req, res) {
  return res.render('admin/index', { recipes: data.recipes });
}

exports.create = function(req, res) {
  return res.render('admin/create');
}

exports.show = function(req, res) {}
exports.edit = function(req, res) {}
exports.post = function(req, res) {
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
}

exports.put = function(req, res) {}
exports.delete = function(req, res) {}
