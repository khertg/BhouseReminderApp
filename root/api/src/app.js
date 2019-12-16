const express = require('express')
const cors = require('cors')
const testRouter = require('./routers/test')
const userRouter = require('./routers/user')
const todoRouter = require('./routers/todo')
const log = require('./helpers/log')
const mongoDB = require('./db/db')
const port = process.env.PORT || 6000
const app = express()

mongoDB.connect()

app.use(cors())
app.use(express.json())
app.use(testRouter)
app.use(userRouter)
app.use(todoRouter)

app.listen(port, () => {
    log(`Server running on port ${port}`)
})


