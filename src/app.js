const express = require('express')
const userRouter = require('./routers/user')
const port = process.env.PORT
require('./db/db')

const app = express()

app.use(express.json())
app.use(userRouter)

const log = (message) => {
    const date = new Date();
    console.log(`[${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}]  ${message}`)
}

app.listen(port, () => {
    log(`Server running on port ${port}`)
})


