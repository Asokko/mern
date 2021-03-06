const Router=require("express");
const User=require("../models/User");
const jwt = require("jsonwebtoken")
const config=require("config")
const router=new Router();
const {check , validationResult}=require("express-validator");
const bcrypt=require("bcryptjs");
const authMiddleware=require('../middleware/auth.middleware')


router.post('/registration',
    [
        check('email', "Uncorrect email").isEmail(),
        check('password', 'Password must be longer than 3 and shorter than 12').isLength({min:3, max:12}),
        check('name', 'name must be longer than 2 and shorter than 12').isLength({min:2, max:12}),
        check('number','Uncorrect phone number').isMobilePhone(),
    ],
    async (req, res) => {
    try {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({message: "Uncorrect request", errors})
        }
        const {name,email, password,number} = req.body
        const candidate = await User.findOne({email})
        if(candidate) {
            return res.status(400).json({message: `User with email ${email} already exist`})
        }
        const hashPassword = await bcrypt.hash(password, 8)
        const user = new User({name, email, password: hashPassword,number})
        await user.save()
        res.json({message: "User was created"})
    } catch (e) {
        console.log(e)
        res.send({message: "Server error"})
    }
})

router.post('/login',
    async (req, res) => {
    try {
        console.log(req.body)
       const {email, password}=req.body
       const user=await User.findOne({email})
       if(!user){
           return res.status(404).json({message:"user not found"})
       }
       const isPassidValid=bcrypt.compareSync(password,user.password)
       if(!isPassidValid){
           return res.status(404).json({message:"invalid password"})
       }
       const token =jwt.sign({id:user.id},config.get("secretKey"),{expiresIn:"1h"})
       return res.json({
           token,
           user:{
               id:user.id,
               name:user.name,
               email:user.email,
               number:user.number,
               role:user.role
           }
       })
    } catch (e) {
        console.log(e)
        res.send({message: "Server error"})
    }
})

router.get('/auth',authMiddleware,
    async (req, res) => {
    try {
        const user=await User.findOne({_id:req.user.id})
        const token =jwt.sign({id:user.id},config.get("secretKey"),{expiresIn:"1h"})
        return res.json({
            token,
            user:{
                id:user.id,
                name:user.name,
                email:user.email,
                number:user.number,
                role:user.role
            }
        })
    } catch (e) {
        console.log(e)
        res.send({message: "Server error"})
    }
})

module.exports=router