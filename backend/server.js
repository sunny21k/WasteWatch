import express from 'express'
import cors from "cors"
import "dotenv/config"
import connectDB from "./config/db.js"
import userRouter from './routes/userRoutes.js';

const app = express();

connectDB();

app.use(express.json());
app.use(cors());

// Routes
app.get('/', (req, res) => {
    res.send("API is running.")
})

app.use("/api/user", userRouter)


// Connect app to port
const PORT = process.env.PORT || 3000

app.listen(PORT,  () => {
    console.log(`Waste Watch Server is running on ${PORT}`)
})

export default app;