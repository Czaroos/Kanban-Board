const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = 'mongodb+srv://Kanban-User:ZAQ%212wsx@kanban-arkwo.mongodb.net/kanbandb?retryWrites=true&w=majority';
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true }
);
const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
})

const tasksRouter = require('./routes/tasks');
const usersRouter = require('./routes/users');
const columnsRouter = require('./routes/columns');

app.use('/tasks', tasksRouter);
app.use('/users', usersRouter);
app.use('/columns', columnsRouter);

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});