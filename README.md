# 🌟 Vite Full Stack Project (React + Node.js)

A complete full-stack web application built with **Vite (React)** on the frontend and **Node.js + Express** on the backend.

---

## 📁 Project Structure

```
my-vite-app/
├── frontend/   # React + Vite frontend
└── backend/    # Express.js backend API
```

---

## ⚙️ How to Run Locally

### 🧩 Step 1: Clone the repository

```bash
git clone https://github.com/your-username/your-repo-name.git
cd your-repo-name
```

---

### 🖥️ Step 2: Setup Backend
```bash
cd backend
npm install
npm run dev
```

Your backend server will start on:  
👉 **http://localhost:5000** (or your configured port)

---

### 🌐 Step 3: Setup Frontend
```bash
cd ../frontend
npm install
npm run dev
```

Your frontend will start on:  
👉 **http://localhost:5173**

---

## 🔑 Environment Variables

Create a file named `.env` inside your **backend** folder and add:

```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

> ⚠️ **Important:** Don’t push `.env` files to GitHub — keep them private.  
> Add `.env` to your `.gitignore` file.

---

## 🧠 Useful Scripts

| Command | Location | Description |
|----------|-----------|-------------|
| `npm run dev` | backend | Run the backend server |
| `npm run dev` | frontend | Run the frontend (Vite dev server) |
| `npm run build` | frontend | Build the frontend for production |

---

## 🛠️ Tech Stack

**Frontend:**  
⚡ React + Vite + Tailwind CSS  

**Backend:**  
🧩 Node.js + Express  

**Database:**  
💾 MongoDB (via Mongoose)

**Others:**  
🔧 ESLint, Prettier, Git, npm

---

## 🚀 Deployment Options

| Service | Usage |
|----------|--------|
| [Vercel](https://vercel.com/) / [Netlify](https://www.netlify.com/) | Frontend hosting |
| [Render](https://render.com/) / [Railway](https://railway.app/) / [Heroku](https://www.heroku.com/) | Backend hosting |

---

## 🧾 License

This project is open-source and available under the **MIT License**.

---

## 💡 Author

👨‍💻 Developed by **Nazmul**  
📬 Feel free to connect or share feedback!
