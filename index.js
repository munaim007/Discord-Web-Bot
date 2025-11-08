const express = require("express");
const path = require("path");
const app = express();

// Define webhooks
const GIVE_WEBHOOK = "https://discord.com/api/webhooks/1436398826356215938/E4Ddf4eBJS5q1UWQPODs7diWZ9Oy7f6N2T7Jy44pSqq0JMdG_LUZLpG6tPJlSA9W4hIM";
const TAKE_WEBHOOK = "https://discord.com/api/webhooks/1436797184732561408/kJaO4qFGaoDsqNPFU63lcrecqizBt_UwfQSSi1MHH9nEsjoqAtogSmI4TKjBwQ7d3K4v";
const PENDING_WEBHOOK = "https://discord.com/api/webhooks/1436809087672127489/TQHvNjzuPNRW9CR22idPLettusxSPFbByIXae7glGtdowdwmqhpoIVuvNY9nBx3csIGy";

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.post("/send-weapons", async (req, res) => {
  const { message, action } = req.body;

  try {
    let webhookUrl;

    if (action === "take") {
      webhookUrl = TAKE_WEBHOOK;
    } else if (action === "pending") {
      webhookUrl = PENDING_WEBHOOK;
    } else {
      webhookUrl = GIVE_WEBHOOK;
    }

    // ✅ Node.js v18+ has fetch built-in
    await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content: message }),
    });

    res.json({ success: true });
  } catch (err) {
    console.error("Error sending webhook:", err);
    res.status(500).json({ error: "Failed to send webhook" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`✅ Website running on port ${PORT}`));
