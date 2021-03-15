const express = require("express")
const mongoose = require("mongoose")
const config = require("config")
const authRouter = require("./routes/auth.routes")
const flightRouter = require("./routes/Flight")
const passangersRouter = require('./routes/passangers')
const app = express()
const PORT = config.get('serverPort')
const corsMiddleware = require('./middleware/cors.middleware')

app.use(corsMiddleware)

app.use(express.json())

app.use("/api/auth", authRouter)
app.use('/api/flight', flightRouter)
app.use('/api/passangers', passangersRouter)

const start = async () => {
    try {
        await mongoose.connect(config.get("dbUrl"), {
            useNewUrlParser:true,
            useUnifiedTopology:true,
            useFindAndModify:false
        })

        app.listen(PORT, () => {
            console.log('Server started on port ', PORT)
        })
    } catch (e) {
        console.log(e)
    }
}

start()