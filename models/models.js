const mongoose = require('mongoose');
var Schema = mongoose.Schema;

const userSchema = ({
  name: String,
});

const taskSchema = Schema({
  content: String,
  columnId: { type: Schema.Types.ObjectId, ref: 'Column' },
  // user: { type: Schema.Types.ObjectId, ref: 'User' }
});

const columnSchema = Schema({
  _id: Schema.Types.ObjectId,
  title: { type: String },
  limit: { type: Number },
  tasks: [taskSchema]
});



const Column = mongoose.model('Column', columnSchema);
const Task = mongoose.model('Task', taskSchema);
const User = mongoose.model('User', userSchema);

module.exports = User;
module.exports = Task;
module.exports = Column;
