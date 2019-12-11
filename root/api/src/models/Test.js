const mongoose = require('mongoose')

const testSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String
    }
})

const Test = mongoose.model('Test', testSchema)

module.exports = Test