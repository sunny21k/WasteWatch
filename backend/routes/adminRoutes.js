import express from 'express'
import { protect } from "../middleware/auth.js";
import { admin } from "../middleware/admin.js";
import { getAllReports, verifyReport, deleteReport } from "../controllers/admin/adminController.js";

const adminRouter = express.Router();

adminRouter.get("/all-reports", protect, admin, getAllReports);
adminRouter.put("/verify", protect, admin, verifyReport);
adminRouter.post("/delete", protect, admin, deleteReport);

export default adminRouter;