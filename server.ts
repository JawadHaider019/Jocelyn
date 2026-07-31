import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Route: Custom gift curation and personalized note
  app.post("/api/curate-gift", async (req, res) => {
    try {
      const { hobbies, relax, drinks, cravings, name } = req.body;
      const recipientName = name || "Valued Friend";

      const apiKey = process.env.GEMINI_API_KEY;

      if (apiKey && apiKey !== "MY_GEMINI_API_KEY") {
        try {
          const ai = new GoogleGenAI({
            apiKey,
          });
          const prompt = `You are a luxury gift curator for Jocelyn & Co. 
The recipient is ${recipientName}.
Their choices:
- Hobbies & Activities: ${Array.isArray(hobbies) ? hobbies.join(", ") : hobbies}
- Relaxation: ${Array.isArray(relax) ? relax.join(", ") : relax}
- Favorite Drinks: ${Array.isArray(drinks) ? drinks.join(", ") : drinks}
- Food Cravings: ${Array.isArray(cravings) ? cravings.join(", ") : cravings}

Please generate a JSON object with:
1. "boxTitle": A catchy, elegant title for their custom gift product (e.g. "The Zen & Artisan Refresh Special")
2. "customMessage": A short 2-3 sentence warm handwritten-style gift note crafted specifically mentioning their tastes (e.g. sipping green tea after a workout).
3. "curatedHighlights": An array of 1 primary featured luxury gift item (e.g. "Organic Imperial Matcha Blend").
4. "tagline": A 1-sentence tagline.

Respond strictly in valid JSON without markdown formatting.`;

          const response = await ai.models.generateContent({
            model: "gemini-2.0-flash",
            contents: prompt,
          });

          const responseText = response.text || "";
          const cleanedText = responseText.replace(/```json/g, "").replace(/```/g, "").trim();
          const parsed = JSON.parse(cleanedText);

          return res.json({ success: true, gift: parsed, source: "curator-engine" });
        } catch (aiErr) {
          console.error("Curator API call error, using smart fallback:", aiErr);
        }
      }

      // Smart Fallback Curation Engine
      const drinkStr = Array.isArray(drinks) ? drinks.join(" & ") : (drinks || "Chai Tea");
      const cravingStr = Array.isArray(cravings) ? cravings.join(" & ") : (cravings || "Sweets & Savory");
      const hobbyStr = Array.isArray(hobbies) ? hobbies[0] : (hobbies || "Fitness");

      const gift = {
        boxTitle: `The ${craftBoxName(drinks, cravings)} Gift Collection`,
        customMessage: `Dear ${recipientName}, curated specially for your love of ${drinkStr} and ${cravingStr}! Whether you are enjoying your favorite ${hobbyStr} routine or unwinding at home, we hope this bring pure delight.`,
        curatedHighlights: [
          `Premium ${drinkStr || "Artisanal Tea"} Selection`
        ],
        tagline: "Curated with care to bring warmth, flavor, and relaxation to your doorstep."
      };

      return res.json({ success: true, gift, source: "curator-engine" });
    } catch (err: any) {
      console.error("Error in /api/curate-gift:", err);
      res.status(500).json({ success: false, error: err.message });
    }
  });

  // Mock recommendation submissions endpoint
  app.post("/api/recommendation", (req, res) => {
    const { name, rating, comment, recipient } = req.body;
    res.json({
      success: true,
      message: "Recommendation received! Thank you for sharing your experience.",
      id: "REC-" + Math.floor(100000 + Math.random() * 900000),
      timestamp: new Date().toISOString()
    });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

function craftBoxName(drinks: any, cravings: any): string {
  const d = Array.isArray(drinks) ? drinks[0] : drinks;
  const c = Array.isArray(cravings) ? cravings[0] : cravings;
  if (d?.includes("Tea")) return "Zen Tea & Artisan";
  if (d?.includes("Coffee")) return "Morning Brew & Roast";
  if (c?.includes("Sweets")) return "Sweet Indulgence & Calm";
  return "Luxury Unwind";
}

startServer();
