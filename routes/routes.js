const router = require("express").Router();
const Column = require("../models/models");
const mongoose = require("mongoose");

// ------------------------------- / -------------------------------

// Get columns
router.route("/all").get((req, res) => {
  Column.find()
    .then((columns) => res.json(columns))
    .catch((err) => res.status(400).json("Error: " + err));
});

// Save columns
router.route("/all").post((req, res) => {
  Column.deleteMany({})
    .then(
      () =>
        (newState = req.body.map((column) => {
          let tasks = column.tasks.map((task) => {
            return (newTask = {
              _id: task.id,
              content: task.content,
              priority: task.priority,
              columnId: task.columnID,
            });
          });
          newColumn = new Column({
            _id: column.id,
            title: column.title,
            limit: column.limit,
            tasks: tasks,
            index: column.index
          });
          newColumn.save().then({});
          return newColumn;
        }))
    )
    .then(() => res.json(newState));
});

// ------------------------------- /COLUMNS -------------------------------

//Add column
router.route("/columns/add").post((req, res) => {
  Column.countDocuments({}).then((count) => {
    newColumn = new Column({
      _id: mongoose.Types.ObjectId(),
      title: req.body.title,
      limit: req.body.limit,
      tasks: [],
      index: count,
    });
    newColumn
      .save()
      .then((newColumn) => res.json(newColumn))
      .catch((err) => res.status(400).json("Error: " + err));
  });
});

//Delete column by ID
router.route("/columns/:id").delete((req, res) => {
  Column.findByIdAndDelete(req.params.id)
    .then(() => res.json(req.params.id))
    .catch((err) => res.status(400).json("Error: " + err));
});

// Update column by ID
router.route('/columns/:id').put((req, res) => {
  Column.findById(req.params.id)
    .then(col => {
        col.title = req.body.title;
        col.limit = req.body.limit;
        col.save()
        .then(col => res.json(col))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

// ------------------------------- /TASKS -------------------------------

// Add task to column
router.route("/tasks/add").post((req, res) => {
  task = {
    content: req.body.content,
    columnId: req.body.columnID,
    userId: req.body.userID,
    priority: req.body.priority,
  };

  Column.findById(req.body.columnID)
    .then((col) => {
      col.tasks.push(task);
      col.limit--;
      col.save().then((col) => res.json(col));
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

// Delete task
router.route("/tasks/delete/:id").post((req, res) => {
  deletedTask = {
    _id: req.params.id,
    columnID: req.body.columnID,
  };

  Column.findById(req.body.columnID)
    .then((col) => {
      col.tasks.id(req.params.id).remove();
      col.limit++;
      col.save().then(() => res.json(deletedTask));
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

// Update task by ID
router.route('/tasks/:id').put((req, res) => {
  changedTask = {
    _id: req.params.id,
    content: req.body.content,
    userId: req.body.userID,
    priority: req.body.priority,
    columnId: req.body.columnID
  }

  Column.findById(req.body.columnID)
    .then(col => {
      col.tasks.id(req.params.id).set(changedTask)
      return col.save()
    })
    .then(() => res.json(changedTask))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;
