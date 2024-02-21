const asyncHandler = require('express-async-handler')
const Goal = require('../models/goalModel')
const User = require('../models/userModel')
// @desc   get goals
// @route  GET /api/goals
// @access Private
const getGoals = asyncHandler(async (req,res) => { //get
    const goals = await Goal.find({user: req.user.id})
    res.status(200).json(goals)
})

// @desc   set goal
// @route  POST /api/goals
// @access Private
const setGoal =  asyncHandler(async (req,res) => { //set
    if(!req.body.text) {
        res.status(400)
        throw new Error('No text field, add one please!')
    }
    const goal = await Goal.create({
        text: req.body.text,
        user: req.user.id
    })
    res.status(200).json(goal)
})

// @desc   update goal
// @route  PUT /api/goals/:id
// @access Private
const updateGoal =  asyncHandler(async (req,res) => { //set
    const goal = await Goal.findById(req.params.id)
    
    if(!goal) {
        res.status(400)
        throw new Error('Goal not found!')
    }
    
    const user = await User.findById(req.user.id)
    //check user
    if (!user) {
        res.status(401)
        throw new Error('User not found')
    }
    //make sure user is allowed to update
    if (goal.user.toString() != user.id) {
        res.status(401)
        throw new Error('User not authorized')
    }
    const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
    })
    res.status(200).json(updatedGoal)
})

// @desc   delete goal
// @route  DELETE /api/goals/:id
// @access Private
const deleteGoal =  asyncHandler(async (req,res) => { //set
    const goal = await Goal.findById(req.params.id)
    if(!goal) {
        res.status(400)
        throw new Error('Goal not found!')
    }
    const user = await User.findById(req.user.id)
    //check user
    if (!user) {
        res.status(401)
        throw new Error('User not found')
    }
    //make sure user is allowed to update
    if (goal.user.toString() != user.id) {
        res.status(401)
        throw new Error('User not authorized')
    }
    await Goal.deleteOne()
    res.status(200).json({id: req.params.id})
})


module.exports = {
    getGoals, setGoal, updateGoal, deleteGoal
}


