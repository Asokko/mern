const {Schema, model}=require('mongoose');

const User=new Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
        unique:true,
    },
    number:{
        type:String,
        required:true,
        unique:true,
    },
    role:{
        type:String,
        default:"user",
    },
    flight:{
        type:Schema.Types.ObjectId,
        ref:'Flight',
        required:true
    }
})

User.methods.addToFlight = function(flightId) {
    this.flight = flightId
    return this.save()
  }

module.exports=model("User",User);