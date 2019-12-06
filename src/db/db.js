const mongoose = require('mongoose')
const date = new Date();

mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
})
.then(() => {
    console.log(`[${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}]  connected to mongoDB`)
})
.catch(err => {
    console.error(`[${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}]  failed connecting to mongoDB`)
})