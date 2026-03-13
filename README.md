# Sistem Pelacakan Alumni UMM

## Deskripsi
Sistem ini digunakan untuk melakukan pelacakan alumni Universitas Muhammadiyah Malang dengan memanfaatkan query generator, tracking sources, dan confidence scoring.

## Fitur Sistem
- Dashboard statistik alumni
- Query Generator
- Tracking Sources
- Confidence Score Engine
- Riwayat Pelacakan
- Grafik Statistik Alumni

## Teknologi
- HTML
- CSS
- JavaScript
- Bootstrap
- Chart.js
- LocalStorage

## Link Project

### Source Code
https://github.com/username/alumni-tracker

### Live Website
https://lacakalumniumm-alfarizi.netlify.app/


## Pengujian Sistem

| No | Fitur Sistem | Skenario Pengujian | Hasil yang Diharapkan | Hasil Pengujian | Status |
|----|-------------|-------------------|----------------------|----------------|--------|
| 1 | Tambah Alumni | User mengisi data alumni lalu klik tombol tambah | Data alumni tersimpan dan tampil di tabel | Data berhasil tampil di tabel | Berhasil |
| 2 | Query Generator | User menekan tombol Track pada alumni | Sistem menghasilkan beberapa query pencarian alumni | Query muncul pada panel Query Generator | Berhasil |
| 3 | Tracking Sources | Sistem melakukan simulasi pelacakan sumber alumni | Sistem menampilkan sumber tracking | Sumber tracking muncul pada panel Tracking Sources | Berhasil |
| 4 | Confidence Score | Sistem menghitung tingkat kecocokan data | Confidence score tampil dalam persen | Score tampil pada progress bar | Berhasil |
| 5 | Status Alumni | Sistem menentukan status alumni berdasarkan score | Status menjadi Teridentifikasi / Verifikasi / Belum Ditemukan | Status berubah sesuai score | Berhasil |
| 6 | Statistik Alumni | Sistem menampilkan grafik statistik alumni | Grafik statistik muncul di dashboard | Grafik tampil menggunakan ChartJS | Berhasil |
| 7 | Riwayat Pelacakan | User membuka halaman history | Sistem menampilkan riwayat pelacakan alumni | Data history tampil di tabel | Berhasil |
| 8 | Penyimpanan Data | Sistem menyimpan data pada localStorage | Data tetap ada setelah halaman direfresh | Data tetap tersimpan | Berhasil |

## Pengujian Aspek Kualitas Sistem

| No | Aspek Kualitas | Metode Pengujian | Hasil |
|----|---------------|------------------|------|
| 1 | Functionality | Menguji seluruh fitur sistem | Semua fitur berjalan dengan baik |
| 2 | Usability | Pengujian kemudahan penggunaan sistem | Antarmuka mudah digunakan |
| 3 | Performance | Pengujian respon sistem saat menambah dan melacak data | Sistem merespon dengan cepat |
| 4 | Reliability | Pengujian penyimpanan data menggunakan localStorage | Data tersimpan dengan stabil |
| 5 | Interface | Pengujian tampilan dashboard dan grafik | UI tampil dengan baik dan responsif |
