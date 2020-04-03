const mongoose = require('mongoose');
var Schema = mongoose.Schema;

const userSchema = ({
  _id: Schema.Types.ObjectId,
  name: String
});

const taskSchema = Schema({
  content: String,
  columnId: { type: Schema.Types.ObjectId, ref: 'Column' },
  userId: { type: Schema.Types.ObjectId, ref: 'User' },
  priority: { type: String, enum: ['low', 'medium', 'high'], default: 'medium'}
});

const columnSchema = Schema({
  _id: Schema.Types.ObjectId,
  title: String,
  limit: Number,
  tasks: [taskSchema]
});



const Column = mongoose.model('Column', columnSchema);
const Task = mongoose.model('Task', taskSchema);
const User = mongoose.model('User', userSchema);

module.exports = User;
module.exports = Task;
module.exports = Column;
