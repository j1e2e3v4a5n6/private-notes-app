import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import noteRoutes from "./routes/noteRoutes.js";

dotenv.config();

const app = express();

// ✅ Correct CORS configuration
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://private-notes-app-1.onrender.com"
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(express.json());

// ✅ Connect MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error("MongoDB Error:", err));

// ✅ Routes
app.use("/api/notes", noteRoutes);

// ✅ Render dynamic port
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
