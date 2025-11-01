export const generateImages = async (req, res) => {
  try {
    const { prompt } = req.body;

    // Encode prompt for URL
    const encodedPrompt = encodeURIComponent(prompt);

    // Generate image URL
    const imageUrl = `https://image.pollinations.ai/prompt/${encodedPrompt}?width=1024&height=1024&nologo=true`;

    // Fetch the image
    const response = await fetch(imageUrl);

    if (!response.ok) {
      throw new Error("Failed to generate image");
    }

    const buffer = await response.arrayBuffer();
    const base64 = Buffer.from(buffer).toString("base64");

    res.status(200).json({ photo: base64 });
  } catch (error) {
    console.error("Pollinations Error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to generate image",
      error: error.message,
    });
  }
};

// import axios from "axios";
// import dotenv from "dotenv";
// import { createError } from "../error.js";
// dotenv.config();

// export const generateImages = async (req, res, next) => {
//   try {
//     const { prompt } = req.body;

//     const response = await axios.post(
//       "https://api.openai.com/v1/images/generations",
//       {
//         prompt,
//         n: 1,
//         size: "1024x1024"
//       },
//       {
//         headers: {
//           "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
//           "Content-Type": "application/json"
//         }
//       }
//     );

//     const generatedImage = response.data.data[0].b64_json;

//     return res.status(200).json({ success: true, photo: generatedImage });

//   } catch (error) {
//     next(createError(error.status || 500, error?.response?.data?.error?.message || error?.message));
//   }
// };
