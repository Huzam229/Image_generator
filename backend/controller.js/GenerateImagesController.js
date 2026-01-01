
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

// import fetch from "node-fetch";

// export const generateImages = async (req, res) => {
//   try {
//     const { prompt } = req.body;

//     if (!prompt) {
//       return res.status(400).json({
//         success: false,
//         message: "Prompt is required",
//       });
//     }

//     console.log("🎨 Generating realistic image for:", prompt);

//     // Realistic but lightweight prompt
//     const enhancedPrompt = `
//       ${prompt},
//       photorealistic, cinematic lighting, sharp focus,
//       detailed textures, natural skin, realistic shadows,
//       512x512 resolution, award-winning photography style
//     `.trim();

//     const negativePrompt = `
//       cartoon, anime, illustration, blurry, low-res, fake,
//       plastic skin, distorted, watermark, text, logo
//     `;

//     const encodedPrompt = encodeURIComponent(enhancedPrompt);
//     const encodedNegative = encodeURIComponent(negativePrompt);

//     // Add proper headers to avoid 403
//     const imageUrl = `https://image.pollinations.ai/prompt/${encodedPrompt}?width=512&height=512&nologo=true&model=flux-realism&negative=${encodedNegative}&seed=${Date.now()}`;

//     const response = await fetch(imageUrl, {
//       headers: {
//         'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
//         'Accept': 'image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8',
//         'Accept-Language': 'en-US,en;q=0.9',
//         'Referer': 'https://pollinations.ai/',
//         'Origin': 'https://pollinations.ai'
//       },
//       method: 'GET'
//     });

//     console.log("Response status:", response.status);
    
//     if (!response.ok) {
//       // Log response for debugging
//       const errorText = await response.text();
//       console.error("Error response:", errorText);
//       throw new Error(`Pollinations failed: ${response.status} - ${errorText}`);
//     }

//     const buffer = await response.arrayBuffer();
//     const base64 = Buffer.from(buffer).toString("base64");

//     console.log("✅ Realistic image generated");

//     return res.status(200).json({
//       success: true,
//       photo: base64,
//     });

//   } catch (error) {
//     console.error("❌ Image Generation Error:", error);
//     return res.status(500).json({
//       success: false,
//       message: "Image generation failed",
//       error: error.message,
//     });
//   }
// };



import fetch from "node-fetch";

// Helper: Add delay between retries
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Service configurations
const imageServices = [
  {
    name: "Pollinations-Simple",
    generate: async (prompt) => {
      const url = `https://image.pollinations.ai/prompt/${encodeURIComponent(prompt)}?width=1024&height=1024&nologo=true&seed=${Date.now()}`;
      
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36',
          'Accept': 'image/webp,image/apng,image/*,*/*;q=0.8',
        },
        timeout: 45000
      });
      
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      return await response.arrayBuffer();
    }
  },
  {
    name: "Pollinations-Flux",
    generate: async (prompt) => {
      const url = `https://image.pollinations.ai/prompt/${encodeURIComponent(prompt)}?model=flux&width=1024&height=1024&nologo=true&enhance=true&seed=${Date.now()}`;
      
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
          'Accept': 'image/*',
        },
        timeout: 45000
      });
      
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      return await response.arrayBuffer();
    }
  },
  {
    name: "Hugging-Face-SDXL",
    generate: async (prompt) => {
      const response = await fetch(
        "https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-xl-base-1.0",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            inputs: `${prompt}, highly detailed, professional photography, 8k resolution, sharp focus`,
            parameters: {
              negative_prompt: "blurry, bad quality, distorted, deformed, ugly, bad anatomy",
              num_inference_steps: 25,
              guidance_scale: 7.5
            }
          }),
          timeout: 60000
        }
      );
      
      if (!response.ok) {
        const error = await response.text();
        throw new Error(`HF Error: ${error}`);
      }
      return await response.arrayBuffer();
    }
  },
  {
    name: "Hugging-Face-SD15",
    generate: async (prompt) => {
      const response = await fetch(
        "https://api-inference.huggingface.co/models/runwayml/stable-diffusion-v1-5",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            inputs: prompt,
          }),
          timeout: 60000
        }
      );
      
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      return await response.arrayBuffer();
    }
  },
  {
    name: "Segmind-SDXL",
    generate: async (prompt) => {
      const response = await fetch(
        "https://api.segmind.com/v1/sdxl1.0-txt2img",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            prompt: prompt,
            negative_prompt: "ugly, blurry, low quality",
            samples: 1,
            scheduler: "UniPC",
            num_inference_steps: 25,
            guidance_scale: 8,
            seed: Math.floor(Math.random() * 1000000),
            img_width: 1024,
            img_height: 1024,
            base64: false
          }),
          timeout: 60000
        }
      );
      
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      return await response.arrayBuffer();
    }
  }
];

