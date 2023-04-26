const express = require('express');
const mongoose = require('mongoose')
const cors = require('cors')
const userRouter = require('./routes/User')

// config
const server = express();
const PORT = 4000
require('dotenv').config()
server.use(cors())
server.use(express.json())

// Routes
server.use('/api/v1', userRouter)

server.get('*', (req,res) => {
    res.send('This Route does not exists')
})


// dB connection
const startserver = async()=>{
    await mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.5kk0hsk.mongodb.net/${process.env.DB}?retryWrites=true&w=majority`)
    server.listen(PORT, ()=>{
        console.log(`server is listening on port ${PORT}`);
    })
}
// c4Gb5i$AFgMN@.L
startserver()