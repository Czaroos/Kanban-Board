const router = require('express').Router();
const Column = require('../models/models');
const mongoose = require('mongoose');

// ------------------------------- / -------------------------------

// Get columns
router.route('/').get((req, res) => {
  Column.find()
    .then(columns => res.json(columns))
    .catch(err => res.status(400).json('Error: ' + err));
});

// ------------------------------- /COLUMNS -------------------------------

//Add column
router.route('/columns/add').post((req, res) => {
  newColumn = new Column({
    _id: mongoose.Types.ObjectId(),
    title: req.body.title,
    limit: req.body.limit,
    tasks: [],
  });
  newColumn.save()
  .then(newColumn => res.json(newColumn))
  .catch(err => res.status(400).json('Error: ' + err));
});

//Delete column by ID
router.route('/columns/:id').delete((req, res) => {
  Column.findByIdAndDelete(req.params.id)
    .then(() => res.json(req.params.id))
    .catch(err => res.status(400).json('Error: ' + err));
});

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

// ------------------------------- /TASKS -------------------------------

// Add task to column
router.route('/tasks/add').post((req, res) => {
  task = {
    content: req.body.content,
    columnId: req.body.columnID,
    userId: req.body.userID,
    priority: req.body.priority
  };

  Column.findById(req.body.columnID)
  .then(col => {
    col.tasks.push(task);
    col.limit--;
    col.save()
      .then(col => res.json(col))
  })
  .catch(err => res.status(400).json('Error: ' + err));
});

// Delete task
router.route('/tasks/delete/:id').post((req, res) => {
  deletedTask = {
    id: req.params.id,
    columnID: req.body.columnID
  }

  Column.findById(req.body.columnID)
  .then(col => {
    col.tasks.id(req.params.id).remove();
    col.limit++;
    col.save()
      .then(() => res.json(deletedTask))
  })
  .catch(err => res.status(400).json('Error: ' + err));
});

















module.exports = router;