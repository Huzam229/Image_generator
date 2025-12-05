import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import connectCloudinary from "./config/cloudinary.js";
import postRoutes from "./routes/PostsRoutes.js";
import GenerateImagesRoutes from "./routes/GenerateImagesRoutes.js";

dotenv.config();

const app = express();

// Connect Database
connectDB();

// Configure Cloudinary
connectCloudinary();

// Body parsers (MUST be before routes)
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

// CORS
app.use(cors({
  origin: "https://imago-omega.vercel.app",
  credentials: true
}));


// ---------------- ROUTES ----------------

app.get("/", (req, res) => {
  res.send("Hello From Server!");
});

app.use("/api/posts", postRoutes);
app.use("/api/generateImage", GenerateImagesRoutes);

// ---------------- ERROR HANDLER (must be last) ----------------
app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || "Something Went Wrong!";

  return res.status(status).json({
    success: false,
    message,
    status,
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is Running on port ${PORT}`);
});
