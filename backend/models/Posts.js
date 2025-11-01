import mongoose from "mongoose";

const PostScheme = new mongoose.Schema({

    name:{
        type: String ,
        required: true,
    },
    prompt:{
        type: String ,
        required: true,
    },
    photo:{
        type: String ,
        required: true,
    }
})

const Post = mongoose.model("Post",PostScheme)

export default Post;