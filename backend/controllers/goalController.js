// @desc   get goals
// @route  GET /api/goals
// @access Private
const getGoals = (req,res) => { //get
    res.status(200).json({ message: 'get goals'  })
}

// @desc   set goal
// @route  POST /api/goals
// @access Private
const setGoal = (req,res) => { //set
    
    if(!req.body.text) {
        res.status(400)
        throw new Error('No text field, add one please!')
    }
    res.status(200).json({ message: 'set goals' })
}

// @desc   update goal
// @route  PUT /api/goals/:id
// @access Private
const updateGoal = (req,res) => { //set
    res.status(200).json({ message: `Update goals with ${req.params.id}` })
}

// @desc   delete goal
// @route  DELETE /api/goals/:id
// @access Private
const deleteGoal = (req,res) => { //set
    res.status(200).json({ message: `Delete goals with ${req.params.id}` })
}


module.exports = {
    getGoals, setGoal, updateGoal, deleteGoal
}


