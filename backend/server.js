import express from 'express'
import cors from "cors"
import "dotenv/config"

const app = express();

app.use(express.json());
app.use(cors());

// Routes
app.get('/', (req, res) => {
    res.send("API is running.")
})

const PORT = process.env.PORT || 3000

app.listen(PORT,  () => {
    console.log(`Waste Watch Server is running on ${PORT}`)
})

export default app;