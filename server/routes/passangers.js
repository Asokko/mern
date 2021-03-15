const {Router}=require('express')
const Flight =require('../models/Flight')
const User =require('../models/User')
const router =Router()

router.post('/', async (req, res) => {
    try {     
    const flight =await Flight.findById(req.body.id)
    flight.addToPassanger(req.body.userId)
    const user=await User.findById(req.body.userId)
    await user.addToFlight(req.body.id)
    res.send({message:"passanger added to flight"})
    } catch (error) {
    console.log(error)
    }
})
module.exports=router