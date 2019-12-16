const express = require('express')
const Test = require('../models/Test')
const auth = require('../middlewares/auth')

const router = express.Router()

router.get('/api/tests', async (req, res) => {
    // Get all tests
    await Test.find()
            .then((data) => {
                res.status(200).json(data)
            })
            .catch((err) => {
                res.status(400).json(err)
            })
})

router.get('/api/tests/:_id', async (req, res) => {
    // Get a single test
    await Test.findOne({_id :req.params["_id"] })
            .then((data) => {
                res.status(200).json(data)
            })
            .catch((err) => {
                res.status(400).json(err)
            })
})

router.post('/api/tests', async (req, res) => {
    // Create a new test
    const test = new Test(req.body)
    await test.save()
            .then((data) => {
                res.status(201).json(test)
            })
            .catch(err => {
                res.status(400).json(err)
            })
})

router.put('/api/tests', async (req, res) => {
    // Update test
    console.log(req.body)
    const testId = req.body._id
    delete req.body._id
    const test = new Test(req.body)
    await Test.updateOne({ _id: testId }, req.body)
            .then((data) => {
                res.status(200).json(data)
            })
            .catch((err) => {
            res.status(400).json(err)
            })
})

router.delete('/api/tests', async (req, res) => {
    // Delete test
    await Test.deleteOne({ _id: req.body._id })
            .then((data)=>{
                res.status(204).json()
            })
            .catch((err)=>{
                res.status(500).json(err)
            });
});

module.exports = router