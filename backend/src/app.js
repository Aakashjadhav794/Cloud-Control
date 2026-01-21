import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import connectDB from "./config/db.js"
import authRoutes from "./routes/auth.routes.js"

dotenv.config()

const app = express()

// DB
connectDB()

// Middlewares
app.use(cors())
app.use(express.json())

app.use("/auth", authRoutes)
// Test
app.get("/", (req, res) => {
  res.json({ status: "CloudControl backend running" })
})

export default app
