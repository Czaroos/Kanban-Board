const router = require('express').Router();
const Column = require('../models/models');
const Task = require('../models/models');
const User = require('../models/models');
const mongoose = require('mongoose');
// Find column
router.route('/').get((req, res) => {
  Column.find()
    .then(columns => res.json(columns))
    .catch(err => res.status(400).json('Error: ' + err));
});
//Add column
router.route('/add').post((req, res) => {
  newColumn = new Column({
    _id: mongoose.Types.ObjectId(),
    title: req.body.title,
    limit: req.body.limit,
    tasks: [],
  });
  newColumn.save()
  .then(() => res.json('Column added!'))
  .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/addTask/:id').post((req, res) => {
  let task = {
    content: req.body.content,
    columnId: req.params.id
  };

  Column.findById(req.params.id)
  .then(col => {
    col.tasks.push(task);
    col.save()
      .then(col => res.json(col))
  })
  .catch(err => res.status(400).json('Error: ' + err));
});
// //Find column by ID
// router.route('/:id').get((req, res) => {
//   Column.findById(req.params.id)
//     .then(task => res.json(task))
//     .catch(err => res.status(400).json('Error: ' + err));
// });
// //Delete column by ID
// router.route('/:id').delete((req, res) => {
//   Column.findByIdAndDelete(req.params.id)
//     .then(() => res.json('Column deleted.'))
//     .catch(err => res.status(400).json('Error: ' + err));
// });
// //Update column by ID
// router.route('/update/:id').post((req, res) => {
//   Column.findById(req.params.id)
//     .then(col => {
//         col.status = req.body.status;
//         col.save()
//         .then(() => res.json('Column updated!'))
//         .catch(err => res.status(400).json('Error: ' + err));
//     })
//     .catch(err => res.status(400).json('Error: ' + err));
// });

module.exports = router;