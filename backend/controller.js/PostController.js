import Post from "../models/Posts.js";
import { createError } from "../error.js";
import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";

dotenv.config();


export const getAllPosts = async (req, res, next) => {
  try {
    const posts = await Post.find({});
    return res.status(200).json({ success: true, data: posts });
  } catch (error) {
    next(
      createError(
        error.status,
        error?.response?.data?.error?.message || error?.message
      )
    );
  }
};

// Create Posts

export const createPost = async (req, res, next) => {
  try {
    const { name, prompt, photo } = req.body;
    const photoUrl = await cloudinary.uploader.upload(photo, {
      folder: 'dalle-images',  
    });
    const newPost = await Post.create({
      name,
      prompt,
      photo: photoUrl?.secure_url,
    });

    return res.status(201).json({
      success: true, 
      message: "Post Created Successfully", 
      data: newPost
    });

  } catch (error) { 
    next(
      createError(
        error.status,
        error?.response?.data?.error?.message || error?.message
      )
    );
  }
};