const mongoose = require("mongoose");
const blogSchema = new mongoose.Schema({
    blog: {
      type: String,
      required: true,
    },
    author:{
        type : String,
        required:true
    },
    title:{
      type : String,
      required:true
    }
  },{
    timestamps:true
})

const blogModel = mongoose.model("blog",blogSchema)

module.exports = blogModel;