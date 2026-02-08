// import dotenv from "dotenv";
// dotenv.config();

// import express from "express";
// import axios from "axios";
// import cors from "cors";
// import path from "path";
// import { fileURLToPath } from 'url';

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// const app = express();
// app.use(cors());
// app.use(express.json());

// // ✅ Serve your HTML, CSS, and JS files from the root folder
// app.use(express.static(__dirname));

// const HF_API_URL = "https://router.huggingface.co/v1/chat/completions";
// const MODEL_NAME = "moonshotai/Kimi-K2-Instruct-0905";

// app.post("/chat", async (req, res) => {
//   const userMessage = req.body.message;
//   if (!userMessage) return res.status(400).json({ error: "Message required" });

//   try {
//     const response = await axios.post(HF_API_URL, {
//       model: MODEL_NAME,
//       messages: [{ role: "user", content: userMessage }]
//     }, {
//       headers: {
//         Authorization: `Bearer ${process.env.HF_API_KEY}`,
//         "Content-Type": "application/json"
//       }
//     });

//     res.json({ reply: response.data.choices?.[0]?.message?.content || "No response" });
//   } catch (err) {
//     console.error("HF Error:", err.response?.data || err.message);
//     res.status(500).json({ error: "Model API error" });
//   }
// });

// // ✅ MUST use process.env.PORT for deployment
// const PORT = process.env.PORT || 10000;
// app.listen(PORT, '0.0.0.0', () => {
//   console.log(`✅ Server running on port ${PORT}`);
// });

import express from "express";
import axios from "axios";
import cors from "cors";
import path from "path";
import { fileURLToPath } from 'url';
import dotenv from "dotenv";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(__dirname)); // Serves your index.html automatically

const HF_API_URL = "https://router.huggingface.co/v1/chat/completions";
const MODEL_NAME = "moonshotai/Kimi-K2-Instruct-0905";

app.post("/chat", async (req, res) => {
  const { message } = req.body;
  if (!message) return res.status(400).json({ error: "Message is required" });

  try {
    const response = await axios.post(HF_API_URL, {
      model: MODEL_NAME,
      messages: [{ role: "user", content: message }],
      max_tokens: 1000
    }, {
      headers: {
        "Authorization": `Bearer ${process.env.HF_API_KEY}`,
        "Content-Type": "application/json"
      }
    });

    const aiReply = response.data.choices?.[0]?.message?.content || "I couldn't generate a reply.";
    res.json({ reply: aiReply });
    
  } catch (err) {
    console.error("AI Error:", err.response?.data || err.message);
    res.status(500).json({ error: "The AI is currently unavailable. Check logs." });
  }
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`✅ Sandesh AI Live on port ${PORT}`);
});