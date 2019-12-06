const mongoose = require('mongoose')
const log = require('../helpers/log')

const mongoDB = {
    connect : () =>{
        mongoose.connect(process.env.MONGODB_URL, {
            useNewUrlParser: true,
            useCreateIndex: true,
            useUnifiedTopology: true
        })
        .then(() => {
            log('Connected to mongoDB')
        })
        .catch(err => {
            log('Failed connecting to mongoDB')
        })
    }
}

module.exports = mongoDB