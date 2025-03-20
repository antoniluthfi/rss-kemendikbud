const axios = require("axios");
const cheerio = require("cheerio");
const RSS = require("rss");

// Fungsi untuk mengambil dan mengonversi data ke RSS
const generateRSS = async (baseUrl) => {
  const feed = new RSS({
    title: "Pengumuman Dikti Kemdikbud",
    description: "RSS feed dari halaman pengumuman Dikti Kemdikbud",
    feed_url: `${baseUrl}/rss`,
    site_url: "https://dikti.kemdikbud.go.id/category/pengumuman",
    language: "id",
  });

  try {
    const response = await axios.get(
      "https://dikti.kemdikbud.go.id/category/pengumuman"
    );
    const $ = cheerio.load(response.data);

    $(".archive-list a.card-artikel").each((i, el) => {
      const title = $(el).find(".card-content h3 span").text().trim();
      const url = $(el).attr("href");
      const dateText = $(el).find(".card-content .card-date").text().trim(); // Ambil teks tanggal

      // Konversi tanggal ke format RFC-1123
      let pubDate = "Invalid Date";
      if (dateText) {
        try {
          // Check if dateText follows expected pattern
          if (!dateText.includes(" | ")) {
            throw new Error("Date format incorrect");
          }
          
          const [datePart, timePart] = dateText.split(" | ");
          
          if (!timePart || !timePart.includes(":")) {
            throw new Error("Time format incorrect");
          }
          
          const timeValue = timePart.replace(" WIB", "").trim().split(":");
          
          // Create date object manually for maximum control
          const monthMap = {
            "januari": 0, "februari": 1, "maret": 2, "april": 3, "mei": 4, "juni": 5,
            "juli": 6, "agustus": 7, "september": 8, "oktober": 9, "november": 10, "desember": 11
          };
          
          const dateComponents = datePart.split(" ");
          
          if (dateComponents.length !== 3) {
            throw new Error("Date component format incorrect");
          }
          
          const day = parseInt(dateComponents[0], 10);
          const monthLower = dateComponents[1].toLowerCase();
          const year = parseInt(dateComponents[2], 10);
          const hours = parseInt(timeValue[0], 10);
          const minutes = parseInt(timeValue[1], 10);
          
          if (isNaN(day) || isNaN(year) || isNaN(hours) || isNaN(minutes)) {
            throw new Error("Date parsing failed - non-numeric components");
          }
          
          const monthIndex = monthMap[monthLower];
          if (monthIndex === undefined) {
            throw new Error("Unknown month");
          }
          
          // Create date in WIB timezone
          const parsedDate = new Date(Date.UTC(year, monthIndex, day, hours - 7, minutes));
          if (isNaN(parsedDate.getTime())) {
            throw new Error("Invalid date created");
          }
          
          // Format the date according to RFC-822, which is the standard for RSS
          pubDate = parsedDate.toUTCString();
        } catch (err) {
          console.error("Gagal parsing tanggal:", err.message);
          console.error("Date text was:", dateText);
        }
      }

      if (title && url) {
        feed.item({
          title,
          url,
          date: pubDate,
        });
      }
    });

    return feed.xml();
  } catch (error) {
    console.error("Gagal mengambil data:", error);
    return null;
  }
};

// Endpoint untuk RSS feed
const generateAnnouncementList = async (req, res) => {
  const rssFeed = await generateRSS(`https://${req.headers.host}`);
  if (!rssFeed) {
    return res.status(500).send("Gagal membuat RSS feed");
  }
  res.setHeader("Content-Type", "application/xml");
  res.send(rssFeed);
};

module.exports = {
  generateAnnouncementList,
};
