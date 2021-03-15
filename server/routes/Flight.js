const {Router}=require('express')
const Flight =require('../models/Flight')
const router =Router()

router.get('/', async (req, res) => {
    try {
        const flight = await Flight.find()
        console.log(flight)
        return res.json(flight)
    } catch (error) {
        console.log(error)
    }
  })

  router.get('/:id', async (req, res) => {
    try {
        const flight = await Flight.find(req.params.id)
        return res.json({
        from: flight.from,
        to: flight.to,
        dateThere: flight.dateThere,
        dateBack: flight.dateBack,
        cost: flight.cost,
        passanger: flight.passanger   
        })
    } catch (error) {
        console.log(error)
    }
  })

  router.post('/edit', async (req, res) => {
    try {
        const {id}=req.body
        delete req.body.id
        await Flight.findByIdAndUpdate(id, req.body)
        res.send({message:"done"})
    } catch (error) {
        console.log(error)
    }
  })

    router.post('/remove', async(req, res)=>{
        try{
            await Flight.deleteOne({_id:req.body.id})
            res.send({message:"Flight was deleted"})
        }catch(error){
        console.log(error)
        }
    })
    router.post('/', async (req, res) => {
        const flight= new Flight ({
        from: req.body.from,
        to: req.body.to,
        dateThere: Date.parse(req.body.dateThere),
        dateBack: Date.parse(req.body.dateBack),
        cost:req.body.cost,
        passanger: []
        })
        try {
            await flight.save()
            res.send({message:"Flight was created"})
        } catch (error) {
        console.log(error)
        }
   
  })
  module.exports=router