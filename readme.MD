# RSS Kemendikbud

RSS feed generator untuk pengumuman dari website Direktorat Jenderal Pendidikan Tinggi (Dikti) Kemendikbud.

*RSS feed generator for announcements from the Directorate General of Higher Education (Dikti) Kemendikbud website.*

## Deskripsi | Description

Proyek ini mengambil data pengumuman dari halaman [Dikti Kemdikbud](https://dikti.kemdikbud.go.id/category/pengumuman) dan mengubahnya menjadi format RSS feed yang dapat digunakan di RSS reader.

*This project scrapes announcement data from [Dikti Kemdikbud](https://dikti.kemdikbud.go.id/category/pengumuman) page and converts it into RSS feed format that can be used in RSS readers.*

## Fitur | Features

- Mengambil data pengumuman terbaru dari website Dikti
- Mengkonversi data ke format RSS
- Menyediakan endpoint API untuk mengakses RSS feed
- Mendukung format tanggal Indonesia

*- Fetches latest announcements from Dikti website*
*- Converts data to RSS format*
*- Provides API endpoint to access the RSS feed*
*- Supports Indonesian date format*

## Teknologi yang Digunakan | Tech Stack

- Node.js
- Express.js
- Axios
- Cheerio
- date-fns
- RSS

## Instalasi | Installation

1. Clone repository ini:
```bash
git clone https://github.com/antoniluthfi/rss-kemendikbud.git
```

2. Masuk ke direktori proyek:
```bash
cd rss-kemendikbud
```

3. Install dependensi:
```bash
npm install
```

4. Jalankan aplikasi:
```bash
npm start
```

Server akan berjalan di `http://localhost:3000`

## Penggunaan | Usage

Akses RSS feed melalui endpoint berikut:

```
http://localhost:3000/rss
```

## Lisensi | License

[MIT License](LICENSE)

## Kontributor | Contributor

- Lintang Luthfiantoni

## Masalah | Issues

Jika Anda menemukan masalah atau bug, silakan buat issue baru di [GitHub Issues](https://github.com/antoniluthfi/rss-kemendikbud/issues).

*If you find any problems or bugs, please create a new issue in [GitHub Issues](https://github.com/antoniluthfi/rss-kemendikbud/issues).*