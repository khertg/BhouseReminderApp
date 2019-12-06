const express = require('express')
const userRouter = require('./routers/user')
const todoRouter = require('./routers/todo')
const log = require('./helpers/log')
const mongoDB = require('./db/db')
const port = process.env.PORT || 6000
const app = express()

mongoDB.connect()

app.use(express.json())
app.use(userRouter)
app.use(todoRouter)

app.listen(port, () => {
    log(`Server running on port ${port}`)
})


