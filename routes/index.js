const express = require('express');
const router = express.Router();
const { generateAnnouncementList } = require('../controllers/announcement-list');

// Route untuk RSS feed
router.get("/rss", generateAnnouncementList);

module.exports = router;
