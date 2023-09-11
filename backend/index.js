const express = require("express")
const mongoose = require("mongoose")
const bodyParser = require("body-parser")
const blogStore = []

const app = express()
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())

app.post("/publish",async (req,res)=>{
    console.log("data ",req.body);
    blogStore.push(req.body.content);
    console.log(blogStore);
    const response = {
        msg:"recieved the request"
    }

    res.status(200).json(response)
})

app.get("/blog",(req,res)=>{
    const result ={
        blog: blogStore
    }
    res.status(200).json(result)
})

app.listen(8000 ,() => console.log("Server is running"))