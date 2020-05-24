const Chef = require('../models/Chef');

module.exports = {
  index(req, res) {},
  create(req, res) {
    return res.render('admin/chefs/create');
  },
  show(req, res) {},
  edit(req, res) {},
  post(req, res) {
    for (let key in req.body) {
      if (req.body[key] === '') return res.send('Please, fill all fields!');
    }

    Chef.create(req.body, function(id) {
      return res.redirect(`/admin/chefs/${id}`);
    });
  },
  put(req, res) {},
  delete(req, res) {},
};
