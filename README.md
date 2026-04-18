# RevoBank API - Milestone 4

RevoBank API adalah sebuah sistem backend perbankan fiktif yang dikembangkan menggunakan **NestJS** dan **Prisma ORM**. Sistem ini dirancang untuk mendukung operasional perbankan esensial seperti manajemen akun pengguna, pengelolaan saldo, dan pemrosesan transaksi keuangan (Deposit, Withdraw, dan Transfer).

## 🚀 Fitur Utama
- **Autentikasi Aman:** Registrasi dan Login menggunakan JWT (JSON Web Token).
- **Manajemen Akun:** CRUD lengkap untuk akun bank milik nasabah.
- **Operasi Transaksi:** - Deposit: Menambah saldo.
  - Withdraw: Penarikan saldo dengan validasi kecukupan dana.
  - Transfer: Pengiriman dana antar akun dalam satu transaksi database (atomic transaction).
- **Dokumentasi API:** Terintegrasi dengan Swagger untuk kemudahan testing endpoint.
- **Deployment:** Terdeploy di platform cloud (Railway).

## 🛠 Teknologi yang Digunakan
- **Framework:** NestJS
- **ORM:** Prisma
- **Database:** PostgreSQL (via Supabase)
- **Autentikasi:** Passport-JWT
- **Deployment:** Railway
- **Validasi:** class-validator & class-transformer

## 🌐 Dokumentasi API (Swagger)
Dokumentasi interaktif dapat diakses melalui link berikut:
**[Klik di sini untuk Dokumentasi API](https://URL_RAILWAY_BAPAK/api/docs)**

## ⚙️ Cara Menjalankan Proyek Secara Lokal

1. **Clone repositori ini:**
   ```bash
   git clone [https://github.com/Tommy-Poernomo/-milestone-4-tommypoernomo.git](https://github.com/Tommy-Poernomo/-milestone-4-tommypoernomo.git)

2. **Install dependencies:**
  ```bash
   npm install

3. **Konfigurasi variabel lingkungan (.env):**
  ```bash
   DATABASE_URL="postgresql://user:password@host:port/database"
   JWT_SECRET="rahasia_revobank_tommy"
   PORT=3000

4. **Jalankan migrasi Prisma:**
  ```bash
   npx prisma generate
   npx prisma db push

5. **Jalankan aplikasi:**
  ```bash
   npm run start:dev

📈 Endpoint Utama

    POST /auth/register : Registrasi nasabah baru.

    POST /auth/login : Login untuk mendapatkan token JWT.

    POST /accounts : Membuat akun bank baru.

    POST /transactions/deposit : Menambah saldo ke akun.

    POST /transactions/withdraw : Menarik saldo dari akun.

    POST /transactions/transfer : Mengirim dana ke nasabah lain.

Proyek ini dikembangkan sebagai bagian dari Milestone 4 RevoU Backend Development.