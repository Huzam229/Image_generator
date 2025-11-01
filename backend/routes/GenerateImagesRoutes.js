import express from "express";
import { generateImages } from "../controller.js/GenerateImagesController.js";

const GenerateImagesRoutes = express.Router();

GenerateImagesRoutes.post("/generate-Image", generateImages);

export default GenerateImagesRoutes;
