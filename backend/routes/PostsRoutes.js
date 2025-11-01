import express from "express";
import { createPost, getAllPosts } from "../controller.js/PostController.js";

const postRoutes  = express.Router()


postRoutes.get("/get-posts",getAllPosts);
postRoutes.post("/create-posts",createPost);



export default postRoutes;