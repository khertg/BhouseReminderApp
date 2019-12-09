const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const queuedUserSchema = mongoose.Schema({
    todo : {
        type: Schema.Types.ObjectId,
        ref : 'Todo' 
    },
    user : {
        type: Schema.Types.ObjectId,
        ref : 'User'
    },
    order: {
        type: Number,
        required: true
    }
})

const TodoQueuedUser = mongoose.model('TodoQueuedUser', queuedUserSchema)

module.exports = TodoQueuedUser