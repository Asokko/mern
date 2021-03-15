const {Schema, model}=require("mongoose")

const Flight = new Schema({
    from:{
        type:String,
        required:true,
    },
    to:{
        type:String,
        required:true,
    },
    dateThere:{
        type:Date,
        required:true,
    },
    dateBack:{
        type:Date,
        required:true,
    },
    cost:{
        type:String,
    },
    passanger:[{
        type: Schema.Types.ObjectId,
        ref: 'User',
        required:true
    }]
})
Flight.methods.addToPassanger = function(passangerId) {
    this.passanger.push(passangerId)
    return this.save()
  }


module.exports=model("Flight",Flight);