const express = require('express');
const router = express.Router();
const { generateRSS } = require('../controllers/announcement-list');

// Route untuk RSS feed
router.get("/rss", async (req, res) => {
  const rssFeed = await generateRSS();
  if (!rssFeed) {
    return res.status(500).send("Gagal membuat RSS feed");
  }
  res.set("Content-Type", "application/xml");
  res.send(rssFeed);
});

module.exports = router;
