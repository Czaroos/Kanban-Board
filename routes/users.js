//Find user in database
const router = require('express').Router();
let User = require('../models/models');

router.route('/').get((req, res) => {
    User.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json('Error: '+ err));
});
router.route('/add').post((req, res) => {
    const name = req.body.name;
    const newUser = new User({
     name
    });
    newUser.save()
    .then(() => res.json('User added!'))
    .catch(err => res.status(400).json('Error: ' + err));
  });
module.exports = router;
