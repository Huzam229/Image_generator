
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

    // Reduced size to prevent timeout
    const imageUrl = `https://image.pollinations.ai/prompt/${encodedPrompt}?width=512&height=512&nologo=true&model=flux-realism&negative=${encodedNegative}&seed=${Date.now()}`;

    const response = await fetch(imageUrl);

    console.log("Response status:", response.status);
    if (!response.ok) {
      throw new Error(`Pollinations failed: ${response.status}`);
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


