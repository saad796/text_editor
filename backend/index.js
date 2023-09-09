const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")

const app = express()
app.use(express.json())

app.post("/publish", (req,res)=>{
    console.log(`publishing ${req.body}`);
    const response = {
        msg:"recieved the request"
    }

    res.status(200).json(response)
})

app.listen(8000 ,() => console.log("Server is running"))