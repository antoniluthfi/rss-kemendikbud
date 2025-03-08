const axios = require("axios");
const cheerio = require("cheerio");
const RSS = require("rss");
const { parse, format } = require("date-fns");
const { id } = require("date-fns/locale");

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

    $(".archive-list a").each((i, el) => {
      const title = $(el).find(".card-content h3 span").text().trim();
      const url = $(el).attr("href");
      const dateText = $(el).find(".card-content .card-date").text().trim(); // Ambil teks tanggal

      // Konversi tanggal ke format RFC-1123
      let pubDate = "Invalid Date";
      if (dateText) {
        const [datePart, timePart] = dateText.split(" | ");
        const timeValue = timePart.replace(" WIB", "").split(":");

        try {
          let parsedDate = parse(datePart, "d MMMM yyyy", new Date(), {
            locale: id,
          });
          // Set the hours and minutes
          parsedDate.setHours(parseInt(timeValue[0]));
          parsedDate.setMinutes(parseInt(timeValue[1]));
          // Convert WIB (UTC+7) to GMT/UTC
          parsedDate.setHours(parsedDate.getHours() - 7);
          pubDate = format(parsedDate, "EEE, dd MMM yyyy HH:mm:ss 'GMT'", {
            locale: id,
          });
        } catch (err) {
          console.error("Gagal parsing tanggal:", dateText);
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
