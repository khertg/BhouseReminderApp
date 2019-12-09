const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const todoSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String
    },
    queuedUsers: [{ type: Schema.Types.ObjectId, ref: 'TodoQueuedUser' }]
})

const Todo = mongoose.model('Todo', todoSchema)

module.exports = Todo