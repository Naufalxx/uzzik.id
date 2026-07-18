/* =========================================================
   DATA PRODUK UZZIK.ID
   =========================================================
   CARA GANTI FOTO:
   1. Taruh file foto kamu di folder images/products/
      (nama bebas, misal: chiron-1.jpg, chiron-2.jpg)
   2. Ganti nilai "img" dan "img2" di bawah jadi path lokal, contoh:
        img:  "images/products/chiron-1.jpg",
        img2: "images/products/chiron-2.jpg",
   3. "img"  = foto utama (tampil di katalog & foto besar di detail)
      "img2" = foto kedua (tampil sebagai thumbnail kedua di detail)

   CARA TAMBAH PRODUK BARU:
   - Salin satu blok { ... } di bawah, tempel sebelum tanda kurung
     kurawal penutup "]", lalu ubah semua isinya. Pastikan "id" unik.

   CARA GANTI KATEGORI:
   - Nilai "cat" harus salah satu dari: Sport, Sedan, SUV, Livery, Koin, Akun
   - Kalau mau kategori baru, tambahkan juga di index.html (bagian
     chip-row) dan di catLabel() pada js/app.js
========================================================= */

const products = [
  {
    id: 1,
    code: "UZZ-001",
    name: "NEW BMW M2 + AIRSUS",
    cat: "Sport",
    price: 130000,
    stock: "ready", // "ready" atau "limited"
    img:  "images/products/bmw-m2-1.jpeg",
    img2: "images/products/bmw-m2-2.jpeg",
    specs: { Warna: "Orange Red", Slot: "Garasi Utama", Livery: "Termasuk", Server: "Semua Server" }
  },
  {
    id: 2,
    code: "UZZ-002",
    name: "PORSCHE GT3RS",
    cat: "Sport",
    price: 30000,
    stock: "ready",
    img:  "images/products/pocem-1.jpeg",
    img2: "images/products/pocem-2.jpeg",
    specs: { Warna: "Orange Juice", Slot: "Garasi Utama", Livery: "Custom Wrap", Server: "Semua Server" }
  },
  {
    id: 3,
    code: "UZZ-003",
    name: "La-Ferrari LOGO + AIRSUS",
    cat: "Sedan",
    price: 64000,
    stock: "ready",
    img:  "images/products/LAFERRARI-1.jpeg",
    img2: "images/products/LAFERRARI-2.jpeg",
    specs: { Warna: "Dark Red Candy", Slot: "Garasi Utama", Interior: "Full Leather", Server: "Semua Server" }
  },
  {
    id: 4,
    code: "UZZ-004",
    name: "Ferrari F40 LOGO + AIRSUS",
    cat: "Sedan",
    price: 92000,
    stock: "limited",
    img:  "images/products/F40-1.jpeg",
    img2: "images/products/F40-2.jpeg",
    specs: { Warna: "Red Rosso", Slot: "Garasi Utama", Interior: "VIP Suite", Server: "Semua Server" }
  },
  {
    id: 5,
    code: "UZZ-005",
    name: "RX-7 LOGO + AIRSUS",
    cat: "SUV",
    price: 58000,
    stock: "ready",
    img:  "images/products/RX7-1.jpeg",
    img2: "images/products/RX7-2.jpeg",
    specs: { Warna: "Silver", Ban: "Offroad Set", Winch: "Termasuk", Server: "Semua Server" }
  },
  {
    id: 6,
    code: "UZZ-006",
    name: "Koenigsegg AGERA + LOGO",
    cat: "SUV",
    price: 47000,
    stock: "ready",
    img:  "images/products/AGERA-1.jpeg",
    img2: "images/products/AGERA-2.jpeg",
    specs: { Warna: "Dark Grey Stone", Ban: "All Terrain", Roof: "Rack Set", Server: "Semua Server" }
  },
  {
    id: 7,
    code: "UZZ-007",
    name: "Livery Racing Carbon Pack",
    cat: "Livery",
    price: 22000,
    stock: "ready",
    img:  "https://picsum.photos/seed/livery1/500/340",
    img2: "https://picsum.photos/seed/livery1b/500/340",
    specs: { Tipe: "Full Wrap", Kompatibel: "Mobil Sport", Format: "Siap Pasang", Server: "Semua Server" }
  },
  {
    id: 8,
    code: "UZZ-008",
    name: "Livery Drift Neon Pack",
    cat: "Livery",
    price: 19000,
    stock: "limited",
    img:  "https://picsum.photos/seed/livery2/500/340",
    img2: "https://picsum.photos/seed/livery2b/500/340",
    specs: { Tipe: "Full Wrap", Kompatibel: "Mobil Drift", Format: "Siap Pasang", Server: "Semua Server" }
  },
  {
    id: 9,
    code: "UZZ-009",
    name: "Koin CPM2 1.000.000",
    cat: "Koin",
    price: 35000,
    stock: "ready",
    img:  "https://picsum.photos/seed/coin1/500/340",
    img2: "https://picsum.photos/seed/coin1b/500/340",
    specs: { Nominal: "1.000.000", Proses: "Instan", Metode: "Top Up Akun", Server: "Semua Server" }
  },
  {
    id: 10,
    code: "UZZ-010",
    name: "Koin CPM2 5.000.000",
    cat: "Koin",
    price: 150000,
    stock: "ready",
    img:  "https://picsum.photos/seed/coin2/500/340",
    img2: "https://picsum.photos/seed/coin2b/500/340",
    specs: { Nominal: "5.000.000", Proses: "Instan", Metode: "Top Up Akun", Server: "Semua Server" }
  },
  {
    id: 11,
    code: "UZZ-011",
    name: "Akun VIP Full Unlock",
    cat: "Akun",
    price: 210000,
    stock: "limited",
    img:  "https://picsum.photos/seed/vipacc/500/340",
    img2: "https://picsum.photos/seed/vipacc2/500/340",
    specs: { Level: "Max", Garasi: "50+ Mobil", Skin: "Full Unlock", Server: "Pilih Sendiri" }
  },
  {
    id: 12,
    code: "UZZ-012",
    name: "BMW M4 Drift Spec Parts",
    cat: "Sport",
    price: 41000,
    stock: "ready",
    img:  "https://picsum.photos/seed/m4drift/500/340",
    img2: "https://picsum.photos/seed/m4drift2/500/340",
    specs: { Warna: "Sunset Orange", Setup: "Drift Tune", Part: "Widebody Kit", Server: "Semua Server" }
  }
];
