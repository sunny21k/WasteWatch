import express from "express"
import { createReport } from "../controllers/reportController.js";
import upload from "../middleware/multer.js";
import { protect } from "../middleware/auth.js";
 
const reportRouter = express.Router();

reportRouter.post("/create", protect, upload.single('image'), createReport)

export default reportRouter;