const express = require("express")
const mongoose = require("mongoose")
const bodyParser = require("body-parser")
const blogModel = require("./blogSchema")
const cors = require("cors")

const blogStore = []

const app = express()
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));


app.use(cors())


// database Configuration
async function connectDB()
{
  await mongoose.connect("mongodb://127.0.0.1:27017/blogDB")
  console.log("Connected to db");
}
connectDB()

async function addBlogToDB(data)
{
    const dbData = {
        blog: data.content,
        author: data.author
    }
    try {
        const blog = new blogModel(dbData);
        const saveBlog = await blog.save()
        if(saveBlog === blog)
        {
          return true
        }
        else
        {
          return false
        }
        
    } catch (error) {
        console.log(error);
        return(false)
    }
}


app.post("/publish",async (req,res)=>{
    console.log("data ",req.body);
    const dbStatus = await addBlogToDB(req.body);
    blogStore.push(req.body.content)
    if(dbStatus)
    {
        const response = {
            msg:"recieved the request",
            blog : blogStore,
            status : true
        }
        
        res.status(200).json(response)
    }
    else
    {
        const response = {
            msg:"Could not store blog",
            status : false
        }
        res.status(500).json(response)
    }
})

app.get("/blog",async (req,res)=>{
    const data  = await blogModel.find();
    const result ={
        blog: data
    }
    res.status(200).json(result)
})

app.listen(8000 ,() => console.log("Server is running"))