// Main generation function with retries
export const generateImages = async (req, res) => {
  try {
    const { prompt } = req.body;

    // Validation
    if (!prompt || typeof prompt !== "string" || !prompt.trim()) {
      return res.status(400).json({
        success: false,
        message: "Valid prompt is required",
      });
    }

    const cleanPrompt = prompt.trim();
    console.log("🎨 Generating image for:", cleanPrompt);

    let imageBuffer = null;
    let usedService = null;
    let attemptLog = [];

    // Try each service
    for (let i = 0; i < imageServices.length; i++) {
      const service = imageServices[i];
      
      // Try each service up to 2 times
      for (let retry = 0; retry < 2; retry++) {
        try {
          const attemptNum = retry + 1;
          console.log(`📡 Attempt ${attemptNum}/2: ${service.name}...`);
          
          attemptLog.push(`${service.name} (attempt ${attemptNum})`);

          imageBuffer = await service.generate(cleanPrompt);

          // Validate we got actual image data
          if (!imageBuffer || imageBuffer.byteLength < 1000) {
            throw new Error("Invalid image data received");
          }

          usedService = service.name;
          console.log(`✅ SUCCESS with ${service.name}!`);
          break; // Exit retry loop on success
          
        } catch (error) {
          console.log(`❌ ${service.name} attempt ${retry + 1} failed:`, error.message);
          
          // Wait before retry (but not after last retry)
          if (retry < 1) {
            await delay(2000);
          }
        }
      }

      // If we got an image, stop trying other services
      if (imageBuffer) break;

      // Small delay before trying next service
      if (i < imageServices.length - 1) {
        await delay(1000);
      }
    }

    // Check if we successfully generated an image
    if (!imageBuffer) {
      console.error("❌ All services failed");
      console.error("Attempted:", attemptLog.join(", "));
      
      return res.status(503).json({
        success: false,
        message: "All image generation services are currently unavailable",
        attempted: attemptLog,
        tip: "Please try again in a moment. If the issue persists, try a simpler prompt."
      });
    }

    // Convert to base64
    const base64 = Buffer.from(imageBuffer).toString("base64");
    const sizeKB = (base64.length / 1024).toFixed(2);

    console.log(`✅ Image generated successfully`);
    console.log(`📊 Size: ${sizeKB}KB | Service: ${usedService}`);

    return res.status(200).json({
      success: true,
      photo: base64,
      metadata: {
        service: usedService,
        size: `${sizeKB}KB`,
        prompt: cleanPrompt
      }
    });

  } catch (error) {
    console.error("❌ Critical Error:", error.message);
    console.error(error.stack);
    
    return res.status(500).json({
      success: false,
      message: "Image generation failed due to server error",
      error: error.message
    });
  }
};

// Optional: Health check endpoint
export const checkServiceHealth = async (req, res) => {
  const results = [];
  
  for (const service of imageServices) {
    try {
      const testBuffer = await service.generate("test");
      results.push({
        service: service.name,
        status: "✅ Operational",
        size: `${(testBuffer.byteLength / 1024).toFixed(2)}KB`
      });
    } catch (error) {
      results.push({
        service: service.name,
        status: "❌ Down",
        error: error.message
      });
    }
  }
  
  return res.json({
    timestamp: new Date().toISOString(),
    services: results
  });
};