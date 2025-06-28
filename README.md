# ✅ OptiForm

**OptiForm** is a modern, real-time form & survey web app with an intuitive **admin dashboard**. Create forms, share them via link or QR code, collect live responses, and analyze feedback instantly — perfect for businesses, teachers, teams, or anyone who needs reliable feedback fast.

---

## ✨ **Features**

- 📋 **Form Builder** — Design surveys & feedback forms with ease.
- 🔗 **Shareable Links & QR Codes** — Reach your audience anywhere.
- 🔄 **Real-Time Updates** — View new responses as they come in.
- 📊 **Admin Dashboard** — Analyze results with charts & export options.
- 🛡️ **Spam Filtering** — Prevent junk submissions using regex/basic checks.
- 🔒 **Secure Storage** — All responses stored safely in a MySQL database.
- 🔑 **User Authentication** — Secure admin login via Supabase.

---

## 🛠️ **Tech Stack**

| Layer       | Technology                  |
|-------------|-----------------------------|
| Frontend    | React (Vite) + Tailwind CSS |
| Backend     | Node.js + Express.js        |
| Database    | MySQL                       |
| Auth        | Supabase                    |
| Deployment  | Vercel (Frontend)           |

---

## ⚙️ **Setup & Installation**

### 1️⃣ **Clone the repository**

```bash
git clone https://github.com/yourusername/optiform.git
cd optiform
```
### 2️⃣ Install Frontend dependencies
```bash
npm install
**
```
### 3️⃣ Run the Frontend
```bash
npm run dev
```
### 4️⃣ Setup and Run the Backend
```bash
cd server
npm install
npm start
```
### 📂 Project Structure
optiform/
├── public/                  # Static assets
├── src/
│   ├── components/          # React UI components
│   ├── pages/               # Form, Survey, Dashboard
│   ├── api/                 # Axios or fetch API calls
│   ├── App.jsx
│   └── main.jsx
├── server/                  # Node.js backend
│   ├── routes/              # API routes
│   ├── controllers/         # Logic handlers
│   ├── models/              # DB models
│   ├── config/              # DB connection
│   └── server.js            # Express server entry
├── .env                     # Environment variables
├── package.json
└── README.md

