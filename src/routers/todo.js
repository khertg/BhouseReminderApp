const express = require('express')
const Todo = require('../models/Todo')
const TodoQueuedUser = require('../models/TodoQueuedUser')
const auth = require('../middlewares/auth')

const router = express.Router()

router.get('/api/todos', async (req, res) => {
    // Get all todos
    await Todo.find()
            .populate({ 
                path: 'queuedUsers',
                populate: {
                  path: 'user',
                  model: 'User'
                } 
             })
            .then((data) => {
                res.status(201).send({ todos: data })
            })
            .catch((err) => {
                res.status(400).json({ message: error })
            })
})

router.post('/api/todos', async (req, res) => {
    // Create a new todo
    const todo = new Todo(req.body)
    await todo.save()
            .then((data) => {
                res.status(201).json({ todo: todo })
            })
            .catch(err => {
                res.status(400).json({ message: error })
            })
})

router.put('/api/todos', async (req, res) => {
    // Update todo
    const todoId = req.body.todoId
    delete req.body.todoId
    const todo = new Todo(req.body)

    await Todo.updateOne({ _id: _id }, req.body)
            .then((data) => {
                res.status(200).json({ data : data })
            })
            .catch((err) => {
            res.status(400).json({ message : error })
            })
})

router.delete('/crud/buses', async (req, res) => {
    // Delete todo
    await Todo.deleteOne({ _id: req.body._id })
            .then((data)=>{
                res.status(204)
            })
            .catch((err)=>{
                console.log(err)
                res.status(500).json({ message: err })
            });
});

module.exports = router