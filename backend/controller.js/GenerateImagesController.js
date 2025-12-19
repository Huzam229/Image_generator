
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

import fetch from "node-fetch";

export const generateImages = async (req, res) => {
  try {
    const { prompt } = req.body;

    if (!prompt) {
      return res.status(400).json({
        success: false,
        message: "Prompt is required",
      });
    }

    console.log("🎨 Generating realistic image for:", prompt);

    // Realistic but lightweight prompt
    const enhancedPrompt = `
      ${prompt},
      photorealistic, cinematic lighting, sharp focus,
      detailed textures, natural skin, realistic shadows,
      512x512 resolution, award-winning photography style
    `.trim();

    const negativePrompt = `
      cartoon, anime, illustration, blurry, low-res, fake,
      plastic skin, distorted, watermark, text, logo
    `;

    const encodedPrompt = encodeURIComponent(enhancedPrompt);
    const encodedNegative = encodeURIComponent(negativePrompt);

    // Add proper headers to avoid 403
    const imageUrl = `https://image.pollinations.ai/prompt/${encodedPrompt}?width=512&height=512&nologo=true&model=flux-realism&negative=${encodedNegative}&seed=${Date.now()}`;

    const response = await fetch(imageUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.9',
        'Referer': 'https://pollinations.ai/',
        'Origin': 'https://pollinations.ai'
      },
      method: 'GET'
    });

    console.log("Response status:", response.status);
    
    if (!response.ok) {
      // Log response for debugging
      const errorText = await response.text();
      console.error("Error response:", errorText);
      throw new Error(`Pollinations failed: ${response.status} - ${errorText}`);
    }

    const buffer = await response.arrayBuffer();
    const base64 = Buffer.from(buffer).toString("base64");

    console.log("✅ Realistic image generated");

    return res.status(200).json({
      success: true,
      photo: base64,
    });

  } catch (error) {
    console.error("❌ Image Generation Error:", error);
    return res.status(500).json({
      success: false,
      message: "Image generation failed",
      error: error.message,
    });
  }
};