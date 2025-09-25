import express from 'express'
import cors from "cors"

const app = express();

app.use(express.json());
app.use(cors());

// Routes
app.get('/', (req, res) => {
    res.send("Backend is running.")
})

const PORT = 3000

app.listen(PORT,  () => {
    console.log("Waste Watch Server is running.")
})

export default app;