const express = require("express");
const axios = require("axios");
const path = require("path");
const app = express();

const WEBHOOK_URL = "https://discord.com/api/webhooks/1436398826356215938/E4Ddf4eBJS5q1UWQPODs7diWZ9Oy7f6N2T7Jy44pSqq0JMdG_LUZLpG6tPJlSA9W4hIM";

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// ✅ Main route to send any type of Discord message
app.post("/send", async (req, res) => {
  const { category, message } = req.body;

  if (!message) {
    return res.status(400).json({ error: "Message content missing" });
  }

  try {
    await axios.post(WEBHOOK_URL, {
      content: message,
    });

    console.log(`✅ Sent ${category || "general"} message to Discord`);
    res.status(200).send("✅ Message sent successfully!");
  } catch (err) {
    console.error("❌ Error sending webhook:", err.message);
    res.status(500).send("❌ Failed to send message to Discord");
  }
});

// ✅ Server start
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`✅ Website running on port ${PORT}`));
