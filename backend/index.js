import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import connectCloudinary from "./config/cloudinary.js";
import postRoutes from "./routes/PostsRoutes.js";
import GenerateImagesRoutes from "./routes/GenerateImagesRoutes.js";


dotenv.config();

const app = express();
//database connection
connectDB(); // define in db.js file
// middlewares
connectCloudinary();
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(
  cors()
);

// error handler 

app.use((err,req,res,next)=>{
    const status = err.status || 500;
    const message = err.message || "Something Went Wrong!"

    return res.status(status).json({
        message,
        success:false,
        status
    })
})

const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("Hello From Serve!");
});

app.use("/api/posts/",postRoutes)
app.use("/api/generateImage/",GenerateImagesRoutes)

app.listen(PORT, () => {
  console.log(`Server is Running on port ${PORT}`);
});
