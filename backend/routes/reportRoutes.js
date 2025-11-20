import express from "express"
import { createReport, getMyReports, getAllReports, collectReport, getMyCollections } from "../controllers/reportController.js";
import upload from "../middleware/multer.js";
import { protect } from "../middleware/auth.js";
 
const reportRouter = express.Router();

reportRouter.post("/create", protect, upload.single('image'), createReport)
reportRouter.get("/all-reports", getAllReports)
reportRouter.get("/my-reports", protect, getMyReports);
reportRouter.post("/collect", collectReport)
reportRouter.get("/my-collections", protect, getMyCollections);

export default reportRouter;