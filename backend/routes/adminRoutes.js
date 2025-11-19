import express from 'express'
import { protect } from "../middleware/authMiddleware.js";
import { admin } from "../middleware/adminMiddleware.js";
import { getAllReports, verifyReport, deleteReport } from "../controllers/adminController.js";

const adminRouter = express.Router();

adminRouter.get("/all-reports", protect, admin, getAllReports);
adminRouter.put("/verify", protect, admin, verifyReport);
adminRouter.post("/delete", protect, admin, deleteReport);

export default adminRouter